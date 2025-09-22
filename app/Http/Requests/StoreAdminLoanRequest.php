<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdminLoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'collector_id'     => 'required|exists:users,id',
            'client_id'        => 'required|exists:users,id',
            'principal_amount' => 'required|numeric|min:0',
            'interest_rate'    => 'required|numeric|min:0',
            'term_months'      => 'required|integer|min:1',
            'status'           => 'required|in:pending,active',
        ];
    }
}
