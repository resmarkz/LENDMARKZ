# Lendmarkz - Loan Management System

Lendmarkz is a comprehensive Loan Management System built with Laravel, React (via Inertia.js), and TailwindCSS. It provides a platform for managing loans, clients, collectors, and payments.

## 🚀 Tech Stack

-   [Laravel](https://laravel.com/) - PHP Framework for backend logic and routing
-   [React](https://reactjs.org/) - Frontend library for dynamic UI
-   [Inertia.js](https://inertiajs.com/) - Bridges Laravel and React
-   [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/resmarkz/lendmarkz.git
cd lendmarkz
```

2. **Install dependencies**

```bash
composer install
npm install
```

3. **Set up environment**

```bash
cp .env.example .env
php artisan key:generate
```

4. **Configure your database** in the `.env` file.

5. **Run migrations and seeders**

```bash
php artisan migrate --seed
```

6. **Run the development server**

```bash
npm run dev
php artisan serve
```

## ✨ Features

-   **Admin Dashboard:** Manage users, loans, and payments.
-   **Client Dashboard:** Apply for loans, view loan status, and make payments.
-   **Collector Dashboard:** View assigned loans and record payments.
-   **Authentication:** Secure login for all user roles.
-   **Loan Management:** Create, view, update, and delete loans.
-   **Payment Management:** Record and track payments.

## 👥 User Roles

-   **Admin:** Has full control over the system.
-   **Client:** Can apply for loans and make payments.
-   **Collector:** Can manage assigned loans and collect payments.

## 🧮 Amortization Calculation

The amortization is calculated using the standard formula for an ordinary annuity. The calculation is done in the `computeFields` method of the `LoanController`.

### Formula

The monthly payment is calculated using the following formula:

`M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]`

Where:

-   `M` = Monthly Payment
-   `P` = Principal Loan Amount
-   `i` = Monthly Interest Rate
-   `n` = Number of Months

### Code

Here is the PHP code that implements the amortization calculation:

```php
private function computeFields($principal, $interestRate, $termMonths)
{
    $monthlyRate = ($interestRate / 100) / 12;

    if ($monthlyRate == 0) {
        $rawMonthlyPayment = $principal / $termMonths;
    } else {
        $rawMonthlyPayment = $principal * (
            ($monthlyRate * pow(1 + $monthlyRate, $termMonths)) /
            (pow(1 + $monthlyRate, $termMonths) - 1)
        );
    }

    $monthlyPayment = round($rawMonthlyPayment, 2);

    $totalPayable = round($rawMonthlyPayment * $termMonths, 2);

    return [
        'monthly_payment' => $monthlyPayment,
        'total_payable'   => $totalPayable,
    ];
}
```
