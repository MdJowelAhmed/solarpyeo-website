"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useCreateMisuseFormMutation } from "@/redux/featured/misuseForm/misuseFormApi";

export default function MisuseReportForm() {
  // Reporter Information
  const [fullName, setFullName] = useState("");
  const [anonymousPreferred, setAnonymousPreferred] = useState(false);
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [caseID, setCaseID] = useState("");
  const [isKnowledgeable, setIsKnowledgeable] = useState("yes");

  // Nature of Misuse
  const [misuseNature, setMisuseNature] = useState([]);

  // Subject of Complaint
  const [complaintSubject, setComplaintSubject] = useState("");
  const [subjectEmail, setSubjectEmail] = useState("");
  const [allegedOfficial, setAllegedOfficial] = useState("");

  // Incident Details
  const [incidentDetails, setIncidentDetails] = useState("");

  // Supporting Evidence
  const [selectedFiles1, setSelectedFiles1] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState(null);
  const [supportingLink, setSupportingLink] = useState("");

  // Resolution Requested
  const [resolutionRequested, setResolutionRequested] = useState([]);

  // Affirmation & Signature
  const [affirmation, setAffirmation] = useState(false);
  const [signature, setSignature] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();

  // RTK Query mutation
  const [createMisuseForm, { isLoading }] = useCreateMisuseFormMutation();

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

  const handleMisuseNatureChange = (value, checked) => {
    setMisuseNature((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAllegedOfficialChange = (value) => {
    setAllegedOfficial(value);
  };

  const handleResolutionChange = (value, checked) => {
    setResolutionRequested((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!fullName || !emailAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!dateOfBirth) {
      toast.error("Please select your date of birth");
      return;
    }

    if (misuseNature.length === 0) {
      toast.error("Please select at least one nature of misuse");
      return;
    }

    if (!complaintSubject) {
      toast.error("Please enter the subject of complaint");
      return;
    }

    if (!incidentDetails) {
      toast.error("Please describe the incident");
      return;
    }

    if (!affirmation) {
      toast.error("Please affirm the declaration");
      return;
    }

    if (!signature) {
      toast.error("Please provide your signature");
      return;
    }

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Match exact Postman field names
      formData.append(
        "knowThisPerson",
        isKnowledgeable === "yes" ? "true" : "false"
      );

      // Nature of Misuse - send as single comma-separated string or array
      misuseNature.forEach((nature, index) => {
        formData.append(`natureOfTheReported[${index}]`, nature);
      });

      // Subject of Complaint
      formData.append("subjectOfTheComplaint[name]", complaintSubject);
      formData.append("subjectOfTheComplaint[email]", subjectEmail);
      if (allegedOfficial) {
        formData.append("subjectOfTheComplaint[employee]", allegedOfficial);
      }

      // Incident Details
      formData.append("description", incidentDetails);

      // Resolution Requested
      resolutionRequested.forEach((resolution, index) => {
        formData.append(`resolutionRequested[${index}]`, resolution);
      });

      // Affirmation & Signature
      formData.append(
        "affirmationAndSignature",
        affirmation ? "true" : "false"
      );

      // Supporting Documents
      if (selectedFiles1) {
        formData.append("supportingDocument", selectedFiles1);
      }
      if (selectedFiles2) {
        formData.append("supportingDocument", selectedFiles2);
      }

      // Debug FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      // Submit the form
      const result = await createMisuseForm(formData).unwrap();
      console.log(result);

      toast.success("Misuse report submitted successfully!");

      // Reset form
      setFullName("");
      setAnonymousPreferred(false);
      setUsername("");
      setEmailAddress("");
      setCaseID("");
      setIsKnowledgeable("yes");
      setMisuseNature([]);
      setComplaintSubject("");
      setSubjectEmail("");
      setAllegedOfficial("");
      setIncidentDetails("");
      setSelectedFiles1(null);
      setSelectedFiles2(null);
      setSupportingLink("");
      setResolutionRequested([]);
      setAffirmation(false);
      setSignature("");
      setDateOfBirth(undefined);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.message || "Failed to submit report. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        {/* Title Section */}
        <div className="bg-secondary-foreground custom-padding py-12 md:py-16 lg:py-24">
          <div className="">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl lg:text-4xl font-bold text-center">
                  Misuse Report Form
                </h2>
                
              </div>
              <p className="text-gray-600 text-sm leading-relaxed text-center max-w-2xl mx-auto mt-3">
                Use this form to report any misuse of power, fraud, waste, abuse
                of authority, or any violation of law or policy. Your report
                will be treated confidentially to the extent permitted by law.
              </p>
            </div>
            <div className="">
              <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
                <CardHeader className="pb-4 w-full lg:w-1/5">
                  <CardTitle>Section 1: Reporter Information</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Please provide your contact information. Anonymous reporting
                    is allowed.
                  </p>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Are you personally knowledgeable about the problem or
                      event reported? (or this disclosure):
                    </p>
                    <RadioGroup
                      value={isKnowledgeable}
                      onValueChange={setIsKnowledgeable}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardHeader>

                <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
                  <div className="grid md:grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username (if applicable)</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="caseID">If yes specify Case ID</Label>
                      <Input
                        id="caseID"
                        value={caseID}
                        onChange={(e) => setCaseID(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={anonymousPreferred}
                      onCheckedChange={setAnonymousPreferred}
                    />
                    <Label htmlFor="anonymous">
                      Prefer to remain anonymous
                    </Label>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Nature of Misuse */}
        <div className="py-12 md:my-16 lg:py-24 bg-secondary-foreground">
          <div className="container mx-auto">
            <CardHeader>
              <h3 className="text-red-700">
                Section 2: Nature Of The Reported Misuse
              </h3>
              <h4 className="text-center mb-6">(Select all that apply)</h4>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-1 gap-4">
                {[
                  "Exceeding normal budgetary expenditures",
                  "Budgetary misapplication",
                  "Harassment or threats per coercive funds",
                  "Identity Misuse From winning Users",
                  "User endorsement as conflict of interests",
                  "Assistance of Staff information",
                  "Data misuse, identity",
                  "Unauthorized misuse or System forgering",
                  "Others",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`misuse-${index}`}
                      checked={misuseNature.includes(item)}
                      onCheckedChange={(checked) =>
                        handleMisuseNatureChange(item, checked)
                      }
                    />
                    <Label htmlFor={`misuse-${index}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Subject of Complaint */}
        <div className="py-12 md:py-16 lg:py-12 bg-secondary">
          <div className="container mx-auto">
            <div>
              <h3 className="mb-6">Section 3: Subject of The Complaint</h3>
            </div>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  Name of the Person Being or Mayor Employer (if known): *
                </Label>
                <Input
                  value={complaintSubject}
                  onChange={(e) => setComplaintSubject(e.target.value)}
                />
              </div>

              <div>
                <Label>Email of the person (if known):</Label>
                <Input
                  type="email"
                  value={subjectEmail}
                  onChange={(e) => setSubjectEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>What was alleged official or employee:</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "initiator",
                    "respondent",
                    "juror",
                    "moderator/staff",
                    "unknown field",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`official-${index}`}
                        checked={allegedOfficial.includes(item)}
                        onCheckedChange={(checked) =>
                          handleAllegedOfficialChange(item, checked)
                        }
                      />
                      <Label htmlFor={`official-${index}`} className="text-sm">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 4: Incident Details */}
        <div className="py-12 md:py-16 lg:py-24 bg-secondary-foreground">
          <div className="container mx-auto">
            <CardHeader>
              <h3>Section 4: Incident Details</h3>
            </CardHeader>
            <CardContent>
              <h4 className="text-center mb-6">
                Please describe the event(s), behavior(s), and any associated
                case(s). Include dates, communication, or submissions if known.
              </h4>

              <div>
                <Label>Description of Incident(s): *</Label>
                <Textarea
                  className="h-40"
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                />
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 5: Supporting Evidence */}
        <div className="py-12 md:py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto">
            <CardHeader>
              <h3>Section 5: Supporting Evidence</h3>
            </CardHeader>
            <CardContent>
              <h4 className="text-center mb-6">
                Attach any documents you cite and the documents that you can
                provide to support maintaining an administrative filing etc.
              </h4>

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
            </CardContent>
          </div>
        </div>

        {/* Section 6: Resolution Requested */}
        <div className="py-12 md:py-16 lg:py-24 bg-secondary-foreground">
          <div className="container mx-auto">
            <CardHeader>
              <h3>Section 6: Resolution Requested</h3>
            </CardHeader>
            <CardContent>
              <h4 className="mb-6 text-center">
                Check the outcome that you believe would correct or redress the
                violation:
              </h4>

              <div className="grid md:grid-cols-1 gap-6">
                {[
                  "Criminal investigation",
                  "Disciplinary Personnel security measures",
                  "Personnel selection criteria",
                  "Other financial or audit",
                  "Money to be adding or Effective",
                  "Disciplinary to employee and personal termina",
                  "Investigation to check placement and Right to give and continues the community",
                  "Others",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`resolution-${index}`}
                      checked={resolutionRequested.includes(item)}
                      onCheckedChange={(checked) =>
                        handleResolutionChange(item, checked)
                      }
                    />
                    <Label htmlFor={`resolution-${index}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 7: Affirmation & Signature */}
        <div className="py-12 md:py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto">
            <CardHeader>
              <h3>Section 7: Affirmation & Signature</h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-lg">
                <p className="text-xl font-medium mb-2">
                  Perjury Declaration & Affidavit: Compliance Advice
                </p>
                <p className="text-sm">
                  I swear or affirm under penalty of perjury that the
                  information I have provided in this complaint is true and
                  correct to the best of my knowledge and belief. I understand
                  that this information may be investigated and may result in
                  legal action against the named individual(s). I also
                  understand that knowingly filing a false complaint may subject
                  me to criminal penalties.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="affirmation"
                  checked={affirmation}
                  onCheckedChange={setAffirmation}
                />
                <Label htmlFor="affirmation" className="text-sm">
                  I affirm and attest to the absolute statement. *
                </Label>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <Label>Report Signature: *</Label>
                  <Input
                    className="mt-1"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth
                          ? dateOfBirth.toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-6">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Submit Section */}
        <div className="container mx-auto">
          <p className="mb-4">
            Upon submission, you will receive a confirmation receipt and
            tracking number. A member of the Platform`s{" "}
            <strong>Compliance & Integrity Division</strong> will review your
            report within <strong>5–10 business days</strong>. You may be
            contacted for clarification or further evidence if needed.
          </p>

          <div className="flex w-full items-center justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!affirmation || isLoading}
              className={`flex ${
                affirmation && !isLoading
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Securely"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
