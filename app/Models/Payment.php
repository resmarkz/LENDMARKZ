<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'loan_id',
        'collector_profile_id',
        'client_profile_id',
        'principal_amount',
        'interest_amount',
        'total_amount',
        'amount_paid',
        'payment_date',
        'payment_method',
        'reference_no',
        'status',
        'is_paid',
        'due_date',
    ];

    protected $casts = [
        'due_date' => 'date',
        'payment_date' => 'date',
        'is_paid' => 'boolean',
    ];

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function collector(): BelongsTo
    {
        return $this->belongsTo(CollectorProfile::class, 'collector_profile_id');
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class, 'client_profile_id');
    }
}
