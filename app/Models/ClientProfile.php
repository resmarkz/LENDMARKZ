<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientProfile extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'contact_number',
        'date_of_birth',
        'source_of_income',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function contactReferences(): HasMany
    {
        return $this->hasMany(ContactReference::class);
    }
}
