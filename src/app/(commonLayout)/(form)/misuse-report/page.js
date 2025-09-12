"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, AlertTriangle, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function MisuseReportForm() {
  const [formData, setFormData] = useState({
    reporterInfo: {
      fullName: "",
      anonymousPreferred: false,
      contactInformation: "",
      emailAddress: "",
      phoneNumber: "",
      relationship: "",
      witnessesPresent: "",
    },
    misuseNature: [],
    complaintSubject: "",
    allegedOfficial: "",
    incidentDate: "",
    incidentDetails: "",
    supportingEvidence: [],
    resolutionRequested: [],
    affirmation: false,
    signature: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [selectedFiles1, setSelectedFiles1] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState(null);
  const [supportingLink, setSupportingLink] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

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

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (section, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: checked
        ? [...prev[section], value]
        : prev[section].filter((item) => item !== value),
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen ">
      <div className="  bg-secondary py-12 md:py-16 lg:py-24 ">
        {/* Title Section */}
        <div className=" container mx-auto ">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="w-1/2 flex flex-col justify-between h-full gap-16 lg:gap-24 xl:gap-42">
              <div className="flex justify-start flex-col">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <h1 className="text-3xl font-bold text-gray-900">
                    Misuse Report Form
                  </h1>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use this form to report any misuse of power, fraud, waste,
                  abuse of authority, or any violation of law or policy. Your
                  report will be treated confidentially to the extent permitted
                  by law.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">
                  Are you personally knowledgeable about the problem or event
                  reported? (or this disclosure):
                </p>
                <RadioGroup defaultValue="yes" className="flex gap-6">
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
            </div>

            <div className="w-1/2">
              <CardHeader className="">
                <h3 className="">Section 1: Reporter Information</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Please provide your contact information. Anonymous reporting
                  is allowed.
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.reporterInfo.fullName}
                      onChange={(e) =>
                        handleInputChange(
                          "reporterInfo",
                          "fullName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactInfo">
                      username (if applicable)
                    </Label>
                    <Input
                      id="contactInfo"
                      value={formData.reporterInfo.contactInformation}
                      onChange={(e) =>
                        handleInputChange(
                          "reporterInfo",
                          "contactInformation",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.reporterInfo.emailAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "reporterInfo",
                          "emailAddress",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="caseID">If yes specify Case ID</Label>
                    <Input
                      id="caseID"
                      value={formData.reporterInfo.caseID}
                      onChange={(e) =>
                        handleInputChange(
                          "reporterInfo",
                          "caseID",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* <div>
                  <Label htmlFor="relationship">
                    Your Relationship to Organization
                  </Label>
                  <Input
                    id="relationship"
                    value={formData.reporterInfo.relationship}
                    onChange={(e) =>
                      handleInputChange(
                        "reporterInfo",
                        "relationship",
                        e.target.value
                      )
                    }
                  />
                </div> */}
              </CardContent>
            </div>
          </div>
        </div>

        <div className="">
          {/* Section 2: Nature of Misuse */}
          <div className="py-12 md:my-16 lg:py-24 bg-secondary-foreground">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="text-red-700">
                  Section 2: Nature Of The Reported Misuse
                </h3>
                <h4 className="text-center mb-6">( Select all the apply)</h4>
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
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("misuseNature", item, checked)
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
              <div className="">
                <h3 className="mb-6">Section 3: Subject of The Complaint</h3>
              </div>
              <CardContent className=" space-y-4">
                <div>
                  <Label>
                    Name of the Person Being or Mayor Employer (if known):
                  </Label>
                  <Input
                    value={formData.complaintSubject}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        complaintSubject: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Email of the person (if known):</Label>
                  <Input />
                </div>

                <div>
                  <Label>What was alleged official or employee:</Label>
                  <div className="mt-2 space-y-2">
                    {[
                      "Initiator",
                      "Respondent",
                      "Juror",
                      "Moderator/Staff",
                      "Unknown field",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`official-${index}`} />
                        <Label
                          htmlFor={`official-${index}`}
                          className="text-sm"
                        >
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
              <CardHeader className="">
                <h3 className="">Section 4: Incident Details</h3>
              </CardHeader>
              <CardContent className="">
                <h4 className="text-center mb-6">
                  Please describe the event(s), behavior(s), and any associated
                  case(s). Include dates, communication, or submissions if
                  known.
                </h4>

                <div>
                  <Label>Description of Incident(s):</Label>
                  <Textarea
                    className="h-40"
                    value={formData.incidentDetails}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        incidentDetails: e.target.value,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </div>
          </div>

          {/* Section 5: Supporting Evidence */}
          <div className="py-12 md:py-16 lg:py-24 bg-secondary">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 5: Supporting Evidence</h3>
              </CardHeader>
              <CardContent className="">
                <h4 className="text-center mb-6">
                  Attach any documents you cite and the documents that you can
                  provide to support maintaining a administrative filing etc.
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
              </CardContent>
            </div>
          </div>

          {/* Section 6: Resolution Requested */}
          <div className="py-12 md:py-16 lg:py-24 bg-secondary-foreground">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 6: Resolution Requested</h3>
              </CardHeader>
              <CardContent className="">
                <h4 className="mb-6 text-center">
                  Check the outcome that you believe would correct or redress
                  the violation:
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
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "resolutionRequested",
                            item,
                            checked
                          )
                        }
                      />
                      <Label
                        htmlFor={`resolution-${index}`}
                        className="text-sm"
                      >
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
              <CardHeader className="">
                <h3>Section 7: Affirmation & Signature</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-lg">
                  <p className="text-xl font-medium mb-2">
                    Perjury Declaration & Affidavit: Compliance Advice
                  </p>
                  <p className="text-sm ">
                    I swear or affirm under penalty of perjury that the
                    information I have provided in this complaint is true and
                    correct to the best of my knowledge and belief. I understand
                    that this information may be investigated and may result in
                    legal action against the named individual(s). I also
                    understand that knowingly filing a false complaint may
                    subject me to criminal penalties.
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="affirmation"
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, affirmation: checked }))
                    }
                  />
                  <Label htmlFor="affirmation" className="text-sm">
                    I affirm and attest to the absolute statement.
                  </Label>
                </div>

                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label>Report Signature:</Label>
                    <Input
                      className="mt-1"
                      value={formData.signature}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          signature: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate
                            ? selectedDate.toLocaleDateString()
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-6 ">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
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
            <div className="flex justify-center mb-7">
              <Button className="text-center mx-auto m-2">Submit Form</Button>
            </div>

            <p className=" mb-4">
            Upon submission, you will receive a confirmation receipt and tracking number. A member of the Platforms <strong>Compliance & Integrity Division</strong> will review your report within <strong>5–10 business days</strong>. You may be contacted for clarification or further evidence if needed.
            </p>

            <div className="flex w-full items-center justify-end ">
              <Button className="flex ">Submit Securely</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
