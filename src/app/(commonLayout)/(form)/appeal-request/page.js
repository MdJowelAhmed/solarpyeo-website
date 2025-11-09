"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertTriangle, X, Loader2 } from "lucide-react";
// import { useCreateAppealFormMutation } from "@/redux/api/appealFormApi";
import { toast } from "sonner"; // or your toast library
import { useCreateAppealFormMutation } from "@/redux/featured/appealForm/appealFormApi";

const AppealRequestForm = () => {
  const [selectedGrounds, setSelectedGrounds] = useState([]);
  const [reviewOption, setReviewOption] = useState("");

  const [justification, setJustification] = useState("");
  const [appealBasis, setAppealBasis] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");

  const [createAppealForm, { isLoading }] = useCreateAppealFormMutation();

  // Add two different states at the top
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);

  // Separate handlers
  const handleFileUpload1 = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (files1.length + uploadedFiles.length > 15) {
      toast.error("Maximum 15 files allowed for first upload");
      return;
    }
    const oversizedFiles = uploadedFiles.filter((file) => file.size > 33554432);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed 32MB limit");
      return;
    }
    setFiles1([...files1, ...uploadedFiles]);
  };

  const handleFileUpload2 = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (files2.length + uploadedFiles.length > 15) {
      toast.error("Maximum 15 files allowed for second upload");
      return;
    }
    const oversizedFiles = uploadedFiles.filter((file) => file.size > 33554432);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed 32MB limit");
      return;
    }
    setFiles2([...files2, ...uploadedFiles]);
  };

  // Separate remove functions
  const removeFile1 = (index) =>
    setFiles1(files1.filter((_, i) => i !== index));
  const removeFile2 = (index) =>
    setFiles2(files2.filter((_, i) => i !== index));

  const handleGroundChange = (ground, checked) => {
    if (checked) {
      setSelectedGrounds([...selectedGrounds, ground]);
    } else {
      setSelectedGrounds(selectedGrounds.filter((g) => g !== ground));
    }
  };

  // const handleFileUpload = (event) => {
  //   const uploadedFiles = Array.from(event.target.files);

  //   // Validate file count
  //   if (files.length + uploadedFiles.length > 15) {
  //     toast.error("Maximum 15 files allowed");
  //     return;
  //   }

  //   // Validate file size (32MB = 33554432 bytes)
  //   const oversizedFiles = uploadedFiles.filter((file) => file.size > 33554432);
  //   if (oversizedFiles.length > 0) {
  //     toast.error("Some files exceed 32MB limit");
  //     return;
  //   }

  //   setFiles([...files, ...uploadedFiles]);
  // };

  // const removeFile = (index) => {
  //   setFiles(files.filter((_, i) => i !== index));
  // };

  const validateForm = () => {
    if (selectedGrounds.length === 0) {
      toast.error("Please select at least one appeal ground");
      return false;
    }

    if (!appealBasis.trim()) {
      toast.error("Please describe the basis for your appeal");
      return false;
    }

    if (!justification.trim()) {
      toast.error("Please provide written justification");
      return false;
    }

    if (!reviewOption) {
      toast.error("Please select a review option");
      return false;
    }

    if (!digitalSignature.trim()) {
      toast.error("Please provide your digital signature");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Create FormData object
      const formData = new FormData();

      // Append text fields
      formData.append("appealGrounds", JSON.stringify(selectedGrounds));
      formData.append("justification", justification);
      formData.append("reviewOption", reviewOption);
      formData.append("declarationAndSubmission", appealBasis);

      // Append files
     files1.forEach((file) => formData.append("supportingDocumentGroup1", file));
files2.forEach((file) => formData.append("supportingDocumentGroup2", file));


      // Submit form
      const response = await createAppealForm(formData).unwrap();

      toast.success("Appeal submitted successfully!");

      // Reset form
      setSelectedGrounds([]);
      setReviewOption("");
      setFiles1([]);
      setFiles2([]);
      setJustification("");
      setAppealBasis("");
      setDigitalSignature("");
    } catch (error) {
      console.error("Error submitting appeal:", error);
      toast.error(
        error?.data?.message || "Failed to submit appeal. Please try again."
      );
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="bg-secondary-foreground custom-padding py-12 md:py-16 lg:py-24  ">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-center">
              📄 Appeal Request Form
            </h2>
            <div className="space-y-1 text-center mt-6">
              <div>
                <span className="font-medium">Platform Case Reference ID:</span>{" "}
                [Case-ID-Here]
              </div>
              <div>
                <span className="font-medium">Case Outcome Appealed:</span>{" "}
                [A-las-2025-4-docs]
              </div>
              <div>
                <span className="font-medium">Filed By:</span> [Your-Name-Here]
              </div>
            </div>
          </div>

          {/* Section 1: Appeal Grounds */}
          <div className=" p-4 md:p-6 lg:p-8 xl:p-12  mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <CardHeader className="pb-4 w-full lg:w-1/5">
                <CardTitle className="">🔍 SECTION 1: Appeal Grounds</CardTitle>
                <p className="text- mb-6 text-justify">
                  Select <strong>at least one qualifying</strong> reason for
                  requesting an appeal. Each option must be supported by
                  explanation or documentation.
                </p>
              </CardHeader>

              <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="new-evidence"
                      onCheckedChange={(checked) =>
                        handleGroundChange("new-evidence", checked)
                      }
                    />
                    <Label
                      htmlFor="new-evidence"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      New Evidence Not Previously Available: Attach any new
                      documents, testimony, or digital records that post-dated
                      original case.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="procedural-error"
                      onCheckedChange={(checked) =>
                        handleGroundChange("procedural-error", checked)
                      }
                    />
                    <Label
                      htmlFor="procedural-error"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      Procedural Error: Explain any violations of platform
                      process, such as improper issue adherence or inequitable
                      actions.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="bias-misconduct"
                      onCheckedChange={(checked) =>
                        handleGroundChange("bias-misconduct", checked)
                      }
                    />
                    <Label
                      htmlFor="bias-misconduct"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      Bias/ Misconduct or Skil Detect the administrators with
                      fairness; conflict of interests; or rules violated by
                      peers.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="incorrect-identification"
                      onCheckedChange={(checked) =>
                        handleGroundChange("incorrect-identification", checked)
                      }
                    />
                    <Label
                      htmlFor="incorrect-identification"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      Incorrect Identification / Mistaken Target: Detect the
                      flaws your identity or record was falsely linked.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="legal-regulation"
                      onCheckedChange={(checked) =>
                        handleGroundChange("legal-regulation", checked)
                      }
                    />
                    <Label
                      htmlFor="legal-regulation"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      Legal Regulation Overlooking Platform Verdict: Attach
                      proof of formal court resolution conflicting with platform
                      records.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="other"
                      onCheckedChange={(checked) =>
                        handleGroundChange("other", checked)
                      }
                    />
                    <Label
                      htmlFor="other"
                      className="text-sm text-gray-700 leading-relaxed"
                    >
                      Other: (Explain Below)
                    </Label>
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Clearly describe the basis for this appeal. *
                  </Label>
                  <Textarea
                    id="appeal-basis"
                    value={appealBasis}
                    onChange={(e) => setAppealBasis(e.target.value)}
                    className="mt-2 h-40 p-2 border border-gray-300 rounded-md w-full"
                    rows={8}
                    placeholder="Describe the basis for this appeal..."
                  />
                </div>
              </CardContent>
            </div>
          </div>
        </div>

        {/* Section 2: Supporting Materials */}
        <div className="bg-secondary custom-padding ">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardContent className="w-full lg:w-1/5">
              <div className="">
                <CardTitle className="mb-6">
                  📎 SECTION 2: Supporting Materials
                </CardTitle>
              </div>
            </CardContent>

            <div className="space-y-4 w-full lg:w-4/5  lg:border-l-4 h-full lg:pl-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  md:gap-x-8 lg:gap-x-12">
                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload File
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      onChange={handleFileUpload1}
                      multiple
                      accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    />
                    {files1.map((file, index) => (
                      <div key={index}>
                        {file.name}
                        <button onClick={() => removeFile1(index)}>❌</button>
                      </div>
                    ))}
                  </div>

                  {/* Display uploaded files */}
                  {files1.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Uploaded Files ({files1.length}/15):
                      </p>
                      {files1.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              {file.name} (
                              {(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload File
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      onChange={handleFileUpload2}
                      multiple
                      accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    />
                    {files2.map((file, index) => (
                      <div key={index}>
                        {file.name}
                        <button onClick={() => removeFile2(index)}>❌</button>
                      </div>
                    ))}
                  </div>

                  {/* Display uploaded files */}
                  {files2.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Uploaded Files ({files2.length}/15):
                      </p>
                      {files2.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              {file.name} (
                              {(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">
                Upload supporting documents or media{" "}
                <span className="font-medium">
                  (Max 15 files, PDF, JPEG, JPG, HEIC, PNG, DOCX, MP4):
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Maximum file size limit: 32MB
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Written Justification */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">SECTION 3: Written Justification</CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5   lg:border-l-4 h-full lg:pl-10">
              <p className="text-sm text-gray-700 mb-4">
                Provide a detailed written argument explaining why this appeal
                should be granted. Be specific and cite dates, documents, or
                process points as necessary. *
              </p>

              <Textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Write your justification here..."
                className="min-h-[150px] w-full"
              />
            </CardContent>
          </div>
        </div>

        {/* Section 4: Review Option */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="">
              <h3 className="mb-6">🧠 SECTION 4: Review Option</h3>
            </CardHeader>
            <CardContent>
              <Label className="mb-5">
                Please select the appropriate option. *
              </Label>

              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="expedited"
                    name="review-option"
                    value="expedited"
                    checked={reviewOption === "expedited"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="expedited" className="text-sm text-gray-700">
                    Expedited (Advanced) max 3 business days
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="regular"
                    name="review-option"
                    value="regular"
                    checked={reviewOption === "regular"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="regular" className="text-sm text-gray-700">
                    Regular (economy) estimate 14 calendar days (approximately
                    10 business days)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="default"
                    name="review-option"
                    value="default"
                    checked={reviewOption === "default"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="default" className="text-sm text-gray-700">
                    Default (standard)
                  </Label>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 5: Declaration & Submission */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="">
              <h3 className="mb-6">SECTION 5: Declaration & Submission</h3>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="font-bold mb-3">
                  Declaration Under Penalty of Perjury:
                </Label>
                <p className="mb-6 text-sm">
                  I declare and affirm in accordance with the laws of the
                  jurisdiction(s) involved, UNDER PENALTY OF PERJURY, that the
                  information in this Appeal Request Form is true and accurate
                  to the best of my knowledge. I understand that knowingly
                  submitting false information may result in permanent
                  suspension of platform access and legal consequences.
                </p>
              </div>

              <div className="mb-4">
                <Label
                  htmlFor="digital-signature"
                  className="text-sm font-medium text-gray-700"
                >
                  Digital Signature (Your full legal name): *
                </Label>
                <Input
                  id="digital-signature"
                  type="text"
                  value={digitalSignature}
                  onChange={(e) => setDigitalSignature(e.target.value)}
                  placeholder="Enter your full legal name"
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700">
                  Appeal Fee: $30.00
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* Important Notice */}
              <div className="bg-primary-foreground border-l-4 border-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-2">
                      Important Notice:
                    </p>
                    <ul className="text-red-700 space-y-1 text-xs">
                      <li>
                        • Appeal Limited received all appeal/s is been filled to
                        be sure No choice for a cause. You may not receive a
                        detailed Fair access to represent per that petition.
                      </li>
                      <li>
                        • As an important filing time{" "}
                        <strong>within 30 days</strong> if the initial decision
                        date.
                      </li>
                      <li>• Case filing to business days.</li>
                      <li>
                        • If the document are received through online provide
                        much above - <strong>Submit Appeal</strong> and
                        timeqaery by business.
                      </li>
                      <li>
                        • Only in a Statement is a judicial Notice, the office
                        is a Direct to Order will remain filing a request to the
                        Criminal panel.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className=""
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Pay & Submit Appeal"
                  )}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppealRequestForm;
