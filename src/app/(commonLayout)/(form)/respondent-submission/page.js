"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Upload,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";
// import { useCreateRespondentSubmissionMutation } from "@/redux/api/respondentSubmissionApi";
import { toast } from "sonner"; // or your toast library
import { useCreateRespondentSubmissionMutation } from "@/redux/featured/RespondentSubmission/RespondentSubmissionApi";
import { useSearchMySubmissionFormQuery } from "@/redux/featured/searchFiles/searchFilesApi";

export default function RespondentSubmissionForm() {
  const [selectedResponse, setSelectedResponse] = useState("deny");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [digitalSignature, setDigitalSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createRespondentSubmission, { isLoading }] =
    useCreateRespondentSubmissionMutation();

      const [selectedCaseId, setSelectedCaseId] = useState("");
  const { data: submissionFormResponse, isLoading: isDataLoading } =
    useSearchMySubmissionFormQuery();
    console.log(submissionFormResponse);

  const submissionData = submissionFormResponse?.data || [];

  // Get selected case data
  const selectedCase = submissionData.find(
    (item) => item.submissionId.caseId === selectedCaseId
  );

  const caseId = selectedCase?.submissionId?.caseId || "[Case-ID-Here]";
  const submissionId =
    selectedCase?.submissionId?._id || "[Submission-ID-Here]";

  const respondent = selectedCase
    ? `${selectedCase.user.firstName} ${selectedCase.user.middleName || ""} ${
        selectedCase.user.lastName
      }`.trim()
    : "[Your-Name-Here]";
  const email = selectedCase?.user?.email || "[Email-Here]";

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 15) {
      toast.error("Maximum 15 files allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      const maxSize = 32 * 1024 * 1024; // 32MB
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 32MB limit`);
        return false;
      }
      return true;
    });

    setUploadedFiles(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    // if (!digitalSignature.trim()) {
    //   toast.error("Please enter your digital signature");
    //   return;
    // }

    if (selectedResponse === "deny" && uploadedFiles.length === 0) {
      toast.error("Please upload evidence to support your response");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Add response declaration
      formData.append("responseDeclaration", selectedResponse);

      // Add evidence files
      uploadedFiles.forEach((file) => {
        formData.append("evidence", file);
      });

      // Add signature
      formData.append("signature", digitalSignature);

      // Add signature date (ISO format)
      const signatureDate = new Date().toISOString();
      formData.append("signatureDate", signatureDate);

      // Add IP address (in real scenario, backend should handle this)
      // For now, adding a placeholder
      formData.append("ipAddress", "10.10.7.4");

      // Submit to backend
      const result = await createRespondentSubmission(formData).unwrap();

      toast.success("Response submitted successfully!");

      // Reset form
      setSelectedResponse("deny");
      setUploadedFiles([]);
      setDigitalSignature("");

      // Optional: Redirect or perform other actions
      // router.push('/submission-confirmation');
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.message || "Failed to submit response. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles((files) =>
      files.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        {/* Form Header */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="mb-6">
            <h3 className="text-2xl lg:text-4xl font-semibold mb-6 text-center">
              📄 Respondent Submission Form
            </h3>
            <div className="space-y-2 text-sm max-w-xl mx-auto">
              <div>
                <span className="font-medium">Platform Case Reference ID:</span>{" "}
                [Auto-populated]
              </div>
              <div>
                <span className="font-medium">Respondent Legal Name:</span>{" "}
                [Auto-populated if matched to user account]
              </div>
            </div>
          </div>

          {/* Section 1: Response Declaration */}

          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <div className="mb-6">
                <CardTitle className="">RESPONSE DECLARATION</CardTitle>
              </div>
              <p className="text-justify">
                Please choose how you wish to respond to the allegation(s) in
                question:
              </p>
            </CardHeader>

            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <RadioGroup
                value={selectedResponse}
                onValueChange={setSelectedResponse}
                className="space-y-5"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="deny" id="deny" />
                  <p htmlFor="deny" className="">
                    I <span className="font-medium">deny</span> the
                    allegation(s) and will provide rebuttal evidence.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially" id="partially" />
                  <p htmlFor="partially" className="text-sm text-gray-700">
                    I <span className="font-medium">partially agree</span> the
                    allegations and will provide clarifying context.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id="agree" />
                  <p htmlFor="agree" className="text-sm text-gray-700">
                    I <span className="font-medium">agree with</span> the
                    allegation(s) as presented.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mistaken" id="mistaken" />
                  <p htmlFor="mistaken" className="text-sm text-gray-700">
                    I believe I have been{" "}
                    <span className="font-medium">mistakenly identified</span>{" "}
                    and am not the intended respondent.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-respond" id="not-respond" />
                  <p htmlFor="not-respond" className="text-sm text-gray-700">
                    I will <span className="font-medium">not respond</span>, but
                    understand that silence may be considered during juror
                    evaluation.
                  </p>
                </div>
              </RadioGroup>
            </CardContent>
          </div>
        </div>

        {/* Section 2: Evidence Submission */}
        <div className="bg-secondary custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <div className="">
                <CardTitle className="mb-6">EVIDENCE SUBMISSION</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
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
                    className="w-full lg:w-1/2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    accept=".pdf,.jpeg,.jpg,.heic,.png,.docx,.mp4"
                    multiple
                  />
                  {uploadedFiles.length === 0 && (
                    <span className="text-sm text-gray-500">
                      No file chosen
                    </span>
                  )}
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Uploaded Files: ({uploadedFiles.length}/15)
                    </p>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 p-2 rounded"
                      >
                        <span className="text-sm text-green-700">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-black mb-2">
                Upload supporting documents or media{" "}
                <span className="">
                  (Max 15 files, PDF, JPEG, JPG, HEIC, PNG, DOCX, MP4):
                </span>
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Maximum file size limit: 32MB
              </p>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Notice Confirmation */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardContent className="">
              <div className="mb-4">
                <CardTitle className="text-center">
                  {" "}
                  NOTICE CONFIRMATION
                </CardTitle>
              </div>

              <h4 className="mb-6 text-center">
                Through this submission, I acknowledge I have received full
                digital notice of the allegation, and understand my rights to
                respond or remain silent.
              </h4>
            </CardContent>
          </div>
        </div>

        {/* Section 4: Declaration Under Penalty of Perjury */}
        {/* <div className="bg-secondary custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5 ">
              <div className="mb-8 space-y-3">
                <CardTitle className="">
                  DECLARATION UNDER PENALTY OF PERJURY
                </CardTitle>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-7 h-7" />
                  <span>
                    IP Address and Timestamp: [auto-captured by platform]
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <div className="space-y-5">
                <p className="text-justify ">
                  I hereby declare and affirm in accordance with the laws of the
                  jurisdiction(s) involved, UNDER PENALTY OF PERJURY, that the
                  foregoing is true and accurate to the best of my knowledge.
                </p>

                <div>
                  <Label
                    htmlFor="digital-signature"
                    className="text-sm font-medium text-gray-700"
                  >
                    Digital Signature (type full legal name) *
                  </Label>
                  <Input
                    id="digital-signature"
                    type="text"
                    value={digitalSignature}
                    onChange={(e) => setDigitalSignature(e.target.value)}
                    placeholder="Enter your legal full name"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </div> */}

        <div className="custom-padding">
          {/* Warning Notice */}
          <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">
                Once submitted, your response will be locked and reviewed by the
                assigned juror panel. You may not edit it afterward. If you
                choose not to make a response and receive an unfavourable
                outcome, you will have to file an appeal with applicable fees to
                do so.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="py-6"
              size="lg"
              disabled={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? "Submitting..." : "Submit Response"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
