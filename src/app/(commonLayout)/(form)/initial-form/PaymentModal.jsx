import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useCreatePaymentMutation } from "@/redux/featured/payment/paymentApi";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "@/redux/featured/initialSubmission/paymentApi";

const PaymentModal = ({ isOpen, onClose, submissionId }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmitClaim = async () => {
    if (!selectedPlan) {
      toast.error("Please select a processing speed");
      return;
    }

    try {
      const paymentData = {
        submissionId: submissionId,
        price: selectedPlan === "STANDARD" ? 45 : 70,
        paymentStatus: "PENDING",
        paymentType: selectedPlan,
        priority: selectedPlan,
      };

      const result = await createPayment(paymentData).unwrap();
      
      console.log("Payment result:", result);
      if (result?.data?.checkout_url) {
        toast.success("Redirecting to payment gateway...");
        
        setTimeout(() => {
          window.location.href = result.data.checkout_url;
        }, 1000);
      } else {
        toast.success("Payment initiated successfully!");
        
        // Close modal and reset
        onClose();
        setSelectedPlan(null);
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error?.data?.message || "Failed to process payment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center">
            Review & Select Payment
          </h2>
          <p className="text-sm text-center text-gray-600 mt-2">
            Review your claim details below. Once submitted, a PDF will be
            generated. Choose a processing speed to finalize your claim.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Processing Speed</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Plan */}
            <div
              className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all ${
                selectedPlan === "STANDARD"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isLoading && handleSelectPlan("STANDARD")}
            >
              <h4 className="text-xl font-bold mb-2">Standard</h4>
              <p className="text-4xl font-bold text-gray-900 mb-2">$45</p>
              <p className="text-sm text-gray-600 mb-4">
                Processed in 5-7 business days.
              </p>
              <Button
                type="button"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  !isLoading && handleSelectPlan("STANDARD");
                }}
                className={`w-full ${
                  selectedPlan === "STANDARD"
                    ? "bg-primary text-white hover:bg-primary/80"
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
              >
                Choose Plan
              </Button>
            </div>

            {/* Expedited Plan */}
            <div
              className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all ${
                selectedPlan === "EXPEDITED"
                  ? "border-red-600 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isLoading && handleSelectPlan("EXPEDITED")}
            >
              <h4 className="text-xl font-bold mb-2">Expedited</h4>
              <p className="text-4xl font-bold text-gray-900 mb-2">$70</p>
              <p className="text-sm text-gray-600 mb-4">
                Processed in 1-2 business days.
              </p>
              <Button
                type="button"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  !isLoading && handleSelectPlan("EXPEDITED");
                }}
                className={`w-full ${
                  selectedPlan === "EXPEDITED"
                    ? "bg-primary text-white hover:bg-primary/80"
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
              >
                Choose Plan
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <Button
            onClick={handleSubmitClaim}
            disabled={!selectedPlan || isLoading}
            className={`w-full py-6 text-lg font-semibold ${
              selectedPlan && !isLoading
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Claim"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;