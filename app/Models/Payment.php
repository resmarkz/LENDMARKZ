<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'loan_id',
        'collector_id',
        'client_id',
        'amount_paid',
        'payment_date',
        'payment_method',
        'reference_no',
        'status',
    ];

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function collector(): BelongsTo
    {
        return $this->belongsTo(CollectorProfile::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class);
    }
}
