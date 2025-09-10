<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Loan extends Model
{
    protected $fillable = [
        'collector_profile_id',
        'client_profile_id',
        'principal_amount',
        'interest_rate',
        'term_months',
        'release_date',
        'status',
    ];

    protected static function booted()
    {
        static::creating(function ($loan) {
            $loan->computeFields();
        });

        static::updating(function ($loan) {
            $loan->computeFields();
        });
    }

    public function computeFields()
    {
        $rate = $this->interest_rate / 100;

        $monthlyRate = $rate / 12;
        if ($monthlyRate > 0) {
            $this->monthly_payment = $this->principal_amount *
                ($monthlyRate * pow(1 + $monthlyRate, $this->term_months)) /
                (pow(1 + $monthlyRate, $this->term_months) - 1);
        } else {
            $this->monthly_payment = $this->principal_amount / $this->term_months;
        }

        $this->monthly_payment = round($this->monthly_payment, 2);

        $this->total_payable = round($this->monthly_payment * $this->term_months, 2);

        if ($this->release_date) {
            $this->due_date = \Carbon\Carbon::parse($this->release_date)->addMonths($this->term_months);
        }
    }

    public function clientProfile(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class);
    }

    public function collectorProfile(): BelongsTo
    {
        return $this->belongsTo(CollectorProfile::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
