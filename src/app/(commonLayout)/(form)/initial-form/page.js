"use client";
import React, { useEffect, useState } from "react";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateInitialSubmissionMutation } from "@/redux/featured/initialSubmission/initialSubmissionApi";
import PaymentModal from "./PaymentModal";
import { useMyProfileQuery } from "@/redux/featured/auth/authApi";
import Image from "next/image";

const InitialForm = () => {
  // Initiator fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [initiatorDob, setInitiatorDob] = useState();
  const [isInitiatorPopoverOpen, setIsInitiatorPopoverOpen] = useState(false);
  const [state, setState] = useState("");
  const { data: userData } = useMyProfileQuery();

  // Respondent fields
  const [respondentFirstName, setRespondentFirstName] = useState("");
  const [respondentMiddleName, setRespondentMiddleName] = useState("");
  const [respondentLastName, setRespondentLastName] = useState("");
  const [respondentDob, setRespondentDob] = useState();
  const [isRespondentPopoverOpen, setIsRespondentPopoverOpen] = useState(false);
  const [respondentEmail, setRespondentEmail] = useState("");
  const [gender, setGender] = useState("");
  const [respondentGender, setRespondentGender] = useState("");
  
  // Filing type and allegations
  const [filingType, setFilingType] = useState("");
  const [allegations, setAllegations] = useState(["", ""]);

  // Evidence
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [previews1, setPreviews1] = useState([]);
  const [supportingLink, setSupportingLink] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [submittedSubmissionId, setSubmittedSubmissionId] = useState(null);

  // RTK Query mutation
  const [createInitialSubmission, { isLoading }] =
    useCreateInitialSubmissionMutation();

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming", "Other",
  ];

  const handleFileChange = (event, fileNumber = 1) => {
    const files = event.target.files;
    if (!files) return;
    const arr = Array.from(files).slice(0, 15); // max 15
    if (fileNumber === 1) {
      setSelectedFiles1(arr);
    }
  };

  useEffect(() => {
    previews1.forEach((p) => URL.revokeObjectURL(p.url));
    const next = selectedFiles1.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      type: f.type,
    }));
    setPreviews1(next);
    return () => next.forEach((p) => URL.revokeObjectURL(p.url));
  }, [selectedFiles1]);

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

    if (!respondentDob) {
      toast.error("Please select dates of birth");
      return;
    }

    const initiatorDobDate =
      initiatorDob ||
      (userData?.birthDate ? new Date(userData.birthDate) : undefined);

    if (!initiatorDobDate) {
      toast.error("Initiator date of birth is missing");
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
      const formData = new FormData();

      // Add all text fields
      formData.append("fastName", firstName || userData?.firstName || "");
      formData.append("middleName", middleName || userData?.middleName || "");
      formData.append("lastName", lastName || userData?.lastName || "");
      formData.append("dob", initiatorDobDate.toISOString());
      formData.append("state", state);
      formData.append("gender", userData?.gender || gender || "");

      formData.append("respondentFastName", respondentFirstName);
      formData.append("respondentMiddleName", respondentMiddleName);
      formData.append("respondentLastName", respondentLastName);
      formData.append("respondentDOB", new Date(respondentDob).toISOString());
      formData.append("respondentEmail", respondentEmail);
      formData.append("respondentGender", respondentGender);

      formData.append("typeOfFiling", filingType);

      // Add allegations
      const validAllegations = allegations.filter((a) => a.trim() !== "");
      validAllegations.forEach((allegation, index) => {
        formData.append(`allegation[${index}]`, allegation);
      });

      // Add files with correct field name
      if (selectedFiles1?.length > 0) {
        selectedFiles1.forEach((file) => {
          formData.append("evidence", file);
        });
      }

      // Add optional link
      if (supportingLink) {
        formData.append("link", supportingLink);
      }

      // Debug: Log FormData contents
      console.log("=== FormData Debug ===");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, `File - ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}:`, value);
        }
      }
      console.log("======================");

      // Submit the form
      const result = await createInitialSubmission(formData).unwrap();
      console.log("Submission result:", result);

      toast.success("Form submitted successfully!");

      // Store the submission ID and open payment modal
      setSubmittedSubmissionId(result.data._id);
      setIsPaymentModalOpen(true);

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
      setRespondentGender("");
      setGender("");
      setFilingType("");
      setAllegations(["", ""]);
      setSelectedFiles1([]);
      setSupportingLink("");
      setIsAgreed(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.message || "Failed to submit form. Please try again."
      );
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSubmittedSubmissionId(null);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full py-8">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              {/* Information About The Initiator */}
              <div className="custom-padding bg-secondary-foreground">
                <div className="w-full mb-10 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-4">
                    Initial Submission Form
                  </h2>
                  <h4 className="text-center max-w-md mx-auto">
                    For respondents, legal guardians, advocates & verified
                    persons to make an appeal to the competent court.
                  </h4>
                </div>
                <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between bg-white rounded-md">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle>Information About The Initiator</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                    <div>
                      <Label htmlFor="initiator-first-name">First Name *</Label>
                      <Input
                        id="initiator-first-name"
                        disabled
                        placeholder="John Doe Jr Max"
                        value={userData?.firstName || firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="initiator-middle-name">Middle Name</Label>
                      <Input
                        id="initiator-middle-name"
                        disabled
                        placeholder="Doe John Junior"
                        value={userData?.middleName || middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="initiator-last-name">Last Name *</Label>
                      <Input
                        id="initiator-last-name"
                        disabled
                        placeholder="Doe John Junior"
                        value={userData?.lastName || lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Date of Birth *</Label>
                      <Popover
                        open={isInitiatorPopoverOpen}
                        onOpenChange={setIsInitiatorPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal py-[23px] cursor-not-allowed opacity-50"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {initiatorDob
                              ? initiatorDob.toLocaleDateString()
                              : userData?.birthDate
                              ? new Date(userData.birthDate).toLocaleDateString()
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              initiatorDob ||
                              (userData?.birthDate
                                ? new Date(userData.birthDate)
                                : undefined)
                            }
                            onSelect={(date) => {
                              setInitiatorDob(date);
                              setIsInitiatorPopoverOpen(false);
                            }}
                            disabled={{ after: new Date() }}
                            captionLayout="dropdown"
                            fromYear={1920}
                            toYear={new Date().getFullYear()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="gender-select">Gender *</Label>
                      <Select
                        value={userData?.gender || gender}
                        onValueChange={setGender}
                        required
                        disabled
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="state-select">What State do you reside in? *</Label>
                      <Select value={state} onValueChange={setState} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((stateOption) => (
                            <SelectItem key={stateOption} value={stateOption}>
                              {stateOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </div>
              </div>

              {/* Information About The Respondent */}
              <div className="custom-padding bg-secondary">
                <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 rounded-md mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle>Information About The Respondent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                    <div>
                      <Label htmlFor="respondent-first-name">First Name *</Label>
                      <Input
                        id="respondent-first-name"
                        placeholder="Enter First Name"
                        value={respondentFirstName}
                        onChange={(e) => setRespondentFirstName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="respondent-middle-name">Middle Name</Label>
                      <Input
                        id="respondent-middle-name"
                        placeholder="Enter Middle Name"
                        value={respondentMiddleName}
                        onChange={(e) => setRespondentMiddleName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="respondent-last-name">Last Name *</Label>
                      <Input
                        id="respondent-last-name"
                        placeholder="Enter Last Name"
                        value={respondentLastName}
                        onChange={(e) => setRespondentLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Date of Birth *</Label>
                      <Popover
                        open={isRespondentPopoverOpen}
                        onOpenChange={setIsRespondentPopoverOpen}
                      >
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
                            onSelect={(date) => {
                              setRespondentDob(date);
                              setIsRespondentPopoverOpen(false);
                            }}
                            disabled={{ after: new Date() }}
                            captionLayout="dropdown"
                            fromYear={1920}
                            toYear={new Date().getFullYear()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="respondent-gender">Gender *</Label>
                      <Select
                        value={respondentGender}
                        onValueChange={setRespondentGender}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="respondent-email">Respondents Email *</Label>
                      <Input
                        id="respondent-email"
                        type="email"
                        placeholder="Enter Respondents Email"
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
                <div className="bg-white rounded-md p-4 md:p-6 lg:p-8 xl:p-12 border-2 mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle>Type Of Filing *</CardTitle>
                    <RadioGroup
                      value={filingType}
                      onValueChange={setFilingType}
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="RomanticMisconduct" id="romantic-misconduct" />
                        <Label htmlFor="romantic-misconduct">Romantic Misconduct</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ProtectionOrder" id="protection-order" />
                        <Label htmlFor="protection-order">Protection Order</Label>
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SubjectMatter" id="subject-matter" />
                        <Label htmlFor="subject-matter">Subject Matter</Label>
                      </div> */}
                    </RadioGroup>
                  </CardHeader>

                  <div className="w-full lg:w-4/5">
                    <CardContent className="w-full grid grid-cols-1 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
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
                        className="mt-4 py-6 text-accent"
                      >
                        Add Another Allegation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Evidence */}
              <div className="custom-padding bg-secondary">
                <div className="p-4 md:p-6 lg:p-8 xl:p-12 border-2 rounded-md mx-auto flex flex-col lg:flex-row items-center justify-between">
                  <CardHeader className="w-full lg:w-1/5">
                    <CardTitle>Upload Evidence</CardTitle>
                    <h4 className="mb-4 text-justify text-sm">
                      Upload any documentation you believe supports your claim,
                      including screenshots, messages, case submission links, etc.
                    </h4>
                  </CardHeader>
                  <div className="w-full lg:w-4/5 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12 lg:border-l-4 h-full lg:pl-10">
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">
                        Upload File(s):
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="file1"
                          onChange={(e) => handleFileChange(e, 1)}
                          className="hidden"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <label
                          htmlFor="file1"
                          className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <span className="text-gray-700">
                            {selectedFiles1.length > 0
                              ? `${selectedFiles1.length} file(s) selected`
                              : "Choose File(s)"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {selectedFiles1.length === 0 ? "No file chosen" : ""}
                          </span>
                        </label>
                        {previews1.length > 0 && (
                          <ul className="mt-2 text-sm text-gray-600 flex gap-2 flex-wrap">
                            {previews1.map((p, i) => (
                              <li key={i} className="flex flex-col items-center">
                                {p.type.startsWith("image/") ? (
                                  <Image
                                    src={p.url}
                                    alt={p.name}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 object-cover rounded-md"
                                  />
                                ) : (
                                  <div className="px-2 py-1 border rounded">
                                    {p.name}
                                  </div>
                                )}
                                <div className="text-xs mt-1 max-w-[120px] truncate">
                                  {p.name}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

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
              </div>

              <div className="custom-padding bg-secondary-foreground">
                {/* Declaration Section */}
                <div className="bg-primary-foreground border-l-4 border-red-700 rounded-md p-6 my-8">
                  <h2 className="font-bold mb-3 text-lg">
                    DECLARATION UNDER PENALTY OF PERJURY
                  </h2>
                  <p className="text-sm mb-4 leading-relaxed">
                    I hereby declare and affirm in accordance with the laws of
                    the jurisdiction(s) involved, UNDER PENALTY OF PERJURY, that
                    the foregoing is true and accurate to the best of my knowledge.
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        submissionId={submittedSubmissionId}
      />
    </div>
  );
};

export default InitialForm;