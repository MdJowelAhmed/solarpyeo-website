"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
// import { useCreateSealOrExpungeMutation } from "@/redux/api/sealOrExpungeApi";
import { toast } from "sonner";
import { useCreateSealOrExpungeMutation } from "@/redux/featured/sealForm/SealOrExpungeApi";
import { useMyProfileQuery } from "@/redux/featured/auth/authApi";

const SealExpungeForm = () => {
  const [createSealOrExpunge, { isLoading }] = useCreateSealOrExpungeMutation();
  const {data:userData}=useMyProfileQuery()

  // Form State
  const [requestingParty, setRequestingParty] = useState("");
  const [platformEmail, setPlatformEmail] = useState("");
  const [fullLegalName, setFullLegalName] = useState("");
  const [recordedDetails, setRecordedDetails] = useState([]);
  const [referenceId, setReferenceId] = useState("");
  const [dateOfRecord, setDateOfRecord] = useState();
  const [requestType, setRequestType] = useState("");
  const [legalBasis, setLegalBasis] = useState([]);
  const [statement, setStatement] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");
  const [document, setDocument] = useState(null);

  const requestingPartyOptions = [
    "initiator",
    "respondent",
    "juror",
    "legal_representative",
  ];

  const recordDetailsOptions = [
    "Allegation Record",
    "Verified Proven VP Record",
    "Allegation Not Disproven AND Record",
    "Duly Disproven DD Record",
    "Withdrawn WD Record",
    "Withdrawn Case with Notice WDN Record",
    "Protection Order Entry",
    "Moderation Rejection Log (Request Sealing Only)",
    "Identity Mistake Record",
    "Appeal Record",
    "Juror Voting or Interaction Log",
  ];

  const legalBasisOptions = [
    "I was the subject of mistaken identity and this has been verified",
    "A court of law has cleared me of the alleged conduct (attach proof)",
    "The Initiator has withdrawn the allegation and consented to sealing or expungement",
    "The record was reversed on appeal",
    "I was incorrectly assigned as a Juror due to system/moderator error",
    "I submitted a Juror Recusal or Conflict Declaration not registered",
    "I was not notified or did not consent to being placed in the Juror Program",
    "My juror identity or comments were publicly exposed in violation of policy",
  ];

  const handleRecordDetailsChange = (record, checked) => {
    if (checked) {
      setRecordedDetails([...recordedDetails, record]);
    } else {
      setRecordedDetails(recordedDetails.filter((r) => r !== record));
    }
  };

  const handleLegalBasisChange = (basis, checked) => {
    if (checked) {
      setLegalBasis([...legalBasis, basis]);
    } else {
      setLegalBasis(legalBasis.filter((b) => b !== basis));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocument(file);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!requestingParty) {
      toast.error("Please select a requesting party");
      return;
    }
    if (!platformEmail || !fullLegalName) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (recordedDetails.length === 0) {
      toast.error("Please select at least one record detail");
      return;
    }
    if (!referenceId) {
      toast.error("Please enter a reference ID");
      return;
    }
    if (!dateOfRecord) {
      toast.error("Please select a date");
      return;
    }
    if (!requestType) {
      toast.error("Please select a request type (Seal or Expunge)");
      return;
    }
    if (legalBasis.length === 0) {
      toast.error("Please select at least one legal basis");
      return;
    }
    if (!statement) {
      toast.error("Please provide a statement");
      return;
    }
    if (!digitalSignature) {
      toast.error("Please provide your digital signature");
      return;
    }

    try {
      // Create FormData
      const formData = new FormData();
      
      // Generate submission ID
      const submissionId = `SUB-${Date.now()}`;
      
      formData.append("submittionId", submissionId);
      formData.append("requestingParty", requestingParty);
      formData.append("recordedDetails[]", recordedDetails.join(", "));
      formData.append("caseId", referenceId);
      formData.append("Date", dateOfRecord.toISOString());
      formData.append("request[]", requestType);
      formData.append("besisForRequest[]", legalBasis.join(", "));
      
      // Add document if exists
      if (document) {
        formData.append("documents", document);
      }
      
      formData.append("statement", statement);
      formData.append("submissionType", "Seal/Expunge Request");

      // Submit to API
      const response = await createSealOrExpunge(formData).unwrap();
      
      toast.success("Form submitted successfully!");
      
      // Reset form
      resetForm();
      
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.data?.message || "Failed to submit form. Please try again.");
    }
  };

  const resetForm = () => {
    setRequestingParty("");
    setPlatformEmail("");
    setFullLegalName("");
    setRecordedDetails([]);
    setReferenceId("");
    setDateOfRecord(undefined);
    setRequestType("");
    setLegalBasis([]);
    setStatement("");
    setDigitalSignature("");
    setDocument(null);
  };

  return (
    <div className="">
      {/* Title Section */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            <FileText className="w-8 h-8" />
            <h3 className="text-2xl">Request to Seal or Expunge a Record</h3>
          </div>
          <p className="text-center max-w-2xl mx-auto">
            For reporting abuse, falsified submissions, retaliation, unethical
            activity, or other violations of the Platform Terms.
          </p>
        </div>

        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardHeader className="mb-5">
              <p className="">Submission ID: [Auto-populated]</p>
              <p className="">Submission Date: [Auto-populated]</p>
            </CardHeader>
          </CardHeader>

          {/* Section 1: Requesting Party */}
          <div className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <h2 className="font-medium text-xl mb-6 ml-4">Requesting Party: *</h2>
            <CardContent className="space-y-3">
              {requestingPartyOptions.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`party-${index}`}
                    checked={requestingParty === item}
                    onCheckedChange={(checked) =>
                      setRequestingParty(checked ? item : "")
                    }
                  />
                  <label htmlFor={`party-${index}`} className="text-sm">
                    {item}
                  </label>
                </div>
              ))}
            </CardContent>

            <CardContent className="flex flex-col lg:flex-row gap-4 space-y-4 mt-4 w-full">
              <div className="w-full">
                <Label htmlFor="platform-account-email">
                  Platform Account Email *
                </Label>
                <Input
                  id="platform-account-email"
                  type="email"
                  placeholder="Write email address"
                  value={platformEmail}
                  onChange={(e) => setPlatformEmail(e.target.value)}
                />
              </div>

              <div className="w-full">
                <Label htmlFor="full-legal-name">Full Legal Name *</Label>
                <Input
                  id="full-legal-name"
                  placeholder="Full Legal Name"
                  value={fullLegalName}
                  onChange={(e) => setFullLegalName(e.target.value)}
                />
              </div>
            </CardContent>
          </div>
        </div>
      </div>

      {/* Section 2: Record Details */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Record Details</CardTitle>
            <p className="mb-6 text-justify">
              Record Type to be Sealed or Expunged: *
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recordDetailsOptions.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Checkbox
                    id={`record-${index}`}
                    checked={recordedDetails.includes(item)}
                    onCheckedChange={(checked) =>
                      handleRecordDetailsChange(item, checked)
                    }
                    className="mt-1"
                  />
                  <label htmlFor={`record-${index}`} className="text-sm leading-relaxed">
                    {item}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2">
                <Label htmlFor="reference-id">Enter Your Reference ID: *</Label>
                <Input
                  id="reference-id"
                  placeholder="Enter Your Reference ID"
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                />
              </div>

              <div className="w-full lg:w-1/2">
                <Label className="text-sm font-medium mb-2">
                  Date of Record Entry or Interaction: *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal py-[23px]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfRecord
                        ? dateOfRecord.toLocaleDateString()
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfRecord}
                      onSelect={setDateOfRecord}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 3: Type of Request */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="mb-6">Type of Request *</CardTitle>
          </CardHeader>

          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="seal"
                checked={requestType === "Seal"}
                onCheckedChange={(checked) =>
                  setRequestType(checked ? "Seal" : "")
                }
              />
              <label htmlFor="seal">Seal the Record (Type the justification)</label>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="expunge"
                checked={requestType === "Expunge"}
                onCheckedChange={(checked) =>
                  setRequestType(checked ? "Expunge" : "")
                }
              />
              <label htmlFor="expunge">Expunge the Record (permanent deletion)</label>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 4: Legal or Procedural Basis */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="mb-6">
              Legal or Procedural Basis for Request *
            </CardTitle>
            <p className="mb-6 text-justify">
              Please describe the event(s), behavior(s), and any associated
              case(s). Include dates, communication, or submissions if known.
            </p>
          </CardHeader>

          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            {legalBasisOptions.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 mb-3">
                <Checkbox
                  id={`basis-${index}`}
                  checked={legalBasis.includes(item)}
                  onCheckedChange={(checked) =>
                    handleLegalBasisChange(item, checked)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor={`basis-${index}`}
                  className="text-sm leading-relaxed break-words"
                >
                  {item}
                </Label>
              </div>
            ))}

            {/* File Upload */}
            <div className="mt-6 w-full">
              <label className="block text-gray-700 font-medium mb-3">
                Upload Supporting Document (if applicable):
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="document"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="document"
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-gray-700">
                    {document ? document.name : "Choose File"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {document ? "" : "No file chosen"}
                  </span>
                </label>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 5: Statement of Request */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Statement of Request *</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <p className="text-justify mb-4">
              Please describe in your own words why you believe the record
              should be sealed or expunged. Be specific. If this relates to
              juror conduct, describe the case interaction, what occurred, and
              what remedy you are seeking.
            </p>
            <Textarea
              id="statement"
              placeholder="Write Your Explanation Here..."
              className="h-48"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
            />
          </CardContent>
        </div>
      </div>

      {/* Section 6: Declaration & Signature */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Declaration & Signature *</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <h4 className="mb-4">
              I declare under penalty of perjury that the foregoing is true and
              correct.
            </h4>
            <div>
              <Label htmlFor="digital-signature">Digital Signature *</Label>
              <Input
                id="digital-signature"
                placeholder="Your full name here..."
                className="w-full lg:w-1/2"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
              />
            </div>

            <div className="space-y-6 mt-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="today">📅 Date: [Auto-filled]</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="signature-day">
                  📍 IP Address: [Auto-captured]
                </Label>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Final Warning & Submit */}
      <div className="bg-secondary custom-padding">
        <div className="bg-primary-foreground border-l-4 border-red-700 rounded-md p-4">
          <h4 className="font-medium mb-2">Final Warning</h4>
          <p className="text-sm">
            KNOWINGLY MAKING A MATERIALLY FALSE STATEMENT ON THIS FORM IS A
            4TH DEGREE CRIME. N.J.S.A. 2C:28-2 makes knowingly making a
            materially false statement in any government document a crime
            punishable by up to 18 months in prison and a fine of up to
            $10,000, or both. Answering this information is voluntary.
          </p>
        </div>

        <div className="w-full mt-6 flex justify-end">
          <Button 
            onClick={handleSubmit}
            className="md:w-1/2 py-6 lg:w-1/5"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Request For Review"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SealExpungeForm;