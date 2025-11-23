import React from "react";
import { CreditCard } from "lucide-react";

const PaymentModal = ({
  selectedCase,
  requestType,
  paymentDetails,
  paymentErrors,
  handleCardNumberChange,
  handleExpiryChange,
  handleCvvChange,
  handleHolderNameChange,
  handlePayment,
  handleBackToRecords,
}) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToRecords}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Payment Details</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Request Summary</h3>
        <p>
          <strong>Case ID:</strong> {selectedCase?.id}
        </p>
        <p>
          <strong>Request Type:</strong> {requestType}
        </p>
        <p>
          <strong>Estimated Cost:</strong> ${selectedCase?.amount}
        </p>
        <div className="mt-3 p-3 bg-yellow-100 rounded border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> We will place a $50.00 hold on your payment
            method. After admin review, you will be charged the actual amount ($
            {selectedCase?.amount}) and the hold will be released.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Cardholder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={paymentDetails.holderName}
            onChange={handleHolderNameChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              paymentErrors.holderName ? "border-red-500" : ""
            }`}
            placeholder="Enter cardholder name"
          />
          {paymentErrors.holderName && (
            <p className="text-red-500 text-sm mt-1">
              {paymentErrors.holderName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Card Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={paymentDetails.cardNumber}
            onChange={handleCardNumberChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              paymentErrors.cardNumber ? "border-red-500" : ""
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {paymentErrors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">
              {paymentErrors.cardNumber}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={paymentDetails.expiryDate}
              onChange={handleExpiryChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                paymentErrors.expiryDate ? "border-red-500" : ""
              }`}
              placeholder="MM/YY"
              maxLength="5"
            />
            {paymentErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {paymentErrors.expiryDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              CVV <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={paymentDetails.cvv}
              onChange={handleCvvChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                paymentErrors.cvv ? "border-red-500" : ""
              }`}
              placeholder="123"
              maxLength="4"
            />
            {paymentErrors.cvv && (
              <p className="text-red-500 text-sm mt-1">{paymentErrors.cvv}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBackToRecords}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Place $50.00 Hold & Request Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;