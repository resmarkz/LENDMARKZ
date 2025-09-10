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
            $table->foreignId('collector_profile_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('client_profile_id')->nullable()->constrained()->onDelete('cascade');

            $table->decimal('principal_amount', 12, 2);
            $table->decimal('interest_rate', 5, 2);
            $table->integer('term_months');
            $table->decimal('monthly_payment', 12, 2);
            $table->decimal('total_payable', 12, 2);
            $table->decimal('remaining_balance', 12, 2)->default(0.00);

            $table->date('release_date');
            $table->date('due_date');
            $table->enum('status', ['pending', 'active', 'paid', 'overdue', 'cancelled'])->default('pending');

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
