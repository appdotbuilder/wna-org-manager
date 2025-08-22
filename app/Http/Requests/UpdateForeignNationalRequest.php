<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateForeignNationalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'passport_number' => 'required|string|max:50|unique:foreign_nationals,passport_number,' . $this->route('foreign_national')->id,
            'country_of_origin' => 'required|string|max:100',
            'nationality' => 'required|string|max:100',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'permit_number' => 'required|string|max:100|unique:foreign_nationals,permit_number,' . $this->route('foreign_national')->id,
            'permit_type' => 'required|in:work,study,visit,business,family,diplomatic',
            'permit_issue_date' => 'required|date|before_or_equal:today',
            'permit_expiry_date' => 'required|date|after:permit_issue_date',
            'activity_type' => 'required|in:employee,student,investor,researcher,diplomat,tourist,family_reunion',
            'current_address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'employer_organization' => 'nullable|string|max:255',
            'status' => 'required|in:active,expired,overstay,cancelled',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'passport_number.required' => 'Passport number is required.',
            'passport_number.unique' => 'This passport number is already registered to another person.',
            'permit_number.required' => 'Permit number is required.',
            'permit_number.unique' => 'This permit number is already registered to another person.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'permit_expiry_date.after' => 'Permit expiry date must be after issue date.',
        ];
    }
}