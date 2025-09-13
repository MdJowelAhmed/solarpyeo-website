import React from "react";

export default function JurorProtocolOverview() {
  return (
    <div className="bg-secondary py-12 md:py-16 lg:py-24">
      {/* Header */}
      <div className="bg-secondary py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="">⚖️ Juror Protocol</h1>
          </div>

          {/* Pink Alert Box */}
          <div className="bg-primary-foreground border-l-4 border-red-700 p-4 rounded mb-8">
            <p className="text-red-800 text-sm">
              Applies to all individuals participating as peer reviewers
              ("Jurors") on the Platform
            </p>
          </div>

          {/* Section 1: Purpose of Jurors */}
          <div className="">
            <h2 className="text-2xl font-semibold mb-6 text-center gap-2">
              {/* <span className="text-red-600">✓ 1.</span> */}
              <span className="">Purpose Of Jurors</span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Jurors are trusted community members empowered to evaluate
                submitted claims — including romantic misconduct, infidelity,
                emotional/psychological abuse allegations, or uploaded court
                documents — and to vote on whether the evidence supports or
                disproves the claim.
              </p>
              <p>
                Jurors serve as neutral fact-finders and must follow strict
                ethical, procedural, and evidentiary guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 2: Juror Eligibility Criteria */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="mb-6">✅ 2. Juror Eligibility Criteria</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Be at least 21 years of age</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Have no direct or indirect relationship with either party
                  involved in the case
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Have passed a juror orientation and ethics test</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Have maintained good standing on the platform</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Agree to full confidentiality and abstain from external
                  discussion of any case
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Oath of Impartiality */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h3 className="mb-6">🔐 3. Oath of Impartiality</h3>
            <div className="space-y-4 text-gray-700">
              <p>Before participating in each case, a juror must affirm:</p>
              <div className="bg-primary-foreground border-l-4 border-red-700 py-4 pl-4 rounded">
                <p className="text-red-800 text-sm italic">
                  "I swear or affirm that I will review the evidence in this
                  case impartially and in good faith, without bias or
                  favoritism, and that I will keep all details confidential
                  unless lawfully required to disclose them."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Case Review Workflow */}
        <div className="bg-gray-100 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-600">🔍 4.</span>
            <span className="text-red-600">Case Review Workflow</span>
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>Each case proceeds through the following steps:</p>

            <div>
              <p className="font-semibold mb-2">Step 1: Assignment</p>
              <div className="ml-4 space-y-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    Jurors are randomly and anonymously assigned to a panel
                    (e.g., 3 members)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Jurors are shown only anonymized names and IDs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    Each panel member has a 24-72 hour window, dependent on
                    Standard or Expedited submission terms, to review and vote
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Step 2: Evidence Review</p>
              <div className="ml-4 space-y-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>A factual summary of the allegation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Uploaded documents (with redactions for privacy)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Initiator's written statement</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>Respondent's rebuttal, evidence, or "Silence"</span>
                </div>
              </div>
            </div>

            <div className="bg-red-100 border border-red-200 p-4 rounded mt-4">
              <p className="text-red-800 text-sm">
                "Silence" is the Respondent's verified appearance after notice
                with the choice to take no action in the case.
              </p>
            </div>

            <div className="mt-4">
              <p>Jurors must review:</p>
              <div className="ml-4 space-y-1">
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    The credibility of documentation from both parties
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    Whether proof supports the claim (e.g., texts, timestamps,
                    orders)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Voting & Outcomes */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-600">🗳️ 5.</span>
            <span className="text-red-600">Voting & Outcomes</span>
          </h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold">
                    Option
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">
                    <span className="text-green-600 font-semibold">
                      ✓ Verified
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-gray-700">
                    Clear evidence supports the claim beyond reasonable doubt
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3">
                    <span className="text-red-600 font-semibold">
                      ✗ Disproven
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-gray-700">
                    Clear evidence disproves the claim beyond reasonable doubt
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">
                    <span className="text-gray-600 font-semibold">
                      ○ Unable to Decide
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-gray-700">
                    Insufficient information provided
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p className="font-semibold mb-3">Voting Requirements:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Decision
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Votes
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Record on
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="text-green-600 font-semibold">
                        ✓ Verified
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      100% voted as Verified
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      Respondent
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <span className="text-yellow-600 font-semibold">
                        ⚠ Not Disproven
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      Majority voted as Verified
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      Respondent
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">
                      <span className="text-red-600 font-semibold">
                        ✗ Disproven
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      100% voted as Disproven
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      Initiator
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      <span className="text-gray-600 font-semibold">
                        ○ Unable to Decide
                      </span>
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      Votes did not meet any final decision criteria
                    </td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      N/A
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 6: Rules of Conduct */}
        <div className="bg-gray-100 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-red-600">🛡️ 6.</span>
            <span className="text-red-600">Rules Of Conduct</span>
          </h3>

          <div className="mb-4">
            <p className="text-gray-700 font-semibold mb-3">Jurors must:</p>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Remain anonymous throughout the process</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Refrain from researching parties outside the provided material
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Not discuss the case with any external party (including other
                  jurors)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Disclose immediately if they recognize any party involved
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Abstain from voting if emotionally compromised or biased
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Report unauthorized attempted contact from parties</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-700 font-semibold mb-3">
              Violation May Result In:
            </p>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Immediate removal from the jury pool</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Account suspension</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Legal consequences depending on the nature of the breach
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Confidentiality Agreement */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-pink-600">🔒 7.</span>
            <span className="text-red-600">Confidentiality Agreement</span>
          </h3>

          <div className="space-y-4 text-gray-700">
            <p>Jurors agree to the following:</p>
            <div className="bg-red-100 border border-red-200 p-4 rounded">
              <p className="text-red-800 text-sm">
                "I understand that all information I receive while serving as a
                juror is confidential and must not be copied, shared, discussed,
                or stored outside of this Platform. I understand that violations
                may result in civil penalties, legal action, and/or platform
                bans."
              </p>
            </div>
          </div>
        </div>

        {/* Section 8: Compensation */}
        <div className="bg-gray-100 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-600">💰 8.</span>
            <span className="text-red-600">Compensation</span>
          </h3>

          <div className="space-y-3 text-gray-700">
            <p>
              Jurors may receive a <strong>Small Honorarium</strong> or{" "}
              <strong>Platform Credit</strong> for each case reviewed and voted
              on time, based on:
            </p>
            <div className="space-y-1 ml-4">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Juror rank</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Juror reputation tier</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>
                  Submission tier (Expedited submissions are valued double)
                </span>
              </div>
            </div>
            <p className="mt-3">
              Payouts are processed per review cycle and may be forfeited in
              cases of verified misconduct.
            </p>
          </div>
        </div>

        {/* Section 9: Juror Records & Quality Control */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-600">📊 9.</span>
            <span className="text-red-600">
              Juror Records & Quality Control
            </span>
          </h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                Juror has an internal reputation score based on participation
                and strikes
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                Votes are stored anonymously but may be audited internally
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                Jurors who receive a strike may be suspended or retrained, which
                may affect the Juror's rank. Strikes will remain on Juror's
                internal record
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                Based on the case participation per strikes ratio, a Juror may
                not be eligible for honorarium or platform credits
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                If a Juror reputation score becomes too low, a Juror may be
                required to pay a set deposit ("Juror Bond") to the platform to
                continue juror enrollment in the platform Juror program.
              </span>
            </div>
          </div>
        </div>

        {/* Section 10: Appeals & Overrides */}
        <div className="bg-gray-100 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-600">🔄 10.</span>
            <span className="text-red-600">Appeals & Overrides</span>
          </h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                If new evidence arises, the case may be reopened with a new jury
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>
                A separate panel may overrule the original decision upon a filed
                appeal request
              </span>
            </div>
          </div>
        </div>

        {/* Final Acknowledgment */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-orange-600">📝</span>
            <span className="text-red-600">Final Acknowledgment</span>
          </h3>

          <div className="space-y-4 text-gray-700">
            <p>
              Before beginning each case, jurors must agree before viewing case
              materials:
            </p>
            <div className="bg-red-100 border border-red-200 p-4 rounded">
              <p className="text-red-800 text-sm">
                "I understand and accept the rules and obligations of jury
                service on this platform. I will act impartially, respectfully,
                and confidentially."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
