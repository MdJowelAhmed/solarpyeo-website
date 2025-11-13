"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, FileText, Users, Shield, Settings } from "lucide-react";

const JurorApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "Auto-filled",
    username: "Auto-filled",
    dateOfBirth: "Auto-filled",
    email: "Auto-filled",
    showCurrentAddress: "no",
    eligibilityChecks: [],
    digitalSignature: "",
    date: "Auto-filled",
    platformConsent: [],
  });

  const handleCheckboxChange = (section, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: checked
        ? [...prev[section], value]
        : prev[section].filter((item) => item !== value),
    }));
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="">
        {/* Title Section */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <div className="">
              <h2 className="text-2xl text-center lg:text-4xl font-bold mb-7">
                📝 Application and Affidavit for Enrollment in Juror Program
              </h2>
            </div>
            <p className="text-sm mb-8">
              <strong>Platform Name</strong>: Glass File
            </p>

            {/* Warning Alert */}
            <div className="bg-primary-foreground border-l-4 border-red-700 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="text-sm text-red-700">
                  It is a crime to submit as a Juror on this platform if you do
                  not meet all eligibility criteria above or if there is
                  information (public or otherwise) that is not required. A
                  valid juror ID is the only requirement however that must be
                  verified and acknowledged by the platform. The most current
                  version and revision of the Juror Protocol is required for
                  Jurror applications and approvals.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Applicant Information */}
        <div className="bg-secondary custom-padding">
          <div className=" p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className=""> APPLICANT INFORMATION</CardTitle>
            </CardHeader>
            <CardContent className=" w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Legal Name: (Auto-filled)
                  </Label>
                  {/* <Input
                    id="fullName"
                    value={formData.fullName}
                    className="mt-1"
                    disabled
                  /> */}
                </div>
                <div>
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username: (Auto-filled)
                  </Label>
                  {/* <Input
                    id="username"
                    value={formData.username}
                    className="mt-1"
                    disabled
                  /> */}
                </div>
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date of Birth: (Auto-filled)
                  </Label>
                  {/* <Input
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    className="mt-1"
                    disabled
                  /> */}
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address: (Auto-filled)
                  </Label>
                  {/* <Input
                    id="email"
                    value={formData.email}
                    className="mt-1"
                    disabled
                  /> */}
                </div>
              </div>

              <div className="mt-6">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Does your ID show your current address?
                </Label>
                <RadioGroup
                  value={formData.showCurrentAddress}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      showCurrentAddress: value,
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="text-sm">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 2: Eligibility Attestation */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">ELIGIBILITY ATTESTATION</CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <p className="text-sm text-gray-700 mb-4">
                Please confirm each of the following:
              </p>
              <div className="space-y-5">
                {[
                  <>
                    I am at least <strong>21 years of age</strong>.
                  </>,
                  <>
                    I agree<strong> not to serve as a Juror</strong> on any case
                    involving myself, a spouse or former spouse, partner or
                    steppartner with whom I have a personal, familial, or
                    professional relationship.
                  </>,
                  <>
                    I have <strong>no criminal record</strong> involving
                    perjury, fraud of any kind, or violation of a court order
                    within the past 5 years.
                  </>,
                  <>
                    I am able to{" "}
                    <strong>
                      objectively review sensitive and emotional materials
                    </strong>
                    .
                  </>,
                  <>
                    I agree to maintain <strong>strict confidentiality</strong>{" "}
                    in all case reviews.
                  </>,
                  <>
                    I will <strong>serve impartially</strong>, based solely on
                    the evidence provided.
                  </>,
                  <>
                    I will not share my platform credentials or allow anyone
                    other than myself to operate using my unique{" "}
                    <strong>platform-based Juror ID</strong>.
                  </>,
                  <>
                    I understand completion of the{" "}
                    <strong>Juror Orientation and Ethics Test</strong> is
                    required.
                  </>,
                  <>
                    I understand I must submit a government-issued photo ID that
                    is <strong>not expired</strong>.
                  </>,
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Checkbox
                      id={`eligibility-${index}`}
                      checked={formData.eligibilityChecks.includes(index)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "eligibilityChecks",
                          index,
                          checked
                        )
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`eligibility-${index}`}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Affidavit */}
        <div className="bg-secondary custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">
                AFFIDAVIT OF GOOD FAITH & OATH OF IMPARTIALITY
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <div className="mb-6">
                <h2 className="font-bold text-gray-800 mb-3">
                  I, The Undersigned, Affirm Under Penalty Of Perjury:
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • That the information I have provided in this application
                    is true and complete to the best of my knowledge.
                  </li>
                  <li>
                    • That I seek to join the Juror pool voluntarily, without
                    any external pressure or agenda.
                  </li>
                  <li>
                    • That I understand my role is to evaluate cases based only
                    on the evidence presented, not personal beliefs.
                  </li>
                  <li>
                    • That I will abstain from research or voting on any matter
                    of which I have conflict of interest.
                  </li>
                  <li>
                    • That I agree to abide by all rules, duties and
                    restrictions outlined in the Juror Protocol.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="signature"
                    className="text-sm font-medium text-gray-700"
                  >
                    Digital Signature (type full legal name):
                  </Label>
                  <Input
                    id="signature"
                    value={formData.digitalSignature}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        digitalSignature: e.target.value,
                      }))
                    }
                    placeholder="Your signature here"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date: (Auto-filled)
                  </Label>
                  {/* <Input
                    id="date"
                    value={formData.date}
                    className="mt-1"
                    disabled
                  /> */}
                </div>
                <div className="text-xs text-gray-500">
                  📍 IP Address and Timestamp: (auto-captured by platform)
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 4: Platform Use and Consent */}
        <div className="bg-secondary-foreground custom-padding">
          <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
            <CardHeader className="w-full lg:w-1/5">
              <CardTitle className="">PLATFORM USE AND CONSENT</CardTitle>
            </CardHeader>
            <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
              <p className="text-sm text-gray-700 mb-4">
                By submitting this form: (you must check all boxes)
              </p>
              <div className="space-y-3">
                {[
                  "I agree to the Terms of Service, Juror Protocol, and Privacy Policy.",
                  "I agree to complete the Orientation and Ethics Test before being eligible to participate in any case review, and I understand that failing this test may delay or cancel my enrollment.",
                  "I consent to receiving notifications for Juror assignments.",
                  "I understand my performance may be reviewed and audited for fairness and consistency.",
                  "I understand I may be removed from the juror pool at the Platform's discretion.",
                  "I understand I will be contacted regarding this application to complete this process.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Checkbox
                      id={`consent-${index}`}
                      checked={formData.platformConsent.includes(index)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("platformConsent", index, checked)
                      }
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`consent-${index}`}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Submit Button */}
            <div className="flex justify-end py-6">
              <Button className="">
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurorApplicationForm;
