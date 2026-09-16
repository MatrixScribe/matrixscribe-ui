"use client";

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-semibold text-red-600">Payment Failed</h1>
      <p className="text-neutral-600 mt-2 text-center">
        Something went wrong while processing your transaction.
      </p>
      <p className="text-neutral-500 mt-1 text-sm">
        Please try again or contact support.
      </p>
    </main>
  );
}
