<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientProfileRequest extends FormRequest
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
        $client = $this->route('client');

        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($client->id),
            ],
            'current_password' => 'nullable|string|min:8',
            'password' => 'nullable|string|min:8',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'source_of_income' => ['required', 'string', Rule::in(['Employed', 'Business', 'Freelancer', 'Other'])],
        ];
    }
}
