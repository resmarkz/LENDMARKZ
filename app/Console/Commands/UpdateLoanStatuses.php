<?php

namespace App\Console\Commands;

use App\Models\Loan;
use Illuminate\Console\Command;

class UpdateLoanStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'loans:update-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update loan statuses based on due dates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Loan::where('status', '!=', 'paid')->get()->each(function ($loan) {
            if ($loan->due_date && now()->greaterThan($loan->due_date)) {
                $loan->update(['status' => 'overdue']);
            } elseif ($loan->release_date && now()->lessThanOrEqualTo($loan->due_date)) {
                $loan->update(['status' => 'active']);
            }
        });

        $this->info('Loan statuses updated successfully!');
    }
}
