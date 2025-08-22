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
        Schema::create('foreign_nationals', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('passport_number')->unique();
            $table->string('country_of_origin');
            $table->string('nationality');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female']);
            $table->string('permit_number')->unique();
            $table->enum('permit_type', ['work', 'study', 'visit', 'business', 'family', 'diplomatic']);
            $table->date('permit_issue_date');
            $table->date('permit_expiry_date');
            $table->enum('activity_type', ['employee', 'student', 'investor', 'researcher', 'diplomat', 'tourist', 'family_reunion']);
            $table->text('current_address');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('employer_organization')->nullable();
            $table->enum('status', ['active', 'expired', 'overstay', 'cancelled'])->default('active');
            $table->json('supporting_documents')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('passport_number');
            $table->index('permit_number');
            $table->index('country_of_origin');
            $table->index('permit_type');
            $table->index('permit_expiry_date');
            $table->index('status');
            $table->index(['country_of_origin', 'status']);
            $table->index(['permit_expiry_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foreign_nationals');
    }
};