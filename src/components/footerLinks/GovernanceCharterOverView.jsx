import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, Users, Gavel, Eye, Settings } from "lucide-react";

const GovernanceCharterOverview = () => {
  return (
    <div className="bg-secondary py-12 md:py-16 lg;py-24 px-4">
      {/* Main Content */}
      <main className=" ">
        {/* Title Section */}
        <div className="container mx-auto mb-5">
          <h3 className="">Platform Governance Charter</h3>
          <div className="text-sm text-slate-600 space-y-1">
            <p>Platform: Glass File | Version 1.0 | Created: January 2024</p>
            <p>Platform Name: Glass File</p>
          </div>
        </div>

        {/* Section 1.0 - Purpose and Mandate */}
        <div>
          <div className="container mx-auto mb-8">
            <CardHeader className="">
              <h3 className="">
                {/* <Shield className="w-5 h-5" /> */}
                <span>SECTION 1.0 — PURPOSE AND MANDATE</span>
              </h3>
            </CardHeader>
            <CardContent className=" space-y-6">
              <div>
                <h2 className="font-semibold mb-3 text-xl ">
                  1.1 Statement Of Purpose
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  This Platform Governance Charter establishes the governance
                  framework for the Glass File platform. It outlines the
                  structures, processes, and principles that guide platform
                  operations, ensuring transparency, accountability, and
                  effective decision-making. The platform is committed to
                  maintaining the highest standards of integrity while serving
                  our community and stakeholders through innovative file
                  management solutions.
                </p>
              </div>

              {/* <Separator /> */}

              <div>
                <h2 className="font-semibold mb-3 text-xl ">1.2 Mandate</h2>
                <p className="mb-4">
                  The platform shall fulfill the following core mandates:
                </p>
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <p className="text-sm text-slate-600">
                        1. Establish and maintain platform governance standards
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <p className="text-sm text-slate-600">
                        2. Ensure compliance with regulatory requirements and
                        industry best practices
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <p className="text-sm text-slate-600">
                        3. Promote transparency in platform operations and
                        decision-making processes
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <p className="text-sm text-slate-600">
                        4. Facilitate stakeholder engagement and community
                        participation
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <p className="text-sm text-slate-600">
                        5. Maintain data privacy, security, and user
                        confidentiality standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-3 text-xl ">
                  1.3 Binding Authority
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  All platform users, jurors, moderators, and governance
                  personnel agree to be bound by this Charter, and no platform
                  participant shall be exempt from its procedures unless
                  compelled by applicable law. In the event of a conflict
                  between internal platform rules and this Charter, the Charter
                  shall prevail
                </p>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 2.0 - Governance Structure */}
        <div className="container mx-auto mb-8">
          <CardHeader>
            <h3 className="mb-5">
              <span>SECTION 2.0 — GOVERNANCE STRUCTURE</span>
            </h3>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 2.1 Organizational Chart of Authority */}
            <div>
              <h2 className="font-semibold mb-3 text-lg">
                2.1 Organizational Chart of Authority
              </h2>

              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>
                  The governance structure is organized hierarchically to ensure
                  clear lines of authority and accountability:
                </li>
                <li>
                  Executive Board (Strategic oversight and policy governance)
                </li>

                <li>
                  Platform Management Team (Operational leadership and
                  execution)
                </li>

                <li>
                  Technical Advisory Committee (Technical guidance and
                  standards)
                </li>
                <li>
                  Security and Compliance Office (Risk management and regulatory
                  compliance)
                </li>
                <li>
                  Community Relations Board (Stakeholder engagement and user
                  advocacy)
                </li>

                <li>
                  Independent Audit Committee (Oversight and performance
                  monitoring)
                </li>
              </ul>
            </div>

            {/* <Separator /> */}

            {/* 2.2 Oversight Board Composition And Powers */}
            {/* 2.2 Oversight Board Composition And Powers */}
            <div>
              <h2 className="font-semibold mb-3 text-lg">
                2.2 Oversight Board Composition and Powers
              </h2>
              <p className="mb-4 text-slate-700">
                The Oversight Board shall be composed of a minimum of
                three (3) and no more than seven (7) members, each
                appointed for a two-year renewable term. The Board shall:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>Strategic direction setting</li>
                <li>Policy approval and oversight</li>
                <li>Performance monitoring</li>
                <li>Risk assessment and mitigation</li>
                <li>Stakeholder representation</li>
              </ul>
            </div>

            {/* 2.3 Moderator Panel Responsibilities */}
            <div>
              <h2 className="font-semibold mb-3 text-lg">
                2.3 Moderator Panel Responsibilities
              </h2>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>Strategic direction setting</li>
                <li>Policy approval and oversight</li>
                <li>Performance monitoring</li>
                <li>Risk assessment and mitigation</li>
                <li>Stakeholder representation</li>
              </ul>
            </div>

            {/* 2.4 Juror Corps Responsibilities */}
            <div>
              <h2 className="font-semibold mb-3 text-lg">
                2.4 Juror Corps Responsibilities
              </h2>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>Strategic direction setting</li>
                <li>Policy approval and oversight</li>
                <li>Performance monitoring</li>
                <li>Risk assessment and mitigation</li>
                <li>Stakeholder representation</li>
              </ul>
            </div>
          </CardContent>
        </div>

        {/* Section 3.0 - Case Work Procedures */}
        <div className="container mx-auto mb-8">
          <CardHeader className="">
            <h3 className="mb-5">
              {/* <Gavel className="w-5 h-5" /> */}
              <span>SECTION 3.0 — CASEWORK PROCEDURES</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="font-semibold text-xl mb-5 text-slate-900">
                3.1 Case Lifecycle Phases
              </h2>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>Initial System Review</li>
                <li>Moderator Eligibility Review</li>
                <li>Notice to Accused (if applicable)</li>
                <li>Juror Pool Assignment</li>
                <li>Blind Voting Process</li>
                <li>Verdict Issuance</li>
                <li>Appeals Phase (optional)</li>
                <li>Case Closure</li>
              </ul>
            </div>

            {/* <Separator /> */}

            <div>
              <h2 className="font-semibold mb-5 text-xl text-slate-900">
                3.2 Verdict Classifications
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>Verified Proven (VP):</strong> 100% of assigned jurors concur that the evidence is clear and convincing against the Respondent.
                </li>
                <li>
                  <strong>Allegation Not Disproven (AND):</strong> Majority of assigned jurors concur the evidence is clear and convincing against the Respondent.
                </li>
                <li>
                  <strong>Duly Disproven (DD):</strong> 100% of assigned jurors concur that the evidence is clear and convincing against the Initiator.
                </li>
                <li>
                  <strong>Withdrawn (WD):</strong> Initiator voluntarily withdraws case prior to Form 007 Issuance.
                </li>
                <li>
                  <strong>Withdrawn (WDN):</strong> Initiator voluntarily withdraws case after Form 007 issued and sent to Respondent.
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold mb-5 text-xl text-slate-900">
                3.3 Case Record Retention
              </h2>
              <p className="text-slate-700">
                See Section 6.0 for detailed record retention classifications and durations.
              </p>
            </div>
          </CardContent>
        </div>

        {/* Section 4.0 - Ethical Standards */}
        <div className="container mx-auto mb-8">
          <CardHeader className="">
            <h3 className="mb-5">
              {/* <Eye className="w-5 h-5" /> */}
              <span>SECTION 4.0 — ETHICAL STANDARDS</span>
            </h3>
          </CardHeader>
          <CardContent className=" space-y-6">
            <div>
              <h2 className="font-semibold mb-5text-xl text-slate-900">
                4.1 Ethical Principles
              </h2>
              <p className=" mb-4">
                All operations are to be executed with the highest ethical regard and commitment to:
              </p>
              <ul className="space-y-4 list-disc list-inside text-slate-700">
                <li>Procedural fairness</li>
                <li>Non-retaliation enforcement</li>
                <li>Privacy and dignity of participants</li>
                <li>Equitable access and unbiased decision-making</li>
              </ul>
            </div>

            {/* <Separator /> */}

            <div>
              <h2 className="font-semibold mb-3 text-xl text-slate-900">
                4.2 Juror Conduct
              </h2>
              <p className=" mb-4">Jurors shall:</p>
              <ul className="space-y-4 list-disc list-inside text-slate-700">
                <li>Abstain from external communication about the case.</li>
                <li>Declare conflicts of interest prior to vote.</li>
                <li>Submit justification for vote to internal log system.</li>
              </ul>
            </div>

            {/* <Separator /> */}

            <div>
              <h2 className="font-semibold mb-3 text-xl text-slate-900">
                4.3 Moderator Conduct
              </h2>
              <p className="mb-4">Moderators shall:</p>
              <ul className="space-y-4 list-disc list-inside text-slate-700">
                <li>Operate neutrally, with no communication with affected parties.</li>
                <li>Avoid collecting data beyond what was submitted.</li>
                <li>Log all decisions, redactions, and rejections.</li>
              </ul>
            </div>
          </CardContent>
        </div>

        {/* Section 5.0 - Review, Appeal, and Sanctions */}
        <div className="container mx-auto mb-8">
          <CardHeader className="">
            <h3 className="mb-5">
              {/* <Settings className="w-5 h-5" /> */}
              <span>SECTION 5.0 — REVIEW, APPEAL, AND SANCTIONS</span>
            </h3>
          </CardHeader>
          <CardContent className=" space-y-6">
            <div>
              <h2 className="font-semibold mb-5 text-lg text-slate-900">
                5.1 Appeal Channels
              </h2>
              <p className=" mb-4">
                Each user has the right to appeal under the following structure:
              </p>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <span className="">1</span>
                  <p className="text-sm text-slate-700">
                    Tier I: Rejected submissions → Oversight Board
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="">2</span>
                  <p className="text-sm text-slate-700">
                    Tier II: Juror verdicts → Peer Appeal Panel (random 3-juror reassignment)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="">3</span>
                  <p className="text-sm text-slate-700">
                    Tier III: Juror misconduct or legal breach → Compliance Division
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="">4</span>
                  <p className="text-sm text-slate-700">
                    Tier IV: Charter violation or systemic issue → Oversight Board
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold mb-5 text-lg text-slate-900">
                5.2 Sanctions And Disciplinary Authority
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="">1</span>
                  <p className="text-sm text-slate-700">
                    False submissions → user strike, suspension
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="">2</span>
                  <p className="text-sm text-slate-700">
                    Juror misconduct → expulsion, retroactive nullification of vote
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="">3</span>
                  <p className="text-sm text-slate-700">
                    Moderator abuse → termination of role, logged infraction
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Section 6.0 - Record Retention and Sealing */}
        <div className="mb-8 container mx-auto">
          <CardHeader className="">
            <h3 className="">
              {/* <FileText className="w-5 h-5" /> */}
              <span>SECTION 6.0 — RECORD RETENTION AND SEALING</span>
            </h3>
          </CardHeader>
          <CardContent className=" space-y-6">
            <div>
              <h2 className="font-semibold mb-5 text-xl">
                6.1 Allegation Record Retention
              </h2>
              <ul className="space-y-5 list-disc list-inside ">
                <li>Allegations not proven: stored for 2 years</li>
                <li>Rejected submissions: stored for 30 days</li>
                <li><strong>"WD" & "WDN":</strong> stored for 12 months</li>
                <li>Rejection logs and Form 007: stored indefinitely</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold mb-5 text-xl text-slate-900">
                6.2 Verified Record Retention
              </h2>
              <ul className="space-y-5 list-disc list-inside text-slate-700">
                <li>All <strong>"VP", "DD", And "AND"</strong> records: retained indefinitely</li>
                <li>May be sealed upon verified court order or expungement approval</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold mb-5 text-xl text-slate-900">
                6.3 Juror Voting Logs
              </h2>
              <ul className="space-y-5 list-disc list-inside text-slate-700">
                <li>Stored permanently for audit and internal ethics review</li>
                <li>Not publicly accessible</li>
              </ul>
            </div>
          </CardContent>
        </div>

        {/* Section 7.0 - Charter Amendment & Transparency */}
        <div className="mb-8 container mx-auto">
          <CardHeader className="">
            <h3 className="">
              {/* <Users className="w-5 h-5" /> */}
              <span>SECTION 7.0 — CHARTER AMENDMENT & TRANSPARENCY</span>
            </h3>
          </CardHeader>
          <CardContent className=" space-y-6">
            <div>
              <h2 className="font-semibold mb-5 text-xl">
                7.1 Amendment Process
              </h2>
              <div className="space-y-5">
                <p className="text-slate-700">1. Proposals may originate from:</p>
                <div className="ml-4 space-y-3">
                  <p className="text-sm text-slate-600">a. the Oversight Board</p>
                  <p className="text-sm text-slate-600">b. Verified Users</p>
                </div>
                <p className="text-slate-700">2. <strong>Requires 7-Day Public Comment Period</strong></p>
                <p className="text-slate-700">3. <strong>Adoption By</strong></p>
                <div className="ml-4 space-y-3">
                  <p className="text-sm text-slate-600">• Majority Verified Users vote</p>
                  <p className="text-sm text-slate-600">• Majority Oversight Board vote</p>
                </div>
              </div>
            </div>

            {/* <Separator /> */}

            <div>
              <h2 className="font-semibold mb-5 text-xl">
                7.2 Public Reporting Obligations
              </h2>
              <div className="space-y-5">
                <div className="flex items-start space-x-5">
                  <span className="">1</span>
                  <p className="text-sm text-slate-700">Data Breaches</p>
                </div>
                <div className="flex items-start space-x-5">
                  <span className="">2</span>
                  <p className="text-sm text-slate-700">Annual governance report</p>
                </div>
                <div className="flex items-start space-x-5">
                  <span className="">3</span>
                  <p className="text-sm text-slate-700">Public audit summaries</p>
                </div>
                <div className="flex items-start space-x-5">
                  <span className="">4</span>
                  <p className="text-sm text-slate-700">Statistics on verdicts, appeals, and reversal rates</p>
                </div>
                <div className="flex items-start space-x-5">
                  <span className="">5</span>
                  <p className="text-sm text-slate-700">Legal Disclosures, except when prohibited or sanctioned:</p>
                </div>
                <div className="ml-8 space-y-3">
                  <p className="text-xs text-slate-600">a. Responses to Law Enforcement inquires</p>
                  <p className="text-xs text-slate-600">b. Court Orders served to the Platform</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Section 8.0 - Definitions */}
        <div className="mb-8 container mx-auto">
          <CardHeader className="">
            <h3 className="mb-5">
              {/* <FileText className="w-5 h-5" /> */}
              <span>SECTION 8.0 — DEFINITIONS</span>
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-1 gap-4">
              <div className="space-y-5 text-sm">
                <div>
                  <strong>1. Allegation:</strong> A user-submitted claim of misconduct, supported by documentation.
                </div>
                <div>
                  <strong>2. Allegation Not Disproven (AND):</strong> A partial juror consensus that an allegation cannot be refuted.
                </div>
                <div>
                  <strong>3. Appeal:</strong> Request to reconsider a verdict or decision.
                </div>
                <div>
                  <strong>4. Compliance Division:</strong> Internal agency enforcing ethics and compliance.
                </div>
                <div>
                  <strong>5. Duly Disproven (DD):</strong> Final status that confirms the accusation is invalid or contradicted.
                </div>
                <div>
                  <strong>6. Juror:</strong> A verified user enrolled in the Juror Program and trained in ethical deliberation.
                </div>
                <div>
                  <strong>7. Juror Bond:</strong> A deposit paid to the Platform for the Juror to be permitted to be at risk of liability due to background check returns, or failures to maintain good standing as a Juror.
                </div>
                <div>
                  <strong>8. Juror Conflict Declaration:</strong> A self-reported conflict of interest.
                </div>
                <div>
                  <strong>9. Juror Ethics Test:</strong> Required training assessment for jurors.
                </div>
                <div>
                  <strong>10. Moderator:</strong> A platform officer assigned to screen and review submissions for eligibility.
                </div>
                <div>
                  <strong>11. Notice To Respondent:</strong> Official initial communication issued to a person alleged as the offender named in a case. Found on Form 007.
                </div>
                <div>
                  <strong>12. Oversight Board:</strong> Highest adjudicatory body within the Platform.
                </div>
                <div>
                  <strong>13. Seal/Expunge:</strong> Record is hidden or deleted following valid procedures.
                </div>
                <div>
                  <strong>14. Record:</strong> Finalized entry in the Platform's case archive.
                </div>
                <div>
                  <strong>15. Verdict:</strong> Final classification assigned to a case based on juror consensus.
                </div>
                <div>
                  <strong>16. Verified Proven (VP):</strong> A unanimous panel agrees on evidence of misconduct.
                </div>
                <div>
                  <strong>17. Withdrawn (WD):</strong> Status assigned to a case voluntarily ended by the Initiator.
                </div>
                <div>
                  <strong>18. Withdrawn; Notice Sent To Respondent (WDN):</strong> Status assigned to a case voluntarily ended by the submitter after the Notice to Accused was sent, regardless of proof or delivery.
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </main>
    </div>
  );
};

export default GovernanceCharterOverview;