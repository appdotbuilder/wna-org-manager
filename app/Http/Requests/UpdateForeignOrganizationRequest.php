<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateForeignOrganizationRequest extends FormRequest
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
            'organization_name' => 'required|string|max:255',
            'registration_number' => 'required|string|max:100|unique:foreign_organizations,registration_number,' . $this->route('foreign_organization')->id,
            'country_of_origin' => 'required|string|max:100',
            'organization_type' => 'required|in:company,ngo,embassy,consulate,educational,religious,other',
            'legal_status' => 'required|in:registered,licensed,accredited,temporary,suspended,revoked',
            'registration_date' => 'required|date|before_or_equal:today',
            'license_expiry_date' => 'nullable|date|after:registration_date',
            'business_address' => 'required|string',
            'contact_person' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_email' => 'required|email|max:255',
            'activity_type' => 'required|in:commercial,educational,humanitarian,diplomatic,religious,research,development',
            'activity_description' => 'required|string',
            'status' => 'required|in:active,inactive,suspended,closed',
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
            'organization_name.required' => 'Organization name is required.',
            'registration_number.required' => 'Registration number is required.',
            'registration_number.unique' => 'This registration number is already registered to another organization.',
            'contact_person.required' => 'Contact person name is required.',
            'contact_phone.required' => 'Contact phone is required.',
            'contact_email.required' => 'Contact email is required.',
            'activity_description.required' => 'Activity description is required.',
        ];
    }
}