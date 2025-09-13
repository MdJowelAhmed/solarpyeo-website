import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Users,
  Gavel,
  FileText,
  Eye,
  Lock,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function GovernanceAndAccountabilityOverview() {
  return (
    <div className="min-h-screen bg-secondary py-12 md:py-16 lg:py-24 container mx-auto">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h3 className="mb-6">
            {/* <Shield className="w-8 h-8" /> */}
            🏛️ Platform Governance & Accountability
          </h3>
          <h4 className="mb-5">
            Welcome to the Governance & Accountability page. This section
            outlines how the Platform is structured, how decisions are made and
            reviewed, and how we protect the ethical, procedural, and legal
            integrity of our community. For the Platform Governance Charter,
            view here
            <Button
              variant="link"
              className="text-blue-600 p-0 h-auto font-normal"
            >
              View Here
            </Button>
          </h4>
        </div>

        {/* Platform Governance Structure */}
        <div>
          <CardHeader>
            <h3 className="">
              {/* <Shield className="w-6 h-6" /> */}
              ⚙️ Platform Governance Structure
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              The Platform operates under a multi-layered governance system,
              composed of:
            </p>

            {/* Governance Bodies */}
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className=" ">
                  <h2 className="font-semibold text-lg">
                    1. Administrative Oversight Board
                  </h2>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Policy development and revision</li>
                    <li>• Oversight of platform operations and security</li>
                    <li>• Ensuring compliance with applicable laws</li>
                    <li>• Reviewing ethical and procedural escalations</li>
                  </ul>
                </div>

                <div className="bg-primary-foreground border-l-4 border-red-700 py-4 rounded-md pl-4">
                  {/* <AlertTriangle className="w-4 h-4 " /> */}
                  <AlertDescription className="font-bold text-black">
                    🛡️ Composed of legal, technology, ethics, and victim
                    advocacy professionals. Updated annually.
                  </AlertDescription>
                </div>

                <div className="">
                  <h3 className="mb-4">2. Moderator Panel</h3>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>
                      • Review submissions for eligibility and completeness
                    </li>
                    <li>• Mediate disputed or ambiguous cases</li>
                    <li>
                      • Facilitate the notice process and redaction of sensitive
                      content
                    </li>
                    <li>
                      • May halt or escalate cases that present safety concerns
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Note:</strong> Moderators do not vote on allegations
                    but ensure fair play and integrity before juror review.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="">
                  <h3 className="">3. Community Jurors</h3>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• Anonymous vetted users selected per case</li>
                    <li>
                      • Subject to Juror Ethics Code, orientation/testing, and
                      background checks
                    </li>
                    <li>
                      • Blind review and majority voting determine allegation
                      status
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-foreground border-l-4 border-red-700 py-4 pl-4 rounded-md">
                  {/* <AlertTriangle className="w-4 h-4 text-red-600" /> */}
                  <AlertDescription className="font-bold text-black">
                    Juror Decisions Are Logged And Auditable By Governance If
                    Formally Challenged.
                  </AlertDescription>
                </div>

                <div className="">
                  <h3 className="">4. Compliance & Safety Team</h3>
                  <ul className="text-gray-600 space-y-1 mt-2">
                    <li>• User privacy and data integrity</li>
                    <li>
                      • Enforcement of platform terms, policies, and ethics
                      rules
                    </li>
                    <li>
                      • Investigation of user reports, misconduct, and abuses
                    </li>
                    <li>• Interface with legal authorities when required</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Decision-Making and Appeals */}
        <div>
          <CardHeader>
            <h3 className="mb-6 gap-2">
              {/* <Gavel className="w-6 h-6" /> */}
              📊 Decision-Making and Appeals
            </h3>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-3">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left font-semibold">Tier</th>
                    <th className="border p-3 text-left font-semibold">
                      Decision Type
                    </th>
                    <th className="border p-3 text-left font-semibold">
                      Authority
                    </th>
                    <th className="border p-3 text-left font-semibold">
                      Appeal Possible?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">1</td>
                    <td className="border p-3">Initial System Rejection</td>
                    <td className="border p-3">Auto-Filter + Moderator</td>
                    <td className="border p-3">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Yes - Moderator Review
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3">2</td>
                    <td className="border p-3">Moderator Decision</td>
                    <td className="border p-3">Moderator Panel</td>
                    <td className="border p-3">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Yes - Governance Appeal Panel
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3">3</td>
                    <td className="border p-3">Juror Verdict</td>
                    <td className="border p-3">Juror Pool</td>
                    <td className="border p-3">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Yes - Community Appeal Process (Limited)
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3">4</td>
                    <td className="border p-3">Governance Override</td>
                    <td className="border p-3">Oversight Board</td>
                    <td className="border p-3">
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Final
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link href="/appeal" variant="outline" className="mt-6 text-blue-500 font-bold">
              {/* <FileText className="w-4 h-4 mr-2" /> */}
            📄 File an Appeal
            </Link>
          </CardContent>
        </div>

        {/* Two Column Layout for remaining sections */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Transparency & Accountability Logs */}
          <div>
            <CardHeader>
              <h3 className="mb-5">
                {/* <Eye className="w-6 h-6" /> */}
               📩 File a Misuse Report Form
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li>
                  • <strong>Moderator Action Logs</strong> - available to
                  internal audit
                </li>
                <li>
                  • <strong>Juror Vote Logs</strong> - anonymized, internally
                  audited only
                </li>
                <li>
                  • <strong>Decision Timeline Records</strong> - visible to both
                  Initiator and Respondent
                </li>
                <li>
                  • <strong>Case Retention & Sealing</strong> - visible to
                  public view
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                All platform users may request a review of moderator conduct or
                governance decisions.
              </p>
              <Link href="/misuse" variant="outline" className="w-full font-bold text-blue-600 underline">
                {/* <FileText className="w-4 h-4 mr-2" /> */}
               📩 File a Misuse Report Form
              </Link>
            </CardContent>
          </div>

          {/* Data Protection & Legal Compliance */}
          <div>
            <CardHeader>
              <h3 className="mb-5">
                {/* <Lock className="w-6 h-6" /> */}
                Data Protection & Legal Compliance
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Jurisdictional compliance with applicable civil and data
                  privacy laws
                </li>
                <li>
                  • Transparent retention policies for submissions and verdicts
                </li>
                <li>
                  • Tamper-resistant evidence locking after juror voting begins
                </li>
                <li>• Secure redaction of sensitive or expired records</li>
              </ul>
              <div className="space-y-2  ">
                <Link href="/privacy" variant="outline" className="w-full font-bold text-blue-600 underline mr-5">
                  {/* <FileText className="w-4 h-4 mr-2" /> */}
                 📩 🛡️ Read the Full Privacy Policy
                </Link>
                <Link href="/terms" variant="outline" className="w-full font-bold text-blue-600 underline">
                  {/* <ExternalLink className="w-4 h-4 mr-2" /> */}
                  📜 View Terms of Use
                </Link>
              </div>
            </CardContent>
          </div>

          {/* Community Feedback & Policy Revision */}
          <div>
            <CardHeader>
              <h3 className="mb-5">
                {/* <MessageSquare className="w-6 h-6" /> */}
                Community Feedback & Policy Revision
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                The Platform is committed to user inclusion in shaping our
                policies.
              </p>
              <div>
                <p className="font-semibold mb-2">
                  Submit Feedback Or Proposed Changes To:
                </p>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• Juror rules</li>
                  <li>• Case types</li>
                  <li>• Moderator behavior</li>
                  <li>• Transparency practices</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                All approved policy revisions are announced with a 7-day public
                notice window and will include archived version history.
              </p>
              <div className="space-y-2 ">
                <Link href="/feedback" variant="outline" className="w-full font-bold text-blue-600 mr-10 underline">
                  {/* <FileText className="w-4 h-4 mr-2" /> */}
                 📝 Submit Policy Feedback Form
                </Link>
                <Link href="/changelog" variant="outline" className="w-full font-bold text-blue-600 underline">
                  {/* <ExternalLink className="w-4 h-4 mr-2" /> */}
                 📚 Browse Governance Change Log
                </Link>
              </div>
            </CardContent>
          </div>

          {/* Ethics Review & Reporting */}
          <div>
            <CardHeader>
              <h3 className="mb-5">
                {/* <AlertTriangle className="w-6 h-6" /> */}
                Ethics Review & Reporting
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Users, jurors, and moderators may confidentially report:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2 text-sm">
                  <div>• Conflicts of interest</div>
                  <div>• Abuse of platform powers</div>
                  <div>• Undue influence or retaliation</div>
                  <div>• Procedural violations</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    All reports are confidential
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    Anonymous submissions are permitted
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                    Confirmed violations result in sanctions or disqualification
                  </div>
                </div>
              </div>
              <Link href="/report" variant="outline" className="w-full font-bold text-blue-600 underline">
                {/* <FileText className="w-4 h-4 mr-2" /> */}
               📩 File a Misuse Report Form
              </Link>
            </CardContent>
          </div>
        </div>

        {/* Governance Charter & Platform Mission */}
        <div>
          <CardHeader>
            <h3 className="">
              {/* <Shield className="w-6 h-6" /> */}
              Governance Charter & Platform Mission
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary-foreground border-l-4 border-red-700 py-4 pl-4 rounded-md">
              <AlertDescription className="text-red-700 font-medium">
                "To Provide A Fair, Confidential, And Structured Digital Record
                System For Matters Of Personal Integrity And Harm, Using Due
                Process, Collective Review, And Ethics-Centered Technology."
              </AlertDescription>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-10">
            <div>
                <Link href="/governance-charter" variant="outline" className="flex-1 font-bold text-blue-600 underline">
                {/* <FileText className="w-4 h-4 mr-2" /> */}
               🔗 Read the current Platform Governance Charter PDF
              </Link>
            </div>
            <div>
              <Link href="/annual-governance-transparency-report" variant="outline" className="flex-1 font-bold text-blue-600 underline">
                
                📋 Annual Governance Transparency Report – 2024
              </Link>
            </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
