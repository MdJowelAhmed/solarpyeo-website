"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, FileText, Upload } from "lucide-react";

const SealExpungeForm = () => {
  const [dateOfRecord, setDateOfRecord] = useState();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [requestType, setRequestType] = useState("");
  const [legalBasis, setLegalBasis] = useState([]);

  const [selectedFiles1, setSelectedFiles1] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState(null);
  const [supportingLink, setSupportingLink] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleFileChange = (event, fileNumber) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (fileNumber === 1) {
        setSelectedFiles1(files[0]);
      } else {
        setSelectedFiles2(files[0]);
      }
    }
  };

  const handleRecordChange = (recordId, checked) => {
    if (checked) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords.filter((id) => id !== recordId));
    }
  };

  const handleLegalBasisChange = (basisId, checked) => {
    if (checked) {
      setLegalBasis([...legalBasis, basisId]);
    } else {
      setLegalBasis(legalBasis.filter((id) => id !== basisId));
    }
  };

  return (
    <div className="">
      {/* Title Section */}
      <div className="bg-secondary-foreground custom-padding ">
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
              {/* <CardTitle className="text-lg text-red-600">
                    SECTION 1: Record Details
                  </CardTitle> */}
              <p className="">Submission ID: [Auto-populated]</p>
              <p className="">Submission Date: [Auto-populated]</p>
            </CardHeader>
          </CardHeader>

          {/* Section 1: Record Details */}
          <div className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10 ">
            <h2 className="font-medium text-xl mb-6 ml-4">Requesting Party:</h2>
            <CardContent className="space-y-3">
              {[
                "Initiator",
                "Respondent",
                "Juror",
                "Legal Representative (attach authority)",
                // "Witness / VOP Report",
                // "Substance Conviction under N.J.S.A. Record",
                // "Conditional Discharge Entry",
                // "Disorderly Persons (M) and/or Municipal Summon (s)(M)",
                // "Specific Individual Violation",
                // "Sealed Record",
                // "Court Violation / Sentencing",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`record-${index}`}
                    checked={selectedRecords.includes(`record-${index}`)}
                    onCheckedChange={(checked) =>
                      handleRecordChange(`record-${index}`, checked)
                    }
                  />
                  <p htmlFor={`record-${index}`} className="text-sm">
                    {item}
                  </p>
                </div>
              ))}

              {/* Personal Information */}
            </CardContent>

            <CardContent className="flex flex-col lg:flex-row gap-4 space-y-4 mt-4 w-full">
              <div className="mb-4">
                <Label htmlFor="platform-account-email">
                  Platform Account Email
                </Label>
                <Input id="court-info" placeholder="Write email address" />
              </div>

              <div>
                <Label htmlFor="full-legal-name">Full Legal Name</Label>
                <Input
                  id="full-legal-name"
                  placeholder="Full Legal Name"
                  className="w-full"
                />
              </div>
            </CardContent>
          </div>
        </div>
      </div>

      {/* Section 2: Type of Request */}
      <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <CardHeader>
            <h3 className="">SECTION 1:Record Details</h3>
            <p className="mb-6 text-center">
              Record Type to be Sealed or Expunged:
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              <>Allegation Record</>,
              <>
                Verified Proven <span className="font-bold">VP</span> Record
              </>,
              <>
                Allegation Not Disproven <span className="font-bold">AND</span>{" "}
                Record
              </>,
              <>
                Duly Disproven <span className="font-bold">DD</span> Record
              </>,
              <>
                Withdrawn <span className="font-bold">WD</span> Record
              </>,
              <>
                Withdrawn Case with Notice{" "}
                <span className="font-bold">WDN</span> Record
              </>,
              <>Protection Order Entry</>,
              <>Moderation Rejection Log (Request Sealing Only)</>,
              <>Identity Mistake Record</>,
              <>Appeal Record</>,
              <>Juror Voting or Interaction Log</>,
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`legal-${index}`}
                  checked={legalBasis.includes(`legal-${index}`)}
                  onCheckedChange={(checked) =>
                    handleLegalBasisChange(`legal-${index}`, checked)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor={`legal-${index}`}
                  className="text-sm leading-relaxed"
                >
                  {item}
                </Label>
              </div>
            ))}

            <div className="mt-4">
              <h4 className="mb-6">
                🔎 Note: Juror Voting or Interaction Logs are eligible for
                sealing or expungement only under verified circumstances such as
                mistaken assignment, account error, or breach of internal
                platform policy.
              </h4>
              <Label htmlFor="other-explanation">
                Enter Your Reference ID:
              </Label>
              <Input
                id="reference-id"
                placeholder="Enter Your Reference ID"
                className="w-1/2 "
              />
            </div>

            <div className="mt-6">
              <div>
                <Label className="text-sm font-medium mb-2">
                  Date of Record Entry or Interaction:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfRecord
                        ? dateOfRecord.toLocaleDateString()
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-6 ">
                    <Calendar
                      mode="single"
                      selected={dateOfRecord}
                      onSelect={setDateOfRecord}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                        <span className="text-sm text-gray-500">
                          No file chosen
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                        <span className="text-sm text-gray-500">
                          No file chosen
                        </span>
                      </div>
                    </div> */}
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 3: Legal or Procedural Basis */}
      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <CardHeader>
            <h3 className="mb-6">⚖️ SECTION 2: Type of Request</h3>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="seal"
                checked={requestType === "seal"}
                onCheckedChange={(checked) =>
                  setRequestType(checked ? "seal" : "")
                }
              />
              <Label htmlFor="seal">
                Seal the Record. (Type the justification)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="expunge"
                checked={requestType === "expunge"}
                onCheckedChange={(checked) =>
                  setRequestType(checked ? "expunge" : "")
                }
              />
              <Label htmlFor="expunge">
                Expunge the Record (permanent deletion)
              </Label>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 4: Statement of Request */}
      <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <CardHeader>
            <h3 className="">
              📄 SECTION 3: Legal or Procedural Basis for Request
            </h3>
            <h4 className="mb-6 text-center">
              Please describe the event(s), behavior(s), and any associated
              case(s). Include dates, communication, or submissions if known.
            </h4>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Checkbox List */}
            {[
              "I was the subject of mistaken identity and this has been verified",
              `A court of law has cleared me of the alleged conduct (attach proof).
In some cases we may retain the proof under the Platform Case data and change 
the records on the parties within the Platform instead of Seal or Expungement.`,
              "The Initiator has withdrawn the allegation and consented to sealing or expungement",
              "The record was reversed on appeal",
              "I was incorrectly assigned as a Juror due to system/moderator error",
              "I submitted a Juror Recusal or Conflict Declaration not registered",
              "I was not notified or did not consent to being placed in the Juror Program",
              "My juror identity or comments were publicly exposed in violation of policy",
              "Other (explain):",
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`legal-${index}`}
                  checked={legalBasis.includes(`legal-${index}`)}
                  onCheckedChange={(checked) =>
                    handleLegalBasisChange(`legal-${index}`, checked)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor={`legal-${index}`}
                  className="text-sm leading-relaxed break-words"
                >
                  {item}
                </Label>
              </div>
            ))}

            {/* Note + Reference ID */}
            <div>
              <Textarea
                id="reference-id"
                placeholder="Write here explanation"
                className="w-full h-40 "
              />
            </div>

            {/* Date Picker + File Upload */}
            <div className="space-y-4">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Upload File 1:
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file1"
                    onChange={(e) => handleFileChange(e, 1)}
                    className="hidden"
                  />
                  <label
                    htmlFor="file1"
                    className="flex items-center justify-between w-1/4 px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-gray-700">
                      {selectedFiles1 ? selectedFiles1.name : "Choose File"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {selectedFiles1 ? "" : "No file chosen"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Upload File 2 */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">
                  Upload File 2:
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file2"
                    onChange={(e) => handleFileChange(e, 2)}
                    className="hidden"
                  />
                  <label
                    htmlFor="file2"
                    className="flex items-center justify-between w-1/4 px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-gray-700">
                      {selectedFiles2 ? selectedFiles2.name : "Choose File"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {selectedFiles2 ? "" : "No file chosen"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Optional Link */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">
                  Optional Link (e.g., Case ID or Submission URL):
                </label>
                <input
                  type="text"
                  value={supportingLink}
                  onChange={(e) => setSupportingLink(e.target.value)}
                  placeholder="Enter Your Supporting Link"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <CardHeader>
            <h3 className="">📝 SECTION 5: Statement of Request</h3>
            <h4 className="mb-6 max-w-4xl mx-auto">
              Please describe in your own words why you believe the record
              should be sealed or expunged. Be specific. If this relates to
              juror conduct, describe the case interaction, what occurred, and
              what remedy you are seeking.
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              {/* <Label htmlFor="print-signature">Public Signature</Label> */}
              <Textarea
                id="print-signature"
                placeholder="Write Your Explanation Here..."
                className="h-48"
              />
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 5: Declaration & Signature */}
      <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <CardHeader>
            <h3 className="">✍️ SECTION 5: Declaration & Signature</h3>
            <h4 className="mb-6 max-w-4xl mx-auto">
              Please describe in your own words why you believe the record
              should be sealed or expunged. Be specific. If this relates to
              juror conduct, describe the case interaction, what occurred, and
              what remedy you are seeking.
            </h4>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <Label htmlFor="print-signature">Digital Signature</Label>
              <Input
                id="print-signature"
                placeholder="Your full name here..."
                className="w-1/2"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Label htmlFor="today">📅 Date: [Auto-filled]</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="signature-day">
                  📍 IP Address: [Auto-captured]
                </Label>
              </div>
            </div>

            <div className="bg-primary-foreground border-l-4 border-red-700 rounded-lg p-4">
              <h4 className="font-medium mb-2">Final Warning</h4>
              <p className="text-sm ">
                KNOWINGLY MAKING A MATERIALLY FALSE STATEMENT ON THIS FORM IS A
                4TH DEGREE CRIME. N.J.S.A. 2C:28-2 makes knowingly making a
                materially false statement in any government document a crime
                punishable by up to 18 months in prison and a fine of up to
                $10,000, or both. Answering this information is voluntary.
              </p>
            </div>

            <div className="w-full  flex justify-end">
              <Button className="md:w-1/2 lg:w-1/5">
                Submit Request For Review
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default SealExpungeForm;
