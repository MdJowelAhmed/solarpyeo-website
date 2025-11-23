"use client";

import React, { useState } from "react";
import {
  Search,
  User,
  Calendar,
  Gavel,
  X,
  CreditCard,
  Eye,
  Download,
} from "lucide-react";
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

// Mock data for View Records functionality
const mockRecords = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
    fullName: "John Doe",
    caseIds: [
      { id: "CASE-001", verdictCode: "GUILTY", amount: 25.0 },
      { id: "CASE-002", verdictCode: "DISMISSED", amount: 15.0 },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "1985-12-08",
    fullName: "Jane Smith",
    caseIds: [{ id: "CASE-003", verdictCode: "PENDING", amount: 35.0 }],
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: "1992-03-22",
    fullName: "John Smith",
    caseIds: [
      { id: "CASE-004", verdictCode: "NOT GUILTY", amount: 20.0 },
      { id: "CASE-005", verdictCode: "GUILTY", amount: 45.0 },
    ],
  },
];

const RelationshipArchive = () => {
  // States for View Records functionality
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

  // View Records functionality
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
  };

  const handleSearch = () => {
    const results = mockRecords.filter(
      (record) =>
        record.firstName
          .toLowerCase()
          .includes(searchForm.firstName.toLowerCase()) &&
        record.lastName
          .toLowerCase()
          .includes(searchForm.lastName.toLowerCase()) &&
        (searchForm.dateOfBirth === "" ||
          record.dateOfBirth === searchForm.dateOfBirth)
    );
    setSearchResults(results);
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
  };

  const handleRecordsRequest = (caseData, type) => {
    setSelectedCase(caseData);
    setRequestType(type);
    setShowPayment(true);
  };

  const handlePayment = () => {
    alert(
      `Payment hold of $50.00 placed for ${requestType}. Admin will process your request and charge the actual amount of $${selectedCase.amount}.`
    );
    setShowPayment(false);
    setSelectedCase(null);
    setRequestType("");
    setPaymentDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
    });
  };

  const handleLearnProcessClick = () => {
    // This would typically download or open a PDF
    // For demo purposes, we'll just show an alert
    toast.success("Opening How It Works PDF...");
    // In a real implementation, you might do:
    // window.open('/path/to/how-it-works.pdf', '_blank');
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
                {/* File A Claim */}
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

                {/* Moderate & Redact */}
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

                {/* Jury Vote */}
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
            {/* Search The Records */}
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
                  className=" py-6 px-12 rounded-md transition-colors duration-200  gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View a Record
                </Button>
              </div>
            </div>

            {/* How It Works */}
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
                  className=" py-6 px-8 rounded-md transition-colors duration-200 "
                >
                  <Download className="w-5 h-5" />
                  Learn the Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay for View Records */}
      {(showViewRecords || showPayment) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleBackToHome}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleBackToHome}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Payment Modal Content */}
            {showPayment ? (
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

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
                      <strong>Note:</strong> We will place a $50.00 hold on your
                      payment method. After admin review, you will be charged
                      the actual amount (${selectedCase?.amount}) and the hold
                      will be released.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.holderName}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          holderName: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter cardholder name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cvv}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setShowPayment(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePayment}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Place $50.00 Hold & Request Records
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // View Records Modal Content
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Search Records</h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={searchForm.firstName}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={searchForm.lastName}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={searchForm.dateOfBirth}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-3 flex items-center justify-center w-full mt-6">
                    <Button
                      onClick={handleSearch}
                      className="px-6 py-3 transition-colors "
                    >
                      <Search className="w-5 h-5" />
                      Search Records
                    </Button>
                  </div>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Search Results</h3>
                    <div className="space-y-3">
                      {searchResults.map((person) => (
                        <div
                          key={person.id}
                          onClick={() => handlePersonSelect(person)}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <User className="w-8 h-8 text-gray-600" />
                            <div>
                              <div className="font-medium text-lg">
                                {person.fullName}
                              </div>
                              <div className="text-gray-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {person.dateOfBirth}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Person Details */}
                {selectedPerson && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">
                      Case Records for {selectedPerson.fullName}
                    </h3>
                    <div className="space-y-4">
                      {selectedPerson.caseIds.map((caseData) => (
                        <div
                          key={caseData.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="font-medium text-lg">
                                {caseData.id}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Gavel className="w-4 h-4 text-gray-600" />
                                <span
                                  className={`px-2 py-1 rounded text-sm ${
                                    caseData.verdictCode === "GUILTY"
                                      ? "bg-red-100 text-red-800"
                                      : caseData.verdictCode === "NOT GUILTY"
                                      ? "bg-green-100 text-green-800"
                                      : caseData.verdictCode === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {caseData.verdictCode}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-3 gap-3">
                            <button
                              onClick={() =>
                                handleRecordsRequest(caseData, "Full Case File")
                              }
                              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                              Full Case File
                            </button>
                            <button
                              onClick={() =>
                                handleRecordsRequest(
                                  caseData,
                                  "Party Submissions"
                                )
                              }
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                            >
                              Party Submissions
                            </button>
                            <button
                              onClick={() =>
                                handleRecordsRequest(
                                  caseData,
                                  "Juror Voting Materials"
                                )
                              }
                              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                            >
                              Juror Voting Materials
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.length === 0 &&
                  searchForm.firstName &&
                  searchForm.lastName && (
                    <div className="text-center py-8">
                      <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Records Found
                      </h3>
                      <p className="text-gray-600">
                        No records match your search criteria. Please verify the
                        information and try again.
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipArchive;
