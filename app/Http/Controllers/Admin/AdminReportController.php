<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\Payment;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminReportController extends Controller
{
    public function __invoke(Request $request)
    {
        $reportType = $request->input('report_type');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $data = [];
        $filename = "report.csv";

        switch ($reportType) {
            case 'all_loans':
                $data = Loan::query();
                if ($startDate) {
                    $data->whereDate('created_at', '>=', $startDate);
                }
                if ($endDate) {
                    $data->whereDate('created_at', '<=', $endDate);
                }
                $data = $data->get();
                $filename = "all_loans_report.csv";
                break;
            case 'paid_loans':
                $data = Loan::where('status', 'paid');
                if ($startDate) {
                    $data->whereDate('created_at', '>=', $startDate);
                }
                if ($endDate) {
                    $data->whereDate('created_at', '<=', $endDate);
                }
                $data = $data->get();
                $filename = "paid_loans_report.csv";
                break;
            case 'overdue_loans':
                $data = Loan::where('status', 'overdue');
                if ($startDate) {
                    $data->whereDate('created_at', '>=', $startDate);
                }
                if ($endDate) {
                    $data->whereDate('created_at', '<=', $endDate);
                }
                $data = $data->get();
                $filename = "overdue_loans_report.csv";
                break;
            case 'payments_made':
                $data = Payment::query();
                if ($startDate) {
                    $data->whereDate('created_at', '>=', $startDate);
                }
                if ($endDate) {
                    $data->whereDate('created_at', '<=', $endDate);
                }
                $data = $data->get();
                $filename = "payments_made_report.csv";
                break;
            default:
                return response()->json(['message' => 'Invalid report type'], 400);
        }

        if ($data->isEmpty()) {
            return redirect()->back()->with('error', 'No data found for the selected filters.');
        }

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($data, $reportType) {
            $file = fopen('php://output', 'w');

            if ($reportType === 'all_loans' || $reportType === 'paid_loans' || $reportType === 'overdue_loans') {
                fputcsv($file, ['Loan ID', 'Client ID', 'Principal Amount', 'Status', 'Due Date', 'Created At']);
                foreach ($data as $row) {
                    fputcsv($file, [$row->id, $row->client_profile_id, $row->principal_amount, $row->status, $row->due_date, $row->created_at]);
                }
            } elseif ($reportType === 'payments_made') {
                fputcsv($file, ['Payment ID', 'Loan ID', 'Amount Paid', 'Payment Date', 'Reference No', 'Created At']);
                foreach ($data as $row) {
                    fputcsv($file, [$row->id, $row->loan_id, $row->amount_paid, $row->payment_date, $row->reference_no, $row->created_at]);
                }
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
