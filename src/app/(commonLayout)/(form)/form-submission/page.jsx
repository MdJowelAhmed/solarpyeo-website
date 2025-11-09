"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InitialForm from "../initial-form/page";
import MisuseReportForm from "../misuse-report/page";
import SealExpungeForm from "../seal-expunge/page";
import TechnicalSupportForm from "../technical-support/page";
import JurorEthics from "../../(profile)/juror-ethics/page";
import RespondentSubmissionForm from "../respondent-submission/page";
import IdentityDisputeForm from "../identity-dispute/page";
import AppealRequestForm from "../appeal-request/page";
import JurorRecusalForm from "../juror-recusal/page";

const GlassFileForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFormId, setSelectedFormId] = useState(
    searchParams.get("form") || "initial-submission"
  );

  const formOptions = [
    { name: "Initial Submission Form", id: "initial-submission" },
    { name: "Misuse Report Form", id: "misuse-report" },
    { name: "Request to Seal or Expunge", id: "seal-expunge" },
    { name: "Technical Support Request Form", id: "technical-support" },
    { name: "Application for Juror Program", id: "juror-enrollment" },
    { name: "Respondent Submission Form", id: "respondent-submission" },
    { name: "Identity Dispute Claim Form", id: "identity-dispute" },
    { name: "Appeal Request Form", id: "appeal-request" },
    { name: "Juror Recusal Form", id: "juror-recusal" },
  ];

  useEffect(() => {
    const formParam = searchParams.get("form");
    if (formParam && formParam !== selectedFormId) {
      setSelectedFormId(formParam);
    }
  }, [searchParams]);


  const handleFormChange = (value) => {
    setSelectedFormId(value);
    router.push(`?form=${value}`, { scroll: false });
  };

  const renderForm = () => {
    switch (selectedFormId) {
      case "initial-submission":
        return <InitialForm />;
      case "misuse-report":
        return <MisuseReportForm />;
      case "seal-expunge":
        return <SealExpungeForm />;
      case "technical-support":
        return <TechnicalSupportForm />;
      case "juror-enrollment":
        return <JurorEthics />;
      case "respondent-submission":
        return <RespondentSubmissionForm />;
      case "identity-dispute":
        return <IdentityDisputeForm />;
      case "appeal-request":
        return <AppealRequestForm />;
      case "juror-recusal":
        return <JurorRecusalForm />;
      default:
        return (
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">
                Form Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                The selected form could not be loaded.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="w-full pt-8  pb-0">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 mx-auto w-full flex flex-col md:flex-row justify-between gap-4 ">
        <div className="text-left w-full lg:w-3/5">
          <h1>Choose Your Submission Type</h1>
          <p>
            Please select the type of submission you would like to make. This
            will help us process your request accurately and direct it to the
            appropriate team.
          </p>
        </div>
        <div className=" flex-1 flex justify-end w-full lg:w-2/5">
          <Select onValueChange={handleFormChange} value={selectedFormId}>
            <SelectTrigger className="w-full lg:w-2/5 bg-white border border-gray-300 py-6 text-gray-800 font-medium rounded-md focus:ring-2 focus:ring-red-500">
              <SelectValue placeholder="Select a Form" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {formOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderForm()}
    </div>
  );
};

export default GlassFileForm;
