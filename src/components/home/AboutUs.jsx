"use client";

import React, { useState } from "react";
import { Eye, Download, X, Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import {
  File,
  Jury,
  King,
  Question,
  SearchIcon,
} from "../share/svg/howItWorkSvg";
import { Button } from "../ui/button";
import { toast } from "sonner";
import SearchRecordsModal from "./SearchRecordsModal";
import CaseDetailsView from "./CaseDetailsView";
import PaymentModal from "./PaymentModal";
import { usePaymentForFilesMutation, useSearchFilesByUserMutation } from "@/redux/featured/searchFiles/searchFilesApi";
// import {
//   useSearchFilesByUserMutation,
//   usePaymentForFilesMutation,
// } from "@/redux/api/searchFilesApi";

const RelationshipArchive = () => {
  const [showViewRecords, setShowViewRecords] = useState(false);
  const [searchForm, setSearchForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentErrors, setPaymentErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
  });
  const [isSearching, setIsSearching] = useState(false);

  const [searchFilesByUser] = useSearchFilesByUserMutation();
  const [paymentForFiles, { isLoading: isPaymentLoading }] = usePaymentForFilesMutation();

  const handleViewRecordsClick = () => {
    setShowViewRecords(true);
  };

  const handleBackToHome = () => {
    setShowViewRecords(false);
    setShowPayment(false);
    setSearchResults([]);
    setSelectedPerson(null);
    setSelectedCase(null);
    setSearchForm({ firstName: "", lastName: "", dateOfBirth: "" });
    setPaymentErrors({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    });
  };

  const handleSearch = async () => {
    if (!searchForm.firstName || !searchForm.lastName || !searchForm.dateOfBirth) {
      toast.error("Please fill in all search fields");
      return;
    }

    setIsSearching(true);
    try {
      const formattedDate = new Date(searchForm.dateOfBirth).toISOString();
      
      const response = await searchFilesByUser({
        firstName: searchForm.firstName,
        lastName: searchForm.lastName,
        birthDate: formattedDate,
      }).unwrap();

      if (response.success && response.data) {
        // Transform API data to match the expected format
        const transformedResults = response.data.map((item) => ({
          id: item.user._id,
          firstName: item.user.firstName,
          middleName: item.user.middleName,
          lastName: item.user.lastName,
          dateOfBirth: item.user.birthDate,
          fullName: `${item.user.firstName} ${item.user.middleName || ''} ${item.user.lastName}`.trim(),
          email: item.user.email,
          profile: item.user.profile,
          // Store the case information
          rawCases: response.data.filter(caseItem => caseItem.user._id === item.user._id)
        }));

        // Remove duplicates based on user ID
        const uniqueResults = transformedResults.filter(
          (result, index, self) =>
            index === self.findIndex((r) => r.id === result.id)
        );

        setSearchResults(uniqueResults);
        
        if (uniqueResults.length === 0) {
          toast.info("No records found for the provided information");
        } else {
          toast.success(`Found ${uniqueResults.length} matching record(s)`);
        }
      } else {
        setSearchResults([]);
        toast.info("No records found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error?.data?.message || "Failed to search records. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePersonSelect = (person) => {
    // Transform the cases for display
    const casesWithVerdict = person.rawCases.map((caseItem) => {
      // Calculate verdict based on juror decisions
      let verdictCode = "PENDING";
      
      if (caseItem.status === "APPROVED" && caseItem.jurorDecisions.length > 0) {
        const decisions = caseItem.jurorDecisions;
        const acceptCount = decisions.filter(d => d.action === "ACCEPT").length;
        const rejectCount = decisions.filter(d => d.action === "REJECT").length;
        const unableCount = decisions.filter(d => d.action === "UNABLETODECIDE").length;

        if (acceptCount > rejectCount && acceptCount > unableCount) {
          verdictCode = "PROVEN";
        } else if (rejectCount > acceptCount && rejectCount > unableCount) {
          verdictCode = "DISPROVEN";
        } else if (unableCount >= acceptCount && unableCount >= rejectCount) {
          verdictCode = "INCONCLUSIVE";
        } else {
          verdictCode = "CONCLUDED";
        }
      } else if (caseItem.status === "REJECTED") {
        verdictCode = "DISMISSED";
      }

      return {
        id: caseItem.caseId,
        caseId: caseItem.caseId,
        verdictCode: verdictCode,
        amount: 25.0, // Base amount, will be determined by record type
        submissionId: caseItem._id,
        status: caseItem.status,
        typeOfFiling: caseItem.typeOfFiling,
        createdAt: caseItem.createdAt,
      };
    });

    setSelectedPerson({
      ...person,
      caseIds: casesWithVerdict,
    });
  };

  const handleRecordsRequest = (caseData, type) => {
    setSelectedCase(caseData);
    setRequestType(type);
    setShowPayment(true);
  };

  const handleBackToRecords = () => {
    setShowPayment(false);
    setSelectedCase(null);
    setRequestType("");
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    });
    setPaymentErrors({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    });
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g);
    return formatted ? formatted.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (/^\d*$/.test(value) && value.length <= 16) {
      setPaymentDetails({
        ...paymentDetails,
        cardNumber: formatCardNumber(value),
      });
      if (paymentErrors.cardNumber) {
        setPaymentErrors({ ...paymentErrors, cardNumber: "" });
      }
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setPaymentDetails({ ...paymentDetails, expiryDate: value });
      if (paymentErrors.expiryDate) {
        setPaymentErrors({ ...paymentErrors, expiryDate: "" });
      }
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPaymentDetails({ ...paymentDetails, cvv: value });
      if (paymentErrors.cvv) {
        setPaymentErrors({ ...paymentErrors, cvv: "" });
      }
    }
  };

  const handleHolderNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setPaymentDetails({ ...paymentDetails, holderName: value });
      if (paymentErrors.holderName) {
        setPaymentErrors({ ...paymentErrors, holderName: "" });
      }
    }
  };

  const handlePayment = async () => {
    const errors = {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    };

    if (!paymentDetails.holderName.trim()) {
      errors.holderName = "Cardholder name is required";
    } else if (paymentDetails.holderName.trim().length < 3) {
      errors.holderName = "Name must be at least 3 characters";
    }

    const cardNumberClean = paymentDetails.cardNumber.replace(/\s/g, "");
    if (!cardNumberClean) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d+$/.test(cardNumberClean)) {
      errors.cardNumber = "Card number must contain only digits";
    } else if (cardNumberClean.length !== 16) {
      errors.cardNumber = "Card number must be exactly 16 digits";
    }

    if (!paymentDetails.expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      errors.expiryDate = "Format must be MM/YY";
    } else {
      const [month] = paymentDetails.expiryDate.split("/");
      const monthNum = parseInt(month);
      if (monthNum < 1 || monthNum > 12) {
        errors.expiryDate = "Month must be between 01 and 12";
      }
    }

    if (!paymentDetails.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
    }

    setPaymentErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    try {
      // Map request type to API type format
      const typeMapping = {
        "Full Case File": "caseFile",
        "Party Submissions": "partySubmissions",
        "Juror Voting Materials": "jurorVotingMaterials",
      };

      const paymentData = {
        initialsubmittion: selectedCase.submissionId,
        type: typeMapping[requestType] || "caseFile",
        price: 50,
      };

      const response = await paymentForFiles(paymentData).unwrap();

      if (response.success) {
        toast.success(
          `Payment hold of $50.00 placed for ${requestType}. Admin will process your request and charge the actual amount of $${selectedCase.amount}.`
        );

        setTimeout(() => {
          setShowPayment(false);
          setSelectedCase(null);
          setRequestType("");
          setPaymentDetails({
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            holderName: "",
          });
          setPaymentErrors({
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            holderName: "",
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error?.data?.message || "Payment processing failed. Please try again.");
    }
  };

  const handleLearnProcessClick = () => {
    toast.success("Opening How It Works PDF...");
    // Add actual PDF download/open logic here
    // window.open('/path-to-pdf/how-it-works.pdf', '_blank');
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              Every pattern has a file.
            </h2>
            <p className="max-w-2xl mx-auto mb-12">
              A public archive of relationship conduct—documented, accessible,
              and preserved for awareness and safety.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white">
            <div className="mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <File className="" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">File A Claim</h2>
                  <p className="">
                    A verified user submits a claim with evidence through our
                    secure web forms.
                  </p>
                </Card>

                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <King />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">Moderate & Redact</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A trained moderator redacts all personal information to
                    ensure anonymity.
                  </p>
                </Card>

                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Jury />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">Jury Vote</h2>
                  <p className="text-sm leading-relaxed">
                    Anonymous jurors review the redacted evidence and cast a
                    blind vote on the outcome.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-primary-foreground py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg px-20 lg:px-32 py-10 shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <SearchIcon />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Search The Records
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Conduct reports on individuals — filed by users, reviewed for
                patterns
              </p>
              <div className="flex justify-center items-center">
                <Button
                  onClick={handleViewRecordsClick}
                  className="py-6 px-12 rounded-md transition-colors duration-200 gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View a Record
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg px-20 lg:px-32 py-10 shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Question />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Understand the filing process and verification procedures
              </p>
              <div className="flex justify-center items-center">
                <Button
                  onClick={handleLearnProcessClick}
                  className="py-6 px-8 rounded-md transition-colors duration-200"
                >
                  <Download className="w-5 h-5" />
                  Learn the Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {(showViewRecords || showPayment) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleBackToHome}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleBackToHome}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {showPayment ? (
              <PaymentModal
                selectedCase={selectedCase}
                requestType={requestType}
                paymentDetails={paymentDetails}
                paymentErrors={paymentErrors}
                handleCardNumberChange={handleCardNumberChange}
                handleExpiryChange={handleExpiryChange}
                handleCvvChange={handleCvvChange}
                handleHolderNameChange={handleHolderNameChange}
                handlePayment={handlePayment}
                handleBackToRecords={handleBackToRecords}
                isLoading={isPaymentLoading}
              />
            ) : (
              <>
                <SearchRecordsModal
                  searchForm={searchForm}
                  setSearchForm={setSearchForm}
                  searchResults={searchResults}
                  handleSearch={handleSearch}
                  handlePersonSelect={handlePersonSelect}
                  onClose={handleBackToHome}
                  isSearching={isSearching}
                />
                <div className="px-6 pb-6">
                  <CaseDetailsView
                    selectedPerson={selectedPerson}
                    handleRecordsRequest={handleRecordsRequest}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipArchive;