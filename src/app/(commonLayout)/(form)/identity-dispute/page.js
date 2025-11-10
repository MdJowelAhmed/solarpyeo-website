"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, FileText, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function IdentityDisputeForm() {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");

  const disputeReasons = [
    "I am not the individual referenced in this case/allegation.",
    "Someone used my name or likeness without authorization.",
    "My account has been confused with another user.",
    "I was incorrectly linked due to a technical error or similarity in name/data.",
    "Other (please describe):",
  ];

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

          <div className="grid grid-cols-1 gap-4">
            <div>
              <strong>Platform Case Reference ID:</strong> [Auto-populated]
            </div>
            <div>
              <strong>Linked Record or Profile ID:</strong> [Auto-populated]
            </div>
            <div>
              <strong>Your Full Legal Name:</strong> [Auto-populated]
            </div>
            <div>
              <strong>Your Verified Platform Account Email:</strong>{" "}
              [Auto-populated]
            </div>
          </div>
        </div>

        {/* Section 1: Type of Identity Dispute */}
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">TYPE OF IDENTITY DISPUTE</CardTitle>
            <p className="text-justify">
              Please select the reason for your dispute:
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="space-y-4">
              {disputeReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Checkbox
                    id={`reason-${index}`}
                    checked={selectedReason === reason}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedReason(reason);
                      } else {
                        setSelectedReason("");
                      }
                    }}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`reason-${index}`}
                    className=" cursor-pointer flex-1"
                  >
                    {reason}
                  </label>
                </div>
              ))}
            </div>
            <Textarea
              placeholder="Describe other reason here..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="min-h-[150px] text-sm"
            />

            {selectedReason === "Other (please describe):" && (
              <div className="mt-4">
                <Textarea
                  placeholder="Describe other reason here..."
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="min-h-[100px] text-sm"
                />
              </div>
            )}
          </CardContent>
        </div>
      </div>

      {/* Section 2: Declaration */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <div className="">
              <h3 className="">SECTION 2: DECLARATION</h3>
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
                Digital Signature (type full legal name)
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
                <span>Date: [Auto-filled]</span>
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
      </div>

      {/* What Happens Next */}
      <div className="bg-secondary-foreground custom-padding">
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
          // disabled={!selectedReason || !digitalSignature}
        >
          Submit Claim For Review
        </Button>
      </div>
      </div>

   
    </div>
  );
}
