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
        Schema::create('alert_notifications', function (Blueprint $table) {
            $table->id();
            $table->morphs('alertable'); // Can be foreign_national or foreign_organization
            $table->enum('alert_type', ['permit_expiring', 'license_expiring', 'overstay_detected', 'document_missing', 'status_change']);
            $table->string('title');
            $table->text('message');
            $table->enum('severity', ['low', 'medium', 'high', 'critical']);
            $table->enum('status', ['unread', 'read', 'acknowledged', 'resolved'])->default('unread');
            $table->timestamp('due_date')->nullable();
            $table->timestamp('acknowledged_at')->nullable();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('alert_type');
            $table->index('severity');
            $table->index('status');
            $table->index('due_date');
            $table->index(['status', 'severity']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alert_notifications');
    }
};