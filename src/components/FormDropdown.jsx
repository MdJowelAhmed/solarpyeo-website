"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const FormDropdown = ({ triggerText = "Select Form" }) => {
  const router = useRouter();

  const formOptions = [
    { name: "Initial Submission Form", path: "/initial-submission" },
    { name: "Misuse Report Form", path: "/misuse-report" },
    { name: "Request to Seal or Expunge", path: "/seal-expunge" },
    { name: "Technical Support Request Form", path: "/technical-support" },
    { name: "Application for Juror Program", path: "/juror-enrollment" },
    { name: "Respondent Submission Form", path: "/respondent-submission" },
    { name: "Identity Dispute Claim Form", path: "/identity-dispute" },
    { name: "Appeal Request Form", path: "/appeal-request" },
    { name: "Juror Recusal Form", path: "/juror-recusal" },
  ];

  return (
    <DropdownMenu>
      {/* === Trigger element === */}
      <DropdownMenuTrigger className="border border-gray-300 bg-white px-4 py-2 rounded-md text-gray-800 text-sm font-medium hover:bg-gray-100 transition-all">
        {triggerText}
      </DropdownMenuTrigger>

      {/* === Dropdown content === */}
      <DropdownMenuContent className="w-72 bg-white max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Select a Form</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {formOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => router.push(option.path)}
            className="cursor-pointer text-gray-700 hover:bg-red-50"
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FormDropdown;
