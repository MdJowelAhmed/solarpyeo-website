"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Upload,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react";

export default function GlassFileForm() {
  const [selectedResponse, setSelectedResponse] = useState("deny");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [digitalSignature, setDigitalSignature] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Form Header */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h2 className="text-2xl lg:text-4xl font-semibold mb-6 text-center">
              📄 Respondent Submission Form
            </h2>
            <div className="space-y-2 text-sm ">
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
        </div>

        {/* Section 1: Response Declaration */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardContent className="">
              <div className="mb-6">
                <h3 className="">📑 SECTION 1: RESPONSE DECLARATION</h3>
              </div>

              <Label className="mb-5">
                Please choose how you wish to respond to the allegation(s) in
                question:
              </Label>

              <RadioGroup
                value={selectedResponse}
                onValueChange={setSelectedResponse}
                className="space-y-5"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="deny" id="deny" />
                  <Label htmlFor="deny" className="">
                    I <span className="font-medium">deny</span> the
                    allegation(s) and will provide rebuttal evidence.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partially" id="partially" />
                  <Label htmlFor="partially" className="text-sm text-gray-700">
                    I <span className="font-medium">partially agree</span> the
                    allegations and will provide clarifying context.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agree" id="agree" />
                  <Label htmlFor="agree" className="text-sm text-gray-700">
                    I <span className="font-medium">agree with</span> the
                    allegation(s) as presented.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mistaken" id="mistaken" />
                  <Label htmlFor="mistaken" className="text-sm text-gray-700">
                    I believe I have been{" "}
                    <span className="font-medium">mistakenly identified</span>{" "}
                    and am not the intended respondent.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-respond" id="not-respond" />
                  <Label
                    htmlFor="not-respond"
                    className="text-sm text-gray-700"
                  >
                    I will <span className="font-medium">not respond</span>, but
                    understand that silence may be considered during juror
                    evaluation.
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </div>
        </div>

        {/* Section 2: Evidence Submission */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardContent className="">
              <div className="">
                {/* <Upload className="w-5 h-5 text-red-600" /> */}
                <h3 className="mb-6">📎 SECTION 2: EVIDENCE SUBMISSION</h3>
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

        {/* Section 3: Notice Confirmation */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <div className="">
              <CardContent className="">
                <div className="mb-4">
                  <h3 className="">📬 SECTION 3: NOTICE CONFIRMATION</h3>
                </div>

                <h4 className="mb-6 text-center">
                  Through this submission, I acknowledge I have received full
                  digital notice of the allegation, and understand my rights to
                  respond or remain silent.
                </h4>
              </CardContent>
            </div>
          </div>
        </div>

        {/* Section 4: Declaration Under Penalty of Perjury */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardContent className="p-6">
              <div className="mb-8">
                <h3 className="">
                  🧾 SECTION 4: DECLARATION UNDER PENALTY OF PERJURY
                </h3>
              </div>

              <p className="text-center mb-4">
                I hereby declare and affirm in accordance with the laws of the
                jurisdiction(s) involved, UNDER PENALTY OF PERJURY, that the
                foregoing is true and accurate to the best of my knowledge.
              </p>

              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="digital-signature"
                    className="text-sm font-medium text-gray-700"
                  >
                    Digital Signature (type full legal name)
                  </Label>
                  <Input
                    id="digital-signature"
                    type="text"
                    value={digitalSignature}
                    onChange={(e) => setDigitalSignature(e.target.value)}
                    placeholder="Enter your legal full name"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Date: [Auto-filled]</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    IP Address and Timestamp: [auto-captured by platform]
                  </span>
                </div>
                {/* Warning Notice */}
                <div className="bg-secondary-foreground border-l-4 border-red-700 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">
                      Once submitted, your response will be locked and reviewed
                      by the assigned juror panel. You may not edit it
                      afterward. If you choose not to make a response and
                      receive an unfavourable outcome, you will have to file an
                      appeal with applicable fees to do so.
                    </p>
                  </div>
                </div>
                  {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 font-medium"
            size="lg"
          >
            Submit Response
          </Button>
        </div>
              </div>
            </CardContent>
          </div>
        </div>

     
      </div>
    </div>
  );
}
