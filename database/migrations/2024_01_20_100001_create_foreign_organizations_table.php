<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('foreign_organizations', function (Blueprint $table) {
            $table->id();
            $table->string('organization_name');
            $table->string('registration_number')->unique();
            $table->string('country_of_origin');
            $table->enum('organization_type', ['company', 'ngo', 'embassy', 'consulate', 'educational', 'religious', 'other']);
            $table->enum('legal_status', ['registered', 'licensed', 'accredited', 'temporary', 'suspended', 'revoked']);
            $table->date('registration_date');
            $table->date('license_expiry_date')->nullable();
            $table->text('business_address');
            $table->string('contact_person');
            $table->string('contact_phone');
            $table->string('contact_email');
            $table->enum('activity_type', ['commercial', 'educational', 'humanitarian', 'diplomatic', 'religious', 'research', 'development']);
            $table->text('activity_description');
            $table->enum('status', ['active', 'inactive', 'suspended', 'closed'])->default('active');
            $table->json('supporting_documents')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('registration_number');
            $table->index('country_of_origin');
            $table->index('organization_type');
            $table->index('legal_status');
            $table->index('status');
            $table->index('license_expiry_date');
            $table->index(['country_of_origin', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foreign_organizations');
    }
};