"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Upload, FileText } from "lucide-react";
import FormDropdown from "@/components/FormDropdown";
// import { useCreateInitialSubmissionMutation } from "@/redux/api/initialSubmissionApi";
import { toast } from "sonner"; // or your toast library
import { useCreateInitialSubmissionMutation } from "@/redux/featured/initialSubmission/initialSubmissionApi";

const InitialForm = () => {
  // Initiator fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initiatorDob, setInitiatorDob] = useState();
  const [state, setState] = useState("");

  // Respondent fields
  const [respondentFirstName, setRespondentFirstName] = useState("");
  const [respondentMiddleName, setRespondentMiddleName] = useState("");
  const [respondentLastName, setRespondentLastName] = useState("");
  const [respondentDob, setRespondentDob] = useState();
  const [respondentEmail, setRespondentEmail] = useState("");

  // Filing type and allegations
  const [filingType, setFilingType] = useState("");
  const [allegations, setAllegations] = useState(["", ""]);

  // Evidence
  const [selectedFiles1, setSelectedFiles1] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState(null);
  const [supportingLink, setSupportingLink] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // RTK Query mutation
  const [createInitialSubmission, { isLoading }] = useCreateInitialSubmissionMutation();

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

  const handleAllegationChange = (index, value) => {
    const newAllegations = [...allegations];
    newAllegations[index] = value;
    setAllegations(newAllegations);
  };

  const addAnotherAllegation = () => {
    setAllegations([...allegations, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !respondentFirstName || !respondentLastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!initiatorDob || !respondentDob) {
      toast.error("Please select dates of birth");
      return;
    }

    if (!state) {
      toast.error("Please select a state");
      return;
    }

    if (!filingType) {
      toast.error("Please select a type of filing");
      return;
    }

    if (!isAgreed) {
      toast.error("Please agree to the declaration");
      return;
    }

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all text fields matching Postman structure
      formData.append("fastName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("dob", initiatorDob.toISOString());
      formData.append("state", state);

      formData.append("respondentFastName", respondentFirstName);
      formData.append("respondentMiddleName", respondentMiddleName);
      formData.append("respondentLastName", respondentLastName);
      formData.append("respondentDOB", respondentDob.toISOString());
      formData.append("respondentEmail", respondentEmail);

      formData.append("typeOfFiling", filingType);

      // Add allegations (filter out empty ones)
      const validAllegations = allegations.filter(a => a.trim() !== "");
      validAllegations.forEach((allegation, index) => {
        formData.append(`allegation[${index}]`, allegation);
      });

      // Add files
      if (selectedFiles1) {
        formData.append("evidence", selectedFiles1);
      }
      // Evidence 
      if (selectedFiles2) {
        formData.append("evidence", selectedFiles2);
      }

      // Add optional link if provided
      if (supportingLink) {
        formData.append("supportingLink", supportingLink);
      }
console.log("formData", formData)



// Debug FormData contents
for (let pair of formData.entries()) {
  console.log(pair[0] + ': ', pair[1]);
}
      // Submit the form
      const result = await createInitialSubmission(formData).unwrap();
      console.log(result)

      toast.success("Form submitted successfully!");
      
      // Reset form
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setInitiatorDob(undefined);
      setState("");
      setRespondentFirstName("");
      setRespondentMiddleName("");
      setRespondentLastName("");
      setRespondentDob(undefined);
      setRespondentEmail("");
      setFilingType("");
      setAllegations(["", ""]);
      setSelectedFiles1(null);
      setSelectedFiles2(null);
      setSupportingLink("");
      setIsAgreed(false);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.data?.message || "Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="  w-full py-8">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            {/* Main Form */}
            <div className="w-full">
            

              {/* Information About The Initiator */}
              <div className=" custom-padding bg-secondary-foreground  ">
                  <div className="w-full mb-10 flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-4">Initial Submission Form</h2>
                    <h4 className="text-center max-w-md mx-auto">
                      For respondents, legal guardians, advocates & verifiied
                      persons to make an appeal to the competent court.
                    </h4>
                  </div>
                <div className="p-4 md:p-6 lg:p-8 xl:p-12  mx-auto flex flex-col lg:flex-row items-center justify-between bg-white  rounded-md">
                  <CardHeader className="w-full lg:w-1/5 ">
                    <CardTitle className="">
                      Information About The Initiator
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4  h-full lg:pl-10">
                    <div>
                      <Label htmlFor="initiator-first-name">First Name *</Label>
                      <Input
                        id="initiator-first-name"
                        placeholder="John Doe Jr Max"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="initiator-middle-name">Middle Name</Label>
                      <Input
                        id="initiator-middle-name"
                        placeholder="Doe John Junior"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="initiator-last-name">Last Name *</Label>
                      <Input
                        id="initiator-last-name"
                        placeholder="Doe John Junior"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal py-[23px]"
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

                    <div>
                      <Label htmlFor="state-select" className="mb-2">
                        What State do you reside in? *
                      </Label>
                      <Select
                        value={state}
                        onValueChange={setState}
                        required
                      >
                        <SelectTrigger className="w-4/5">
                          <SelectValue placeholder="California" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="California">California</SelectItem>
                          <SelectItem value="Texas">Texas</SelectItem>
                          <SelectItem value="Florida">Florida</SelectItem>
                          <SelectItem value="New York">New York</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </div>
              </div>

              {/* Information About The Respondent */}
              <div className="custom-padding bg-secondary">
                <div className="p-4 md:p-6 lg:p-8 xl:p-12  mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle className="">
                      Information About The Respondent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                    <div>
                      <Label htmlFor="respondent-first-name">First Name *</Label>
                      <Input
                        id="respondent-first-name"
                        placeholder="John Doe Jr Max"
                        value={respondentFirstName}
                        onChange={(e) => setRespondentFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="respondent-middle-name">Middle Name</Label>
                      <Input
                        id="respondent-middle-name"
                        placeholder="Doe John Junior"
                        value={respondentMiddleName}
                        onChange={(e) => setRespondentMiddleName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="respondent-last-name">Last Name *</Label>
                      <Input
                        id="respondent-last-name"
                        placeholder="Doe John Junior"
                        value={respondentLastName}
                        onChange={(e) => setRespondentLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Date of Birth *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal py-[23px]"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {respondentDob
                              ? respondentDob.toLocaleDateString()
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={respondentDob}
                            onSelect={setRespondentDob}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="respondent-email">Respondents Email *</Label>
                      <Input
                        id="respondent-email"
                        type="email"
                        placeholder="doe.john@email.com"
                        value={respondentEmail}
                        onChange={(e) => setRespondentEmail(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </div>
              </div>

              {/* Type Of Filing */}
              <div className="custom-padding bg-secondary-foreground">
                <div className="bg-white rounded-md p-4 md:p-6 lg:p-8 xl:p-12  mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle className="">
                      Type Of Filing *
                    </CardTitle>
                    <div>
                      <RadioGroup
                        value={filingType}
                        onValueChange={setFilingType}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Jurisdiction"
                            id="jurisdiction"
                          />
                          <Label htmlFor="jurisdiction">Jurisdiction</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Procedural Issue"
                            id="procedural-issue"
                          />
                          <Label htmlFor="procedural-issue">
                            Procedural Issue
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Subject Matter"
                            id="subject-matter"
                          />
                          <Label htmlFor="subject-matter">Subject Matter</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardHeader>

                  <div className="w-full lg:w-4/5">
                    <CardContent className="w-full  grid grid-cols-1  gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                      <div className="mt-6 space-y-4">
                        {allegations.map((allegation, index) => (
                          <div key={index}>
                            <Label htmlFor={`allegation-${index}`}>
                              {index === 0 ? "What happened?" : `Allegation ${index + 1}`}
                              {index < 2 && " *"}
                            </Label>
                            <Textarea
                              id={`allegation-${index}`}
                              placeholder={`Allegation ${index + 1}`}
                              className="min-h-32"
                              value={allegation}
                              onChange={(e) => handleAllegationChange(index, e.target.value)}
                              required={index < 2}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <div className="w-full flex items-center justify-end">
                      <Button 
                        type="button"
                        onClick={addAnotherAllegation}
                        className="mt-4 py-6  text-accent "
                      >
                        Add Another Allegation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Evidence */}
              <div className="custom-padding bg-secondary">
                <div className=" p-4 md:p-6 lg:p-8 xl:p-12  mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle className="">Upload Evidence</CardTitle>
                    <h4 className="mb-4 text-justify text-sm">
                      Upload any documentation you believe supports your claim,
                      including screenshots, messages, case submission links, etc.
                    </h4>
                  </CardHeader>
                  <div className="w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                    <div className="mb-6 ">
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
                          className="flex items-center justify-between  px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
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
                          className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
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
                  </div>
                </div>

                {/* Declaration Section */}
                <div className="bg-primary-foreground border-l-4 border-red-700 rounded-sm p-6 mb-8">
                  <h2 className="font-bold  mb-3 text-lg">
                    DECLARATION UNDER PENALTY OF PERJURY
                  </h2>
                  <p className=" text-sm mb-4 leading-relaxed">
                    I hereby declare and affirm in accordance with the laws of the
                    jurisdiction(s) involved, UNDER PENALTY OF PERJURY, that the
                    foregoing is true and accurate to the best of my knowledge.
                  </p>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="agree"
                      className="text-red-700 text-sm font-medium cursor-pointer"
                    >
                      I Agree *
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isAgreed || isLoading}
                    className={`px-8 py-3 rounded-md font-medium text-white transition-colors ${
                      isAgreed && !isLoading
                        ? "bg-primary hover:bg-primary/90 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Submit Securely"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialForm;