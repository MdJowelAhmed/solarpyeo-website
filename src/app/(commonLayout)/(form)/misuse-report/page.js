"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle } from "lucide-react";
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

  // Supporting Evidence - UPDATED: Single array for multiple files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [supportingLink, setSupportingLink] = useState("");

  // Resolution Requested
  const [resolutionRequested, setResolutionRequested] = useState([]);

  // Affirmation & Signature
  const [affirmation, setAffirmation] = useState(false);
  const [signature, setSignature] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();

  // RTK Query mutation
  const [createMisuseForm, { isLoading }] = useCreateMisuseFormMutation();

  // UPDATED: Handle multiple file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  // UPDATED: Remove individual file
  const removeFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
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

      // UPDATED: Supporting Documents - append all files
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("supportingDocument", file);
        });
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
      setSelectedFiles([]); // UPDATED
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
   
        {/* Title Section */}
        <div className="bg-secondary-foreground custom-padding ">
        
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl lg:text-4xl font-bold text-center">
                  Misuse Report Form
                </h2>
                
              </div>
              <p className="text-gray-600 text-sm leading-relaxed text-justify max-w-2xl mx-auto mt-3">
                Use this form to report any misuse of power, fraud, waste, abuse
                of authority, or any violation of law or policy. Your report
                will be treated confidentially to the extent permitted by law.
              </p>
            </div>

            
            <div className="">
              <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
                <CardHeader className="pb-4 w-full lg:w-1/5">
                  <CardTitle>Reporter Information</CardTitle>
                  <p className="text-sm text-gray-600 mt-1 ">
                    Please provide your contact information. Anonymous reporting
                    is allowed.
                  </p>

                  <div>
                    <p className="text-sm font-medium mb-2 text-justify mt-4">
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
                        <p htmlFor="yes">Yes</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <p htmlFor="no">No</p>
                      </div>
                    </RadioGroup>
                  </div>
                </CardHeader>

                <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p htmlFor="fullName">Full Name *</p>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <p htmlFor="username">Username (if applicable)</p>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                      <div>
                      <p htmlFor="email">Email Address *</p>
                      <Input
                        id="email"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                  </div>

               

                  <div className="flex items-center  space-x-2 mt-6">
                    <Checkbox
                      id="anonymous"
                      checked={anonymousPreferred}
                      onCheckedChange={setAnonymousPreferred}
                    />
                    <p htmlFor="anonymous">
                      Prefer to remain anonymous
                    </p>
                  </div>
                </CardContent>
              </div>
            </div>
       
        </div>

        {/* Section 2: Nature of Misuse */}
        <div className="custom-padding bg-secondary">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="text-red-700">
                Nature Of The Reported Misuse
              </CardTitle>
              <h4 className="text-center mb-6">(Select all that apply)</h4>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
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
                    <p htmlFor={`misuse-${index}`} className="text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Subject of Complaint */}
        <div className="custom-padding bg-secondary-foreground">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="text-red-700">Subject of The Complaint</CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10 space-y-4">
              <div>
                <p>
                  Name of the Person Being or Mayor Employer (if known): *
                </p>
                <Input
                  value={complaintSubject}
                  onChange={(e) => setComplaintSubject(e.target.value)}
                />
              </div>

              <div>
                <p>Email of the person (if known):</p>
                <Input
                  type="email"
                  value={subjectEmail}
                  onChange={(e) => setSubjectEmail(e.target.value)}
                />
              </div>

              <div>
                <p>What was alleged official or employee:</p>
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
                      <p htmlFor={`official-${index}`} className="text-sm">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 4: Incident Details */}
        <div className="custom-padding bg-secondary">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="text-red-700">Incident Details</CardTitle>
                   <p className="text-justify">
                Please describe the event(s), behavior(s), and any associated
                case(s). Include dates, communication, or submissions if known.
              </p>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
         

              <div>
                <p>Description of Incident(s): *</p>
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
        <div className="custom-padding bg-secondary-foreground">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle>Supporting Evidence</CardTitle>
              <p className="text-justify">
                Attach any documents you cite and the documents that you can
                provide to support maintaining an administrative filing etc.
              </p>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">

              <div className="mb-6">
                <p className="block text-gray-700 font-medium mb-3">
                  Upload Files (Multiple images allowed):
                </p>
                <div className="relative">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <span className="text-gray-700">
                      {selectedFiles.length > 0 
                        ? `${selectedFiles.length} file(s) selected` 
                        : "Choose File"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {selectedFiles.length === 0 ? "No file chosen" : ""}
                    </span>
                  </label>
                </div>

                {/* Display selected files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 text-sm"
                      >
                        <span className="text-gray-700 truncate flex-1">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-8">
                <p className="block text-gray-700 font-medium mb-3">
                  Optional Link (e.g., Case ID or Submission URL):
                </p>
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
        <div className="custom-padding bg-secondary">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle>Resolution Requested</CardTitle>
                <p className="mb-6 text-justify">
                Check the outcome that you believe would correct or redress the
                violation:
              </p>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            

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
                    <p htmlFor={`resolution-${index}`} className="text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 7: Affirmation & Signature */}
    
          <div className="custom-padding bg-secondary">
           
            <CardContent className="">
              <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-md">
                
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

              <div className="flex items-start space-x-2 mt-6">
                <Checkbox
                  id="affirmation"
                  checked={affirmation}
                  onCheckedChange={setAffirmation}
                />
                <p htmlFor="affirmation" className="text-sm">
                  I affirm and attest to the absolute statement. *
                </p>
              </div>
            </CardContent>
          </div>
     

        {/* Submit Section */}
        <div className="container mx-auto">
          <p className="mb-4">
            Upon submission, you will receive a confirmation receipt and
            tracking number. A member of the Platform`s{" "}
            <strong>Compliance & Integrity Division</strong> will review your
            report within <strong>5-10 business days</strong>. You may be
            contacted for clarification or further evidence if needed.
          </p>

          <div className="flex w-full items-center mb-10 justify-end">
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
  );
}