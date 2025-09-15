<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use DateTimeInterface;

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
        'monthly_payment',
        'total_payable',
        'due_date',
        'remaining_balance',
    ];

    protected $casts = [
        'release_date' => 'date',
        'due_date'     => 'date',
    ];

    protected static function booted()
    {
        static::creating(function ($loan) {
            if ($loan->status === 'active' && !$loan->release_date) {
                $loan->release_date = now()->toDateString();
            }
            if (!$loan->remaining_balance) {
                $loan->remaining_balance = $loan->total_payable;
            }
        });

        static::updating(function ($loan) {
            if ($loan->isDirty('status') && $loan->status === 'active' && !$loan->release_date) {
                $loan->release_date = now()->toDateString();
            }
        });

        static::saved(function ($loan) {
            if ($loan->wasChanged('status') && $loan->status === 'active') {
                $loan->generateAmortizationSchedule();
                $loan->remaining_balance = $loan->total_payable;
                $loan->saveQuietly();
            }
        });
    }

    public function generateAmortizationSchedule()
    {
        $this->payments()->delete();

        $balance = $this->principal_amount;
        $monthlyRate = $this->interest_rate / 100 / 12;
        $payment = $this->monthly_payment;
        $releaseDate = $this->release_date;

        for ($i = 1; $i <= $this->term_months; $i++) {
            $interest = round($balance * $monthlyRate, 2);
            $principal = round($payment - $interest, 2);

            if ($i === $this->term_months) {
                $principal = $balance;
            }

            $total = $principal + $interest;

            $this->payments()->create([
                'collector_profile_id' => $this->collector_profile_id,
                'client_profile_id'    => $this->client_profile_id,
                'principal_amount'     => $principal,
                'interest_amount'      => $interest,
                'total_amount'         => $total,
                'due_date'             => $releaseDate->copy()->addMonths($i),
                'status'               => 'pending',
                'is_paid'              => false,
            ]);

            $balance -= $principal;
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

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }
}
