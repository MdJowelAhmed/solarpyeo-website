import React from "react";

export default function JurorPipelineOverview() {
  return (
    <div className="">
      {/* Header - Green Badge */}
      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          {/* <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200 mb-6"> */}
          {/* <span className="text-green-600 text-lg font-bold">✓</span> */}
          <h2 className="mb-6 text-2xl lg:text-4xl font-bold text-center">
            ✅ Recommended Placement in the Juror Pipeline
          </h2>
          <h2 className="mb-6 text-xl lg:text-3xl font-semibold text-center">
            User Submits Juror Application & Affidavit
          </h2>
          <div className="">
            <div className="space-y-5">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span className="text-gray-700">
                  Completes eligibility attestations
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span className="text-gray-700">
                  Certifies intent and impartiality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 2 */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              2. Preliminary Review By Moderators Or Automated Filters
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span className="text-gray-700">
                  Ensure applicant meets basic eligibility (account standing,
                  verified account, duplicate accounts, etc.)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span className="text-gray-700">
                  Flag any active allegations for moderator awareness
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span className="text-gray-700">
                  Form is reviewed for completeness and red flags
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="mb-6">
              3. Conditional Approval → Orientation Invitation
            </h3>

            <div className="mb-6">
              <p className=" mb-5">If eligible, user receives each notice:</p>

              <div className="ml-4">
                <div className="flex items-start gap-2">
                  <div className=" ">
                    "Your application has been preliminarily accepted. To
                    complete your enrollment, you must now complete the Juror
                    Orientation and Ethics Test that covers our due process
                    guidelines based below."
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="">
                    "We may perform a background search to determine any
                    criminal history related to fraud, perjury, and other
                    related criminal convictions that may be deemed as a red
                    flag for the Platform's juror program. If your application
                    is denied due to a red-flag from a background check, you may
                    file an appeal, and may still be accepted in the juror
                    program after paying a set deposit ("Juror's Bond"), to the
                    platform."
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-foreground border-l-4 border-red-700 py-4 pl-4 rounded-md">
              <p className="text-sm ">
                The Juror Bond is a partially refundable deposit; 10% of the
                bond is non-refundable to cover administration of the bond while
                the remaining is returned once no longer enrolled on the juror
                program. If the Juror is permanently removed from the juror
                program, the Juror Bond is forfeited.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="mb-6">
              4. Juror Orientation & Ethics Test (Required)
            </h3>

            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Covers:</p>
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Confidentiality & non-disclosure
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">Evidence handling</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">Bias recognition</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Disqualification criteria
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">Voting standards</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-700">
                User must pass with minimum score (e.g. 80%)
              </p>
              <p className="text-gray-700">
                Annual Testing Due by January 31 each year for renewal, retact
                active jurors
              </p>
              <p className="text-gray-700">
                User must pass with minimum score of 90% after first infraction,
                and 100% after second infraction
              </p>
              <p className="text-gray-700">
                On the third infraction, if a Juror does not have a Juror Bond,
                a Juror will be required to pay to the platform a Juror Bond. On
                the fourth infraction, the Juror will be permanently removed
                from the juror program and forfeits the Juror Bond.
              </p>
              <p className="text-gray-700">If a Juror oper</p>
            </div>

            <div className="bg-primary-foreground border-l-4 border-red-700 py-4 pl-4 rounded-md">
              <p className="text-sm ">
                ⚠️ If a Juror operates with a Juror Bond, said Juror will be
                permanently removed from the juror program and forfeits the
                Juror Bond after the first infraction.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="mb-6">
              5. Full Enrollment Confirmed → Added To Juror Pool
            </h3>

            <div className="space-y-2">
              <p className="text-gray-700 mb-3">Only after passing test:</p>
              <div className="space-y-2 ml-4">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Can now be randomly assigned to review cases
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Can see their juror status reflected on their dashboard
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Other Users can see a Juror's active status
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span className="text-gray-700">
                    Once a Juror has completed at least 50 cases, users will see
                    varying badges on a Juror's profile based on the number of
                    completed cases.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
