import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";
import errorHandler from "@/Utils/errorHandler";

export default function ApplyLoan() {
    const { data, setData, post, processing, errors, reset } = useForm({
        principal_amount: "",
        term_months: "",
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/client/loans/apply", {
            onSuccess: () => reset(),
        });
    };

    const loanOptions = [5000, 10000, 25000, 50000, 75000, 100000];

    return (
        <ClientDashboardLayout>
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Apply for a Loan
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Choose Loan Amount
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {loanOptions.map((amount) => (
                                <label
                                    key={amount}
                                    className={`cursor-pointer rounded-xl border p-4 text-center shadow-sm transition 
                                        ${
                                            data.principal_amount == amount
                                                ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold"
                                                : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="principal_amount"
                                        value={amount}
                                        checked={
                                            data.principal_amount == amount
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "principal_amount",
                                                e.target.value
                                            )
                                        }
                                        className="hidden"
                                    />
                                    ₱{amount.toLocaleString()}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loan Terms (in months) with corresponding interest
                        </label>
                        <select
                            name="term_months"
                            value={data.term_months}
                            onChange={(e) =>
                                setData("term_months", e.target.value)
                            }
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Select Terms</option>
                            <option value="6">6 months (12%)</option>
                            <option value="12">12 months (15%)</option>
                            <option value="18">18 months (20%)</option>
                            <option value="24">24 months (25%)</option>
                            <option value="36">36 months (30%)</option>
                            <option value="48">48 months (35%)</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {processing
                                ? "Submitting..."
                                : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </ClientDashboardLayout>
    );
}
