"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertTriangle } from "lucide-react";

const AppealRequestForm = () => {
  const [selectedGrounds, setSelectedGrounds] = useState([]);
  const [reviewOption, setReviewOption] = useState("");
  const [files, setFiles] = useState([]);
  const [justification, setJustification] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleGroundChange = (ground, checked) => {
    if (checked) {
      setSelectedGrounds([...selectedGrounds, ground]);
    } else {
      setSelectedGrounds(selectedGrounds.filter((g) => g !== ground));
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            {/* <FileText className="w-6 h-6 text-gray-600" /> */}
            <h2 className="text-2xl lg:text-4xl font-bold text-center">
              📄 Appeal Request Form
            </h2>
            <div className="space-y-4  ">
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
        </div>

        {/* Section 1: Appeal Grounds */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <h3 className="">
                {/* <span className="text-red-500">📋</span> */}
                🔍 SECTION 1: Appeal Grounds
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-  mb-6">
                Select <strong>at least one qualifying</strong> reason for
                requesting an appeal. Each option must be supported by
                explanation or documentation.
              </p>

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
                    fairness; conflict of interests; or rules violated by peers.
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
                    Incorrect Identification / Mistaken Target: Detect the flaws
                    your identity or record was falsely linked.
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
                    Legal Regulation Overlooking Platform Verdict: Attach proof
                    of formal court resolution conflicting with platform
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
                  Clearly describe the basis for this appeal.
                </Label>
                <Textarea
                  id="appeal-basis"
                  className="mt-2 h-40 p-2 border border-gray-300 rounded-md w-full"
                  rows={8}
                  placeholder="Describe the basis for this appeal..."
                />
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 2: Supporting Materials */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardContent className="">
              <div className="">
                {/* <Upload className="w-5 h-5 text-red-600" /> */}
                <h3 className="mb-6">📎 SECTION 2: Supporting Materials</h3>
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

              <div className="space-y-2">
                <Label
                  htmlFor="file-upload"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload File *
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    className="w-1/5 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    multiple
                  />
                  {!uploadedFile && (
                    <span className="text-sm text-gray-500">
                      No file chosen
                    </span>
                  )}
                </div>
                {uploadedFile && (
                  <p className="text-sm text-green-600">
                    Uploaded: {uploadedFile}
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Written Justification */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <h3 className="">
                {/* <span className="text-red-500">✍️</span> */}
                SECTION 3: Written Justification
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Provide a detailed written argument explaining why this appeal
                should be granted. Be specific and cite dates, documents, or
                process points as necessary.
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
              <h3 className="mb-6">
                {/* <span className="text-red-500">💭</span> */}
                🧠 SECTION 4: Review Option
              </h3>
            </CardHeader>
            <CardContent>
              <Label className="mb-5">
                Please select the appropriate option.
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
              <h3 className="mb-6">
                {/* <span className="text-red-500">⚠️</span> */}
                SECTION 5: Declaration & Submission
              </h3>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className=" font-bold  mb-3">
                  Declaration Under Penalty of Perjury:
                </Label>
                <p className="mb-6 text-sm ">
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
                  Digital Signature (Your full legal name):
                </Label>
                <Input
                  id="digital-signature"
                  type="text"
                  placeholder="Enter your full legal name"
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700">
                  Appeal Fee: $30.00
                </Label>
                <p className="text-xs text-gray-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
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
                  className=""
                  size="lg"
                >
                  Pay & Submit Appeal
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
