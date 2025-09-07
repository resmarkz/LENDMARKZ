<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactReference extends Model
{
    protected $fillable = [
        'client_profile_id',
        'first_name',
        'last_name',
        'contact_number',
        'relationship',
    ];

    public function clientProfile(): BelongsTo
    {
        return $this->belongsTo(ClientProfile::class);
    }
}
