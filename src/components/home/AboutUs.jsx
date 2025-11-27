"use client";

import React, { useState, useEffect } from "react";
import { Eye, Download, X, Loader2, CloudFog } from "lucide-react";
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
import { usePaymentForFilesMutation, useSearchFilesByUserMutation, useSearchFilesQuery } from "@/redux/featured/searchFiles/searchFilesApi";
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
  const [isSearching, setIsSearching] = useState(false);

  const [searchFilesByUser] = useSearchFilesByUserMutation();
  const [paymentForFiles, { isLoading: isPaymentLoading }] = usePaymentForFilesMutation();
  const { data: userCasesRes } = useSearchFilesQuery(selectedPerson?.id, { skip: !selectedPerson?.id });

  const handleViewRecordsClick = () => {
    setShowViewRecords(true);
  };

  const handleBackToHome = () => {
    setShowViewRecords(false);
    setSearchResults([]);
    setSelectedPerson(null);
    setSearchForm({ firstName: "", lastName: "", dateOfBirth: "" });
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
console.log("response", response);
      if (response.success && response.data) {
        const transformedResults = response.data.map((item) => ({
          id: item._id,
          firstName: item.firstName,
          middleName: item.middleName,
          lastName: item.lastName,
          dateOfBirth: item.birthDate,
          fullName: `${item.firstName} ${item.middleName || ''} ${item.lastName}`.trim(),
          email: item.email,
          profile: item.profile,
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
    setSelectedPerson({ ...person, caseIds: [] });
  };

  useEffect(() => {
    if (selectedPerson && userCasesRes?.success && Array.isArray(userCasesRes.data)) {
      const casesWithVerdict = userCasesRes.data.map((caseItem) => {
        let verdictCode = "PENDING";
        if (caseItem.status === "APPROVED" && caseItem.jurorDecisions?.length > 0) {
          const decisions = caseItem.jurorDecisions;
          const acceptCount = decisions.filter((d) => d.action === "ACCEPT").length;
          const rejectCount = decisions.filter((d) => d.action === "REJECT").length;
          const unableCount = decisions.filter((d) => d.action === "UNABLETODECIDE").length;
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
          verdictCode,
          amount: 25.0,
          submissionId: caseItem._id,
          status: caseItem.status,
          typeOfFiling: caseItem.typeOfFiling,
          createdAt: caseItem.createdAt,
        };
      });
      setSelectedPerson((prev) => ({ ...(prev || {}), caseIds: casesWithVerdict }));
    }
  }, [selectedPerson?.id, userCasesRes]);

  const handleRecordsRequest = async (caseData, type) => {
    if (isPaymentLoading) return;

    try {
      // Map request type to API type format
      const typeMapping = {
        "Full Case File": "caseFile",
        "Party Submissions": "partySubmission",
        "Juror Voting Materials": "jurorMonitoring",
      };

      const paymentData = {
        initialsubmittion: caseData.submissionId,
        type: typeMapping[type] || "caseFile",
        price: 50,
      };

      toast.loading("Processing your request...");

      const response = await paymentForFiles(paymentData).unwrap();

      toast.dismiss();

      if (response.success && response.data?.url) {
        toast.success("Redirecting to payment...");
        
        // Redirect to Stripe payment URL
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to get payment URL. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Payment request error:", error);
      toast.error(error?.data?.message || "Failed to process request. Please try again.");
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
      {showViewRecords && (
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
                isLoading={isPaymentLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipArchive;
