"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertTriangle, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateAppealFormMutation } from "@/redux/featured/appealForm/appealFormApi";

const AppealRequestForm = () => {
  const [selectedGrounds, setSelectedGrounds] = useState([]);
  const [reviewOption, setReviewOption] = useState("");
  const [justification, setJustification] = useState("");
  const [appealBasis, setAppealBasis] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");

  const [createAppealForm, { isLoading }] = useCreateAppealFormMutation();

  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);

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
      const formData = new FormData();

      // Log what we're sending
      console.log("=== FORM SUBMISSION DEBUG ===");
      console.log("Selected Grounds:", selectedGrounds);
      console.log("Review Option:", reviewOption);
      console.log("Appeal Basis:", appealBasis);
      console.log("Justification:", justification);
      console.log("Digital Signature:", digitalSignature);
      console.log("Files Group 1 count:", files1.length);
      console.log("Files Group 2 count:", files2.length);

      formData.append("appealGrounds", JSON.stringify(selectedGrounds));
      formData.append("justification", justification);
      formData.append("reviewOption", reviewOption);
      formData.append("declarationAndSubmission", appealBasis);
      formData.append("digitalSignature", digitalSignature);

      // Log file field names
      console.log("Appending all files to field: supportingDocuments");
      files1.forEach((file, index) => {
        console.log(`  Group 1 File ${index + 1}:`, file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        formData.append("supportingDocuments", file);
      });

      files2.forEach((file, index) => {
        console.log(`  Group 2 File ${index + 1}:`, file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);
        formData.append("supportingDocuments", file);
      });

      // Log all FormData entries
      console.log("\n=== FormData Contents ===");
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0], ':', 'FILE -', pair[1].name);
        } else {
          console.log(pair[0], ':', pair[1]);
        }
      }
      console.log("========================\n");

      console.log("Sending request to API...");
      const response = await createAppealForm(formData).unwrap();
      console.log("✅ Success! Response:", response);

      toast.success("Appeal submitted successfully!");

      setSelectedGrounds([]);
      setReviewOption("");
      setFiles1([]);
      setFiles2([]);
      setJustification("");
      setAppealBasis("");
      setDigitalSignature("");
    } catch (error) {
      console.error("❌ ERROR submitting appeal:", error);
      console.error("Error details:", {
        message: error?.data?.message,
        status: error?.status,
        data: error?.data,
        fullError: error
      });
      
      toast.error(
        error?.data?.message || "Failed to submit appeal. Please try again."
      );
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="bg-secondary-foreground custom-padding py-12 md:py-16 lg:py-24">
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
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
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
        <div className="bg-secondary custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardContent className="w-full lg:w-1/5">
              <div className="">
                <CardTitle className="mb-6">
                  📎 SECTION 2: Supporting Materials
                </CardTitle>
              </div>
            </CardContent>

            <div className="space-y-4 w-full lg:w-4/5 lg:border-l-4 h-full lg:pl-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12">
                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload-1"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload File Group 1
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="file-upload-1"
                      type="file"
                      onChange={handleFileUpload1}
                      multiple
                      accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    />
                  </div>

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
                            onClick={() => removeFile1(index)}
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
                    htmlFor="file-upload-2"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upload File Group 2
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="file-upload-2"
                      type="file"
                      onChange={handleFileUpload2}
                      multiple
                      accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    />
                  </div>

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
                            onClick={() => removeFile2(index)}
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
                  (Max 15 files per group, PDF, JPEG, JPG, HEIC, PNG, DOCX, MP4):
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
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 h-full lg:pl-10">
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
        <div className="bg-secondary py-12 custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">SECTION 4: Review Option</CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 h-full lg:pl-10">
              <Label className="mb-5">
                Please select the appropriate option. *
              </Label>

              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="NewJurorPanel"
                    name="review-option"
                    value="NewJurorPanel"
                    checked={reviewOption === "NewJurorPanel"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="NewJurorPanel" className="text-sm text-gray-700">
                   New juror panel (default post Jury Verdict)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="ModeratorOnlyReview"
                    name="review-option"
                    value="ModeratorOnlyReview"
                    checked={reviewOption === "ModeratorOnlyReview"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="ModeratorOnlyReview" className="text-sm text-gray-700">
                    Moderator-only review (applicable for other reasons selected in Section 1)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="PlatformAppealsBoard"
                    name="review-option"
                    value="PlatformAppealsBoard"
                    checked={reviewOption === "PlatformAppealsBoard"}
                    onChange={(e) => setReviewOption(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <Label htmlFor="PlatformAppealsBoard" className="text-sm text-gray-700">
                   Platform appeals board
                  </Label>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 5: Declaration & Submission */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">Declaration & Submission</CardTitle>
                      <p className="">
                  Declaration Under Penalty of Perjury:
                </p>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 h-full lg:pl-10">
              <div className="mb-4">
        
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

              {/* <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700">
                  Appeal Fee: $30.00
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div> */}

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