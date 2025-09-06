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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->string('marketing_id')->nullable()->unique();
            $table->foreignId('collector_profile_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('client_profile_id')->nullable()->constrained()->onDelete('cascade');

            $table->decimal('principal_amount', 12, 2);    // original loan amount
            $table->decimal('interest_rate', 5, 2);        // e.g. 5.25 (%)
            $table->integer('term_months');                // loan term in months
            $table->decimal('monthly_payment', 12, 2);     // calculated amortization
            $table->decimal('total_payable', 12, 2);       // principal + interest

            $table->date('release_date');                  // when loan was released
            $table->date('due_date');                      // final due date
            $table->enum('status', ['pending', 'active', 'paid', 'overdue', 'cancelled'])->default('pending');
            // pending, active, paid, overdue, cancelled
            $table->timestamps();

            $table->index('status');
            $table->index('release_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
