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

            $table->decimal('principal_amount', 12, 2);   // scheduled principal
            $table->decimal('interest_amount', 12, 2);    // scheduled interest
            $table->decimal('total_amount', 12, 2);       // scheduled total (principal + interest)

            $table->decimal('amount_paid', 12, 2)->nullable(); // what client actually paid
            $table->date('due_date');                           // when it’s due
            $table->date('payment_date')->nullable();           // when actually paid

            $table->string('payment_method')->nullable();
            $table->string('reference_no')->nullable();
            $table->boolean('is_paid')->default(false);

            $table->string('status')->default('pending'); // pending, paid, overdue

            $table->timestamps();

            $table->index('due_date');
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
