"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  FileText,
  Wrench,
  AlertTriangle,
  Calculator,
  CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TechnicalSupportForm() {
  const [selectedFiles1, setSelectedFiles1] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState(null);
  const [supportingLink, setSupportingLink] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [initiatorDob, setInitiatorDob] = useState(null);

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
  const [formData, setFormData] = useState({
    userInfo: {
      fullName: "",
      department: "",
      emailAddress: "",
      phoneNumber: "",
      jobTitle: "",
      requestType: "",
    },
    issueClassification: [],
    issueDescription: "",
    technicalDetails: {
      operatingSystem: "",
      browserType: "",
      systemSpecs: "",
      errorMessages: "",
    },
    attachments: [],
    impact: {
      severity: "",
      affectedUsers: "",
      businessImpact: "",
    },
    supportPreferences: {
      preferredContact: "",
      urgency: "",
    },
    declaration: false,
    signature: "",
    date: new Date().toISOString().split("T")[0],
  });

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
    console.log("Technical Support Request submitted:", formData);
    alert("Technical Support Request submitted successfully!");
  };

  return (
    <div className="">
      <div className=" ">
        {/* Title Section */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto flex ">
            <div className="w-1/2">
              {" "}
              <div className="flex  gap-2 mb-4">
                <h1 className="">🛠️ Technical Support Request Form</h1>
              </div>
              <p className="">
                Please fill out this form to request technical assistance. Our
                support team will review your request and respond within the
                timeframe based on the priority level selected.
              </p>
            </div>

            <div className="w-1/2">
              <CardHeader className="">
                <h3 className="">Section 1: User Identification</h3>
                <h4 className="text-center mb-6">
                  Please provide your contact and identification information.
                </h4>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name*</Label>
                    <Input
                      id="fullName"
                      value={formData.userInfo.fullName}
                      placeholder="Enter your full name"
                      onChange={(e) =>
                        handleInputChange(
                          "userInfo",
                          "fullName",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">
                      Username (if registered):*
                    </Label>
                    <Input
                      id="department"
                      value={formData.userInfo.department}
                      placeholder="Enter your username"
                      onChange={(e) =>
                        handleInputChange(
                          "userInfo",
                          "department",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.userInfo.emailAddress}
                      onChange={(e) =>
                        handleInputChange(
                          "userInfo",
                          "emailAddress",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.userInfo.phoneNumber}
                      placeholder="Enter your phone number"
                      onChange={(e) =>
                        handleInputChange(
                          "userInfo",
                          "phoneNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>

        <div className="">
          {/* Section 2: Issue Classification */}
          <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <div>
                <CardHeader className="">
                  <h3 className="">Section 2: Issue Classification</h3>
                  <h4 className="text-center mb-6">
                    (Select the category that best describes your issue)
                  </h4>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-1 gap-4">
                    {[
                      "Login / Account Access Problems",
                      "File Upload / Attachment Issue",
                      "Form Submission Error",
                      "Juror Dashboard / Case Access Problem",
                      "Profile Display or Record Error",
                      "Notifications / Email Issue",
                      "System Crash or Freeze",
                      "Page Not Loading / Broken Link",
                      "Data Sync or Loss of Progress",
                      "Other (please specify):",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`issue-${index}`}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "issueClassification",
                              item,
                              checked
                            )
                          }
                        />
                        <Label htmlFor={`issue-${index}`} className="text-sm">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Input
                      className="mt-1"
                      value={formData.otherIssueDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherIssueDescription: e.target.value,
                        }))
                      }
                      placeholder="If other, please specify"
                    />
                  </div>
                </CardContent>
              </div>
            </div>
          </div>

          {/* Section 3: Description of The Issue */}
          <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 3: Description Of The Issue</h3>
              </CardHeader>
              <CardContent className="">
                <p className="text-center mb-6">
                  Please describe in detail what happened, including any error
                  messages, and the steps to reproduce the issue.
                </p>

                <div>
                  <Label>Detailed Issue Description*</Label>
                  <Textarea
                    className="mt-1 h-32"
                    value={formData.issueDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        issueDescription: e.target.value,
                      }))
                    }
                    placeholder="Please describe your issue in detail..."
                    required
                  />
                </div>
              </CardContent>
            </div>
          </div>

          {/* Section 4: Technical Details (If Known) */}
          <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 4: Technical Details (If Known)</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label className="text-base font-medium">
                    Date and Time Issue Occurred:
                  </Label>
                  <Input
                    type="text"
                    placeholder="write occurred date and time"
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        issueDate: e.target.value,
                      }))
                    }
                  />
                  <div className="mt-3 space-y-8">
                    <div>
                      <Label>Device Type::</Label>
                      <div className="mt-5 space-y-5">
                        {["Desktop / Laptop", " Tablet", "Mobile"].map(
                          (browser, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`browser-${index}`} />
                              <Label
                                htmlFor={`browser-${index}`}
                                className="text-sm"
                              >
                                {browser}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Browser Used:</Label>
                      <div className="mt-5 space-y-5">
                        {[
                          "Windows",
                          "MacOS",
                          "Linux",
                          "Android",
                          "iOS",
                          "Other",
                        ].map((os, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`os-${index}`} />
                            <Label htmlFor={`os-${index}`} className="text-sm">
                              {os}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div>
                        <Input
                          className="mt-1"
                          placeholder="Please specify other details"
                        />
                      </div>
                    </div>

                    {/* <div>
                    <Label>Device:</Label>
                    <div className="mt-2 space-y-2">
                      {[
                        "Desktop",
                        "Laptop",
                        "Tablet",
                        "Smartphone",
                        "Other",
                      ].map((device, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`device-${index}`} />
                          <Label
                            htmlFor={`device-${index}`}
                            className="text-sm"
                          >
                            {device}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div> */}

                    <div>
                      <Label>Browser/App:</Label>
                      <div className="mt-5 space-y-5">
                        {["Chrome", "Firefox", "Safari", "Edge", "Other"].map(
                          (app, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`app-${index}`} />
                              <Label
                                htmlFor={`app-${index}`}
                                className="text-sm"
                              >
                                {app}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Other:</Label>
                      <Input
                        className="mt-1"
                        placeholder="Please specify other details"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>

          {/* Section 5: Attachments (Optional) */}
          <div className="bg-secondary py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 5: Attachments (Optional)</h3>
              </CardHeader>
              <CardContent className="">
                <h4 className="text-center mb-6">
                  Upload screenshots or screen recordings if possible to help
                  our team investigate.
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
                {/* <div className="mb-8">
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
                </div> */}
              </CardContent>
            </div>
          </div>

          {/* Section 6: Impact */}
          <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 6: Impact</h3>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-sm font-medium">
                    How urgent is the issue/request?
                  </Label>
                  <RadioGroup className="mt-3">
                    {["Critical", "High", "Medium", "Low"].map(
                      (level, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 "
                        >
                          <RadioGroupItem
                            value={level.toLowerCase()}
                            id={`urgency-${index}`}
                          />
                          <Label
                            htmlFor={`urgency-${index}`}
                            className="text-sm"
                          >
                            {level}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    How many users are affected by this issue/request?
                  </Label>
                  <RadioGroup className="mt-3">
                    {[
                      "Just me",
                      "My team (2-10)",
                      "My department (10+)",
                      "Multiple departments",
                      "Entire organization",
                    ].map((scope, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={`users-${index}`}
                          id={`users-${index}`}
                        />
                        <Label htmlFor={`users-${index}`} className="text-sm">
                          {scope}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </div>
          </div>

          {/* Section 7: Support Preferences */}
          <div className="bg-secondary py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 7: Support Preferences</h3>
              </CardHeader>
              <CardContent className=" space-y-5">
                <div>
                  <Label className="text-sm font-medium">
                    What is your preferred method to receive support?
                  </Label>
                  <RadioGroup className="mt-3">
                    {["Email", "Phone"].map((method, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={method.toLowerCase()}
                          id={`contact-${index}`}
                        />
                        <Label htmlFor={`contact-${index}`} className="text-sm">
                          {method}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Would you like to schedule a call or remote assistance?
                  </Label>
                  <RadioGroup className="mt-3">
                    {["Yes", "No"].map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={option.toLowerCase()}
                          id={`schedule-${index}`}
                        />
                        <Label
                          htmlFor={`schedule-${index}`}
                          className="text-sm"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </div>
          </div>

          {/* Section 8: Submission Declaration */}
          <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
            <div className="container mx-auto">
              <CardHeader className="">
                <h3 className="">Section 8: Submission Declaration</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="declaration"
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, declaration: checked }))
                    }
                  />
                  <Label htmlFor="declaration" className="text-sm">
                    I agree
                  </Label>
                </div>

                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label>Digital Signature*</Label>
                    <Input
                      className=""
                      value={formData.signature}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          signature: e.target.value,
                        }))
                      }
                      placeholder="Type your full name"
                      required
                    />
                  </div>

                  <RadioGroup className="mt-3">
                    {["Frequently", "Constant / Always"].map(
                      (method, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <RadioGroupItem
                            value={method.toLowerCase()}
                            id={`contact-${index}`}
                          />
                          <Label
                            htmlFor={`contact-${index}`}
                            className="text-sm"
                          >
                            {method}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {initiatorDob
                          ? initiatorDob.toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-6 ">
                      <Calendar
                        mode="single"
                        selected={initiatorDob}
                        onSelect={setInitiatorDob}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-lg">
                  <p className="">
                    I certify that the information provided above is accurate to
                    the best of my knowledge and that this request relates to a
                    genuine technical or functional problem on the Platform.
                  </p>
                </div>
              </CardContent>

              <p className="mt-4">
                You will receive a confirmation receipt with a tracking ID. Most
                technical issues are addressed within 1–3 business days
                depending on severity.
              </p>

              {/* Submit Section */}
              <div className="mt-6">
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmit}
                      className="bg-red-600 hover:bg-red-700 text-white px-12 py-2"
                      size="lg"
                    >
                      Submit Request
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
