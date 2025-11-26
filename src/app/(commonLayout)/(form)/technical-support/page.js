"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateTechnicalSupportMutation } from "@/redux/featured/technicalSupport/technicalSupportApi";
// import { useCreateTechnicalSupportMutation } from "@/redux/api/technicalSupportApi";
import { toast } from "sonner";

export default function TechnicalSupportForm() {
  const [createTechnicalSupport, { isLoading }] =
    useCreateTechnicalSupportMutation();

  // Get user ID from your auth system (Redux, Context, or localStorage)
  // Example: const userId = useSelector(state => state.auth.user?._id);
  // Or: const userId = localStorage.getItem('userId');
  const userId = "YOUR_USER_ID_HERE"; // Replace this with actual user ID

  const [selectedFile, setSelectedFile] = useState(null);
  const [initiatorDob, setInitiatorDob] = useState(null);
  const [issueDate, setIssueDate] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    issueClassification: [],
    otherIssueDescription: "",
    description: "",
    dateAndTime: "",
    deviceType: [],
    browserUsed: [],
    browserUsedOther: "",
    browserApp: [],
    otherDetails: "",
    impact: "",
    affectedUser: "",
    receiveSupport: "",
    scheduleCall: "",
    digitalSignature: "",
    submissionType: "",
    agreed: false,
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] || []), value]
        : (prev[field] || []).filter((item) => item !== value),
    }));
  };

  const handleRadioChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validation - check all required fields
      if (!formData.name) {
        toast.error("Please enter your name");
        return;
      }
      if (!formData.phone) {
        toast.error("Please enter your phone number");
        return;
      }
      if (!formData.description) {
        toast.error("Please enter issue description");
        return;
      }
      if (!formData.dateAndTime) {
        toast.error("Please select the issue date");
        return;
      }
      if (formData.deviceType.length === 0) {
        toast.error("Please select device type");
        return;
      }
      if (formData.browserApp.length === 0) {
        toast.error("Please select browser/app");
        return;
      }
      if(formData.impact === ""){
        toast.error("Please select impact");
        return;
      }
      if (!formData.receiveSupport) {
        toast.error("Please select preferred support method");
        return;
      }
      if (!formData.scheduleCall) {
        toast.error("Please select if you want to schedule a call");
        return;
      }

      // Create FormData object
      const submitData = new FormData();

      // User ID (Required by backend)
      submitData.append("user", userId); // This is required!

      // Required fields
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("description", formData.description);
      submitData.append("dateAndTime", formData.dateAndTime);
      submitData.append("deviceType", formData.deviceType.join(", "));
      submitData.append("browserApp", formData.browserApp.join(", "));
      submitData.append("receiveSupport", (formData.receiveSupport || "").toLowerCase());
      submitData.append("scheduleCall", formData.scheduleCall);

      // Optional fields
      if (formData.userName) {
        submitData.append("userName", formData.userName);
      }
      if (formData.email) {
        submitData.append("email", formData.email);
      }
      if (formData.issueClassification.length > 0) {
        submitData.append(
          "issueClassification",
          formData.issueClassification.join(", ")
        );
      }
      if (formData.impact) {
        submitData.append("impact", formData.impact);
      }
      if (formData.affectedUser) {
        submitData.append("affectedUser", formData.affectedUser);
      }
      if (formData.digitalSignature) {
        submitData.append("digitalSignature", formData.digitalSignature);
      }
      if (formData.submissionType) {
        submitData.append("submissionType", formData.submissionType);
      }
      if (initiatorDob) {
        submitData.append("DOB", initiatorDob.toISOString().split("T")[0]);
      }
      if (formData.otherIssueDescription) {
        submitData.append(
          "otherIssueDescription",
          formData.otherIssueDescription
        );
      }
      if (formData.browserUsedOther) {
        submitData.append("browserUsed", formData.browserUsedOther);
      }
      if (formData.otherDetails) {
        submitData.append("otherDetails", formData.otherDetails);
      }
      if (formData.browserUsed.length > 0) {
        submitData.append("browserUsed", formData.browserUsed.join(", "));
      }

      // Append file if exists
      if (selectedFile) {
        submitData.append("attachment", selectedFile);
      }

      // Submit the form
      const response = await createTechnicalSupport(submitData).unwrap();

      toast.success("Technical Support Request submitted successfully!");
      console.log("Response:", response);

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.message || error.message || "Failed to submit request"
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      userName: "",
      email: "",
      phone: "",
      issueClassification: [],
      otherIssueDescription: "",
      description: "",
      dateAndTime: "",
      deviceType: [],
      browserUsed: [],
      browserUsedOther: "",
      browserApp: [],
      otherDetails: "",
      impact: "",
      affectedUser: "",
      receiveSupport: "",
      scheduleCall: "",
      digitalSignature: "",
      submissionType: "",
      agreed: false,
    });
    setSelectedFile(null);
    setInitiatorDob(null);
  };

  return (
    <div className="">
      {/* Title Section */}
      <div className="bg-secondary-foreground custom-padding ">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl lg:text-4xl font-bold text-center">
              🛠️ Technical Support Request Form
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed text-justify max-w-2xl mx-auto mt-3">
            Please fill out this form to request technical assistance. Our
            support team will review your request and respond within the
            timeframe based on the priority level selected.
          </p>
        </div>

        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">User Identification</CardTitle>
            <h4 className="text-justify mb-6">
              Please provide your contact and identification information.
            </h4>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name*</Label>
                <Input
                  id="fullName"
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="userName">Username (if registered):*</Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  placeholder="Enter your username"
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  placeholder="Enter your phone number"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-4"></div>
          </CardContent>
        </div>
      </div>

      {/* Section 2: Issue Classification */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Issue Classification</CardTitle>
            <p className="text-justify mb-6">
              (Select the category that best describes your issue)
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
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
                    checked={formData.issueClassification.includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("issueClassification", item, checked)
                    }
                  />
                  <p htmlFor={`issue-${index}`} className="text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <Input
                className="mt-4"
                value={formData.otherIssueDescription}
                onChange={(e) =>
                  handleInputChange("otherIssueDescription", e.target.value)
                }
                placeholder="If other, please specify"
              />
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 3: Description of The Issue */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Description Of The Issue</CardTitle>
            <p className="text-justify ">
              Please describe in detail what happened, including any error
              messages, and the steps to reproduce the issue.
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div>
              <Label>Detailed Issue Description*</Label>
              <Textarea
                className="mt-1 h-32"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Please describe your issue in detail..."
                required
              />
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 4: Technical Details */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Technical Details (If Known)</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div>
              <Label className="text-base font-medium">
                Date Issue Occurred:
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {issueDate
                      ? issueDate.toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-6">
                  <div className="space-y-2">
                    <Input
                      type="date"
                      value={issueDate ? issueDate.toISOString().split("T")[0] : ""}
                      onChange={(e) => {
                        const val = e.target.value; // YYYY-MM-DD
                        if (val) {
                          const d = new Date(val);
                          setIssueDate(d);
                          handleInputChange("dateAndTime", `${val}T00:00:00.000Z`);
                        } else {
                          setIssueDate(null);
                          handleInputChange("dateAndTime", "");
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <div className="mt-3 space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label>Device Type:</Label>
                  <div className="mt-5 space-y-3">
                    {["Desktop / Laptop", "Tablet", "Mobile"].map(
                      (device, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`device-${index}`}
                            checked={formData.deviceType.includes(device)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                "deviceType",
                                device,
                                checked
                              )
                            }
                          />
                          <p htmlFor={`device-${index}`} className="text-sm">
                            {device}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <Label>Browser Used:</Label>
                  <div className="mt-5 space-y-3">
                    {[
                      "Windows",
                      "MacOS",
                      "Linux",
                      "Android",
                      "iOS",
                      "Other",
                    ].map((os, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`os-${index}`}
                          checked={formData.browserUsed.includes(os)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("browserUsed", os, checked)
                          }
                        />
                        <p htmlFor={`os-${index}`} className="text-sm">
                          {os}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Input
                      className="mt-1"
                      placeholder="Please specify other details"
                      value={formData.browserUsedOther}
                      onChange={(e) =>
                        handleInputChange("browserUsedOther", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Browser/App:</Label>
                  <div className="mt-5 space-y-3">
                    {["Chrome", "Firefox", "Safari", "Edge", "Other"].map(
                      (app, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`app-${index}`}
                            checked={formData.browserApp.includes(app)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("browserApp", app, checked)
                            }
                          />
                          <p htmlFor={`app-${index}`} className="text-sm">
                            {app}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  <div>
                    <p>Other:</p>
                    <Input
                      className="mt-1"
                      placeholder="Please specify other details"
                      value={formData.otherDetails}
                      onChange={(e) =>
                        handleInputChange("otherDetails", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 5: Attachments */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Attachments (Optional)</CardTitle>
            <p className="text-justify ">
              Upload screenshots or screen recordings if possible to help our
              team investigate.
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                Upload File:
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="flex items-center justify-between w-1/2 px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <span className="text-gray-700">
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {selectedFile ? "" : "No file chosen"}
                  </span>
                </label>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 6: Impact */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className=""> Impact</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10 grid grid-cols-1 lg:grid-cols-2 space-y-5">
            <div>
              <Label className="text-sm font-medium">
                How urgent is the issue/request?
              </Label>
              <RadioGroup
                className="mt-3"
                value={formData.impact}
                onValueChange={(value) => handleRadioChange("impact", value)}
              >
                {["critical", "high", "medium", "low"].map((level, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={level} id={`urgency-${index}`} />
                    <p htmlFor={`urgency-${index}`} className="text-sm">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">
                How many users are affected by this issue/request?
              </Label>
              <RadioGroup
                className="mt-3"
                value={formData.affectedUser}
                onValueChange={(value) =>
                  handleRadioChange("affectedUser", value)
                }
              >
                {[
                  { value: "justMe", label: "Just me" },
                  { value: "myTeam", label: "My team (2-10)" },
                  { value: "myDepartment", label: "My department (10+)" },
                  {
                    value: "multipleDepartments",
                    label: "Multiple departments",
                  },
                  { value: "entireOrganization", label: "Entire organization" },
                ].map((scope, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={scope.value} id={`users-${index}`} />
                    <p htmlFor={`users-${index}`} className="text-sm">
                      {scope.label}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 7: Support Preferences */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Support Preferences</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 grid grid-cols-1 lg:grid-cols-2 lg:pl-10">
            <div>
              <Label className="text-sm font-medium">
                What is your preferred method to receive support?
              </Label>
              <RadioGroup
                className="mt-3"
                value={formData.receiveSupport}
                onValueChange={(value) =>
                  handleRadioChange("receiveSupport", value)
                }
              >
                {["email", "phone"].map((method, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={method} id={`contact-${index}`} />
                    <Label htmlFor={`contact-${index}`} className="text-sm">
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Would you like to schedule a call or remote assistance?
              </Label>
              <RadioGroup
                className="mt-3"
                value={formData.scheduleCall}
                onValueChange={(value) =>
                  handleRadioChange("scheduleCall", value)
                }
              >
                {["true", "false"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`schedule-${index}`} />
                    <Label htmlFor={`schedule-${index}`} className="text-sm">
                      {option === "true" ? "Yes" : "No"}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 8: Submission Declaration */}
      <div className="bg-secondary custom-padding">
        <div className="container mx-auto">
          {/* <CardHeader className="">
                <h3 className="">Section 8: Submission Declaration</h3>
              </CardHeader> */}
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="declaration"
                checked={formData.agreed}
                onCheckedChange={(checked) =>
                  handleInputChange("agreed", checked)
                }
              />
              <Label htmlFor="declaration" className="text-sm">
                I agree
              </Label>
            </div>

            {/* <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label>Digital Signature*</Label>
                    <Input
                      className=""
                      value={formData.digitalSignature}
                      onChange={(e) => handleInputChange("digitalSignature", e.target.value)}
                      placeholder="Type your full name"
                      required
                    />
                  </div>

                  <RadioGroup 
                    className="mt-3"
                    value={formData.submissionType}
                    onValueChange={(value) => handleRadioChange("submissionType", value)}
                  >
                    {["frequently", "constant"].map(
                      (method, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <RadioGroupItem
                            value={method}
                            id={`submission-${index}`}
                          />
                          <Label
                            htmlFor={`submission-${index}`}
                            className="text-sm"
                          >
                            {method === "frequently" ? "Frequently" : "Constant / Always"}
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
                        <Calendar className="mr-2 h-4 w-4" />
                        {initiatorDob
                          ? initiatorDob.toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-6">
                      <div className="space-y-2">
                        <Input
                          type="date"
                          value={initiatorDob ? initiatorDob.toISOString().split('T')[0] : ''}
                          onChange={(e) => setInitiatorDob(new Date(e.target.value))}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div> */}

            <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded-md">
              <p className="">
                I certify that the information provided above is accurate to the
                best of my knowledge and that this request relates to a genuine
                technical or functional problem on the Platform.
              </p>
            </div>
          </CardContent>

          <p className="mt-4">
            You will receive a confirmation receipt with a tracking ID. Most
            technical issues are addressed within 1-3 business days depending on
            severity.
          </p>

          {/* Submit Section */}
          <div className="mt-6">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="b text-white px-12 py-2"
                  size="lg"
                >
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}
