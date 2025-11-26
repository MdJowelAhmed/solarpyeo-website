"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, FileText, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
// import { useCreateIdentityDisputeMutation } from "@/redux/api/identityDisputeApi";
import { toast } from "sonner"; // or your toast library
import { useCreateIdentityDisputeMutation } from "@/redux/featured/identityDispute/indentityDisputeApi";
import { useSearchMySubmissionFormQuery } from "@/redux/featured/searchFiles/searchFilesApi";

export default function IdentityDisputeForm() {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState("");
  // const [digitalSignature, setDigitalSignature] = useState("");
  
  const [createIdentityDispute, { isLoading }] = useCreateIdentityDisputeMutation();
   const { data: submissionFormResponse, isLoading: isDataLoading } = useSearchMySubmissionFormQuery();
  
    const submissionData = submissionFormResponse?.data || [];
  
    // Get selected case data
    const selectedCase = submissionData.find(
      (item) => item.submissionId.caseId === selectedCaseId
    );
  
    const caseId = selectedCase?.submissionId?.caseId || "[Case-ID-Here]";
 const submissionId = selectedCase?.submissionId?._id || "[Submission-ID-Here]";

    const respondent = selectedCase
      ? `${selectedCase.user.firstName} ${selectedCase.user.middleName || ""} ${selectedCase.user.lastName}`.trim()
      : "[Your-Name-Here]";
const email = selectedCase?.user?.email || "[Email-Here]";
  const disputeReasons = [
    "I am not the individual referenced in this case/allegation.",
    "Someone used my name or likeness without authorization.",
    "My account has been confused with another user.",
    "I was incorrectly linked due to a technical error or similarity in name/data.",
  ];

  const handleReasonChange = (reason, checked) => {
    if (checked) {
      setSelectedReasons([...selectedReasons, reason]);
    } else {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (selectedReasons.length === 0 && !otherReason.trim()) {
      toast.error("Please select at least one reason or describe your dispute");
      return;
    }

    // if (!digitalSignature.trim()) {
    //   toast.error("Please provide your digital signature");
    //   return;
    // }

    // Prepare data in the required format
    const identityDisputeArray = [...selectedReasons];
    
    // Add other reason if provided
    if (otherReason.trim()) {
      identityDisputeArray.push(otherReason.trim());
    }

    const formData = {
      identityDispute: identityDisputeArray,
      // digitalSignature: digitalSignature.trim(),

      submissionId,
    
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await createIdentityDispute(formData).unwrap();
      
      toast.success("Identity dispute submitted successfully!");
      
      // Reset form
      setSelectedReasons([]);
      setOtherReason("");
      // setDigitalSignature("");
      
    } catch (error) {
      console.error("Failed to submit dispute:", error);
      toast.error(error?.data?.message || "Failed to submit dispute. Please try again.");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="mb-6">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center">
            📄 User Identity Dispute / Mistaken Identity Claim Form
          </h2>

          <div className="">
            <p className="text-sm mb-5">
              <strong>Purpose:</strong> This form is for users who believe they
              have been incorrectly identified or associated with a case,
              allegation, or profile record on the platform.
            </p>
          </div>
             <div className="w-full md:w-1/2 lg:w-1/3">
                          <Label className="text-sm font-medium text-gray-700">
                            Select a Case to Auto fill *
                          </Label>
                          <select
                            value={selectedCaseId}
                            onChange={(e) => setSelectedCaseId(e.target.value)}
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                          >
                            <option value="">-- Choose a case --</option>
                            {isDataLoading ? (
                              <option disabled>Loading cases...</option>
                            ) : submissionData.length === 0 ? (
                              <option disabled>No cases found</option>
                            ) : (
                              submissionData.map((item) => (
                                <option
                                  key={item._id}
                                  value={item.submissionId.caseId}
                                >
                                  {item.submissionId.caseId} - {item.user.firstName}{" "}
                                  {item.user.lastName} ({item.status})
                                </option>
                              ))
                            )}
                          </select>
                        </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <strong>Platform Case Reference ID:</strong> {caseId}
            </div>
            {/* <div>
              <strong>Linked Record or Profile ID:</strong> [Auto-populated]
            </div> */}
            <div>
              <strong>Your Full Legal Name:</strong> {respondent}
            </div>
            <div>
              <strong>Your Verified Platform Account Email:</strong>{" "}
              {email}
            </div>
          </div>
        </div>

        {/* Section 1: Type of Identity Dispute */}
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">TYPE OF IDENTITY DISPUTE</CardTitle>
            <p className="text-justify">
              Please select the reason(s) for your dispute:
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="space-y-4 mb-4">
              {disputeReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Checkbox
                    id={`reason-${index}`}
                    checked={selectedReasons.includes(reason)}
                    onCheckedChange={(checked) => handleReasonChange(reason, checked)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`reason-${index}`}
                    className="cursor-pointer flex-1"
                  >
                    {reason}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Other reason (optional):
              </label>
              <Textarea
                placeholder="Describe other reason here..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="min-h-[150px] text-sm"
              />
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 2: Declaration */}
      {/* <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <div className="">
              <CardTitle className="">DECLARATION</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <p className="text-sm text-gray-700 mb-6">
              I declare under penalty of perjury that the information I have
              provided in this form is true and correct to the best of my
              knowledge. I understand that submitting false identity claims may
              result in account suspension, permanent banning or legal
              consequences.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Digital Signature (type full legal name) <span className="text-red-600">*</span>
              </label>
              <Input
                placeholder="Enter your legal full name"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>
                  IP Address and Timestamp: [auto-captured by platform]
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </div> */}

      {/* What Happens Next */}
      <div className="bg-secondary custom-padding">
        <CardContent className="bg-primary-foreground border-l-4 border-red-700 rounded-md p-5">
          <h2 className="text-2xl font-bold text-primary-900">
            What Happens Next?
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              Your claim will be reviewed by platform moderation staff within{" "}
              <strong>5 business days</strong>.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              If sufficient evidence of mistaken identity is found, the record
              will be suspended or removed.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              If evidence is insufficient, you may request escalation or appeal
              under platform policy.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              Malicious or repeat false identity disputes may result in
              penalties.
            </li>
          </ul>
        </CardContent>

        {/* Submit Button */}
        <div className="text-center flex justify-end mt-6">
          <Button
            className="py-6"
            onClick={handleSubmit}
            disabled={isLoading || (!selectedReasons.length && !otherReason.trim()) }
          >
            {isLoading ? "Submitting..." : "Submit Claim For Review"}
          </Button>
        </div>
      </div>
    </div>
  );
}