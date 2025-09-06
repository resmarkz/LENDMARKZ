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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_id')->constrained()->onDelete('cascade');
            $table->foreignId('collector_profile_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('client_profile_id')->nullable()->constrained()->onDelete('set null');

            $table->decimal('amount_paid', 12, 2);         // actual amount paid
            $table->date('payment_date');                  // when payment was made
            $table->string('payment_method')->nullable();  // cash, bank transfer, gcash, etc.
            $table->string('reference_no')->nullable();    // receipt no. or transaction id

            $table->string('status')->default('completed'); // completed, pending, failed, reversed

            $table->timestamps();

            // Indexes for faster lookup
            $table->index('payment_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
