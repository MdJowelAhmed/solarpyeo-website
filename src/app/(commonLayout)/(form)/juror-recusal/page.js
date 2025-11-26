"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
// import { useCreateJurorRecusalMutation } from "@/redux/api/jurorRecusalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateJurorRecusalMutation } from "@/redux/featured/jurorRecusal/jurorRecusalApi";

const JurorRecusalForm = () => {
  const router = useRouter();
  const [createJurorRecusal, { isLoading }] = useCreateJurorRecusalMutation();

  const [conflictChecks, setConflictChecks] = useState({
    knowParties: false,
    priorDispute: false,
    socialMedia: false,
    priorJuror: false,
    financialRelationship: false,
    emotionalStress: false,
    otherConflict: false,
  });

  const [recusalReason, setRecusalReason] = useState("");
  const [requestingRecusal, setRequestingRecusal] = useState(false);
  const [otherConflictText, setOtherConflictText] = useState("");
  const [submissionId, setSubmissionId] = useState("690c4267229f0256db9e57b7"); // Replace with actual ID

  const conflictMapping = {
    knowParties: "I personally know the parties in this case",
    priorDispute: "I have worked with or had a prior dispute with either party",
    socialMedia: "I am connected via social media or past relationship with either party",
    priorJuror: "I have previously served as a juror on a related case involving either party",
    financialRelationship: "I have a financial, familial or organizational relationship with either party",
    emotionalStress: "This case presents content that would cause emotional or psychological stress",
    otherConflict: otherConflictText || "Other conflict or concern",
  };

  const handleConflictChange = (key, checked) => {
    setConflictChecks((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    const hasAnyConflict = Object.values(conflictChecks).some((value) => value);
    
    if (!hasAnyConflict) {
      toast.error("Please select at least one conflict to request recusal");
      return;
    }

    if (!requestingRecusal) {
      toast.error("Please confirm that you are requesting recusal");
      return;
    }

    if (!recusalReason.trim()) {
      toast.error("Please provide a reason for recusal");
      return;
    }

    if (conflictChecks.otherConflict && !otherConflictText.trim()) {
      toast.error("Please describe the other conflict");
      return;
    }

    // Build conflict array
    const conflictArray = Object.keys(conflictChecks)
      .filter((key) => conflictChecks[key])
      .map((key) => conflictMapping[key]);

    // Prepare payload
    const payload = {
      conflict: conflictArray,
      reason: recusalReason,
      submittionId: submissionId,
    };

    try {
      const response = await createJurorRecusal(payload).unwrap();
      toast.success("Recusal form submitted successfully!");
      
      // Reset form
      setConflictChecks({
        knowParties: false,
        priorDispute: false,
        socialMedia: false,
        priorJuror: false,
        financialRelationship: false,
        emotionalStress: false,
        otherConflict: false,
      });
      setRecusalReason("");
      setRequestingRecusal(false);
      setOtherConflictText("");
      
      // Redirect to dashboard
      // router.push("/juror-dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit recusal form");
      console.error("Submission error:", error);
    }
  };

  const handleCancel = () => {
    router.push("/juror-dashboard");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-secondary-foreground custom-padding">
        <div className="mb-6">
          <div className=" mb-3">
            <h3 className="">📄 Juror Recusal & Conflict Declaration Form</h3>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto ">
            <div>
              <span className="font-medium">Juror ID:</span> [Auto-generated]
            </div>
            <div>
              <span className="font-medium">Assigned Case Reference ID:</span>{" "}
              [Auto-populated]
            </div>
            <div>
              <span className="font-medium">Case Type:</span> [Major/Minor -
              Appeal] [Auto-populated]
            </div>
          </div>
        </div>

        {/* Section 1: Declare A Conflict Of Interest Or Personal Involvement */}
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">
              Declare a Conflict of Interest or Personal Involvement
            </CardTitle>
            <p className="text-justify">
              Check any applicable boxes so that may impact your ability to
              impartially serve on this case:
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="knowParties"
                  checked={conflictChecks.knowParties}
                  onCheckedChange={(checked) =>
                    handleConflictChange("knowParties", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="knowParties"
                  className="text-gray-700 cursor-pointer"
                >
                  I personally know the parties in this case.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="priorDispute"
                  checked={conflictChecks.priorDispute}
                  onCheckedChange={(checked) =>
                    handleConflictChange("priorDispute", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="priorDispute"
                  className="text-gray-700 cursor-pointer"
                >
                  I have worked with or had a prior dispute with either party.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="socialMedia"
                  checked={conflictChecks.socialMedia}
                  onCheckedChange={(checked) =>
                    handleConflictChange("socialMedia", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="socialMedia"
                  className="text-gray-700 cursor-pointer"
                >
                  I am connected via social media or past relationship with
                  either party.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="priorJuror"
                  checked={conflictChecks.priorJuror}
                  onCheckedChange={(checked) =>
                    handleConflictChange("priorJuror", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="priorJuror"
                  className="text-gray-700 cursor-pointer"
                >
                  I have previously served as a juror on a related case
                  involving either party.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="financialRelationship"
                  checked={conflictChecks.financialRelationship}
                  onCheckedChange={(checked) =>
                    handleConflictChange("financialRelationship", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="financialRelationship"
                  className="text-gray-700 cursor-pointer"
                >
                  I have a financial, familial or organizational relationship
                  with either party.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="emotionalStress"
                  checked={conflictChecks.emotionalStress}
                  onCheckedChange={(checked) =>
                    handleConflictChange("emotionalStress", checked)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="emotionalStress"
                  className="text-gray-700 cursor-pointer"
                >
                  This case presents content that would cause emotional or
                  psychological stress based on my past experiences.
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="otherConflict"
                    checked={conflictChecks.otherConflict}
                    onCheckedChange={(checked) =>
                      handleConflictChange("otherConflict", checked)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="otherConflict"
                    className="text-gray-700 cursor-pointer"
                  >
                    Other conflict or concern:
                  </label>
                </div>

                {conflictChecks.otherConflict && (
                  <Textarea
                    placeholder="Please describe..."
                    value={otherConflictText}
                    onChange={(e) => setOtherConflictText(e.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Section 2: Request Recusal */}
      <div className="bg-secondary custom-padding">
        <div className="p-4 md:p-6 lg:p-8 xl:p-12 mx-auto flex flex-col lg:flex-row items-center border-2 justify-between bg-white rounded-md">
          <CardHeader className="w-full lg:w-1/5">
            <CardTitle className="">Request Recusal</CardTitle>
            <p className="text-justify">
              You must check at least one box above to request recusal from this
              case.
            </p>
          </CardHeader>
          <CardContent className="w-full lg:w-4/5 lg:border-l-4 lg:pl-10">
            <div className="space-y-5">
              <div>
                <label className="font-medium">
                  Reason For Recusal Request: <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Please elaborate..."
                  value={recusalReason}
                  onChange={(e) => setRecusalReason(e.target.value)}
                  className="min-h-[120px] mt-2"
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="requestingRecusal"
                  checked={requestingRecusal}
                  onCheckedChange={setRequestingRecusal}
                  className="mt-1"
                />
                <label
                  htmlFor="requestingRecusal"
                  className="text-gray-700 cursor-pointer"
                >
                  I am requesting a recusal from this case and understand that
                  another juror will be assigned in my place. <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Warning Messages */}
      <div className="bg-secondary custom-padding">
        <div className="bg-primary-foreground border-l-4 border-red-700 rounded-md p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700 leading-relaxed">
              <p>
                <span className="font-medium text-red-800">
                  Failure to disclose a material conflict
                </span>{" "}
                or providing false information that is later discovered can
                result in{" "}
                <span className="font-medium text-red-800">
                  an appeal being brought
                </span>{" "}
                on the grounds that you could not properly adjudicate your
                assignment and can result in{" "}
                <span className="font-medium text-red-800 uppercase">
                  permanent revocation
                </span>
                .
              </p>

              <p className="mt-3">
                <span className="font-medium text-red-800">
                  You may be held liable
                </span>{" "}
                for any costs associated with an appeal if the appeal results in
                the case decision being overturned.{" "}
                <span className="font-medium">Such costs can exceed</span> the
                accrued court fees along with compensation for the lawyers on
                both sides of the case, and{" "}
                <span className="font-medium uppercase">
                  you may be billed by the platform for such fees
                </span>{" "}
                if determined to violate in whole or in part.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container mx-auto flex gap-4 justify-end mb-12">
        <Button 
          onClick={handleSubmit} 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Declaration Form"
          )}
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Return To Juror Dashboard
        </Button>
      </div>
    </div>
  );
};

export default JurorRecusalForm;