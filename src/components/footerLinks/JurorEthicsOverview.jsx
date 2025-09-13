import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Shield,
  Users,
  FileText,
  Eye,
  UserX,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const JurorEthicsOverview = () => {
  return (
    <div className="">
      <div className=" mx-auto">
        {/* Header */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Juror Ethics & Responsibilities
            </h2>
            <p className="">
              Welcome to the <strong>Juror Ethics Page</strong>, a training code
              of conduct for all participants in the Platform's ethics oversight
              review process. As a juror, you're entrusted with confidential
              sensitive information that impacts regulations, safety, and
              fairness. Your duty by accessing justice within the Platform's
              community.
            </p>
          </div>
        </div>

        {/* Section 1: Core Juror Values */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <div className="">
                {/* <Shield className="h-5 w-5 text-red-600" /> */}
                <h3 className="">🧭 SECTION 1: Core Juror Values</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                All jurors must commit to the following ethical values:
              </p>
              <div className="grid gap-4 md:grid-cols-1">
                <div className="space-y-5">
                  <p>
                    <strong className="">• Impartiality:</strong>
                    You must approach each case with neutrality, free from bias,
                    personal interests, or external influence.
                  </p>
                  <p>
                    <strong className="f">• Confidentiality:</strong>
                    All case materials and discussions are strictly confidential
                    and should not be shared with anyone outside the jury panel.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <strong>• Diligence:</strong>
                    You are expected to review all materials carefully before
                    voting. Do not rush or skim case-type submissions.
                  </div>
                  <div>
                    <strong>• Accountability:</strong>
                    You are responsible for your conduct and decisions and must
                    be prepared to justify your vote ethically, if reviewed.
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 2: Prohibited Conduct */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="">
              <div className="mb-6">
                {/* <UserX className="h-5 w-5 text-orange-600" /> */}
                <h3 className="">📜 SECTION 2: Prohibited Conduct</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Any of the following behaviors may result in disqualification
                from the juror pool, loss of platform privileges, or formal
                sanctions:
              </p>
              <div className="grid gap-2 text-sm text-gray-700">
                <div>
                  • Participating in a case involving a personal relationship,
                  past case, or known party.
                </div>
                <div>
                  • Using external resources or seeking to influence your vote.
                </div>
                <div>• Colluding or communicating with other jurors.</div>
                <div>
                  • Revealing case details, votes, or juror ID to any person
                  (except during secure communications with an active Moderator
                  or platform administrator).
                </div>
                <div>
                  • Casting a vote without reviewing all presented evidence and
                  testimony.
                </div>
                <div>
                  • Voting dishonestly, carelessly, or with bias in a case.
                </div>
                <div>
                  • Ignoring a filed conflict of interest or failing to recuse
                  when appropriate.
                </div>
                <div>
                  • Attempting to identify or retaliate against parties in a
                  case.
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 3: Juror Oath */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="">
              <div className="">
                {/* <FileText className="h-5 w-5 text-purple-600" /> */}
                <h3 className="">SECTION 3: Juror Oath</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className=" mb-4 font-medium">
                Every juror must agree to the following oath before each round
                of service:
              </p>
              <div className="">
                <p className="bg-primary-foreground border-l-4 border-red-700 pl-4 rounded-md py-4">
                  "I solemnly affirm that I will execute this task with fairness
                  and adhere to Standards. I will respect the identity of all
                  parties, protect the confidentiality of this process, and
                  render my most well-based duty on the merits of the evidence
                  presented. I understand that my actions have real
                  consequences, and I pledge the utmost care required to the
                  jury process, case."
                </p>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 4: Recusal & Conflict Disclosure */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="">
              <div className="">
                {/* <AlertTriangle className="h-5 w-5 text-yellow-600" /> */}
                <h2 className="mb-6">
                  SECTION 4: Recusal & Conflict Disclosure
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Jurors <strong>Must Recuse</strong> themselves or file a
                conflict declaration if any of the following are true:
              </p>
              <div className="space-y-5 text-sm text-gray-700 mb-4">
                <div>
                  • You know or recognize any party involved in the case.
                </div>
                <div>
                  • You have a financial or personal interest in the case's
                  outcome.
                </div>
                <div>
                  • You have a bias or opinion about the general subject matter
                  that may interfere with neutrality.
                </div>
                <div>
                  • You do not have the emotional or mental bandwidth to review
                  the materials responsibly.
                </div>
              </div>
              <div className="  ">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  ► File Juror Recusal Or Conflict Declaration ►
                </a>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 5: Ethics Test Requirement */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                {/* <FileText className="h-5 w-5 text-pink-600" /> */}
                <h3 className="mb-5">SECTION 5: Ethics Test Requirement</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Before serving, all jurors must:
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div>
                  • Complete the <strong>Juror Orientation</strong> module
                </div>
                <div>
                  • Pass the <strong>Juror Ethics & Conduct Test</strong> (80%
                  or higher)
                </div>
                <div>• Re-certify every 12 months or as requested</div>
                <div>• Re-verify at each half-decade interval</div>
              </div>
              <p className="text-red-600 text-sm font-medium">
                Non-compliance results in automatic suspension from the juror
                pool.
              </p>
            </CardContent>
          </div>
        </div>

        {/* Section 6: Platform Protections */}
        <div className="bg-secondary py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-700">
                  SECTION 6: Platform Protections For Jurors
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                To ensure your safety and impartiality:
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div>
                  • Juror identities are permanently masked from all users.
                </div>
                <div>
                  • Juror logs are stored securely and only accessible for
                  system administrators.
                </div>
                <div>
                  • Any threat, contact attempt, or retaliation will result in
                  severe sanctions and possible legal referral.
                </div>
              </div>
              <div className="">
                <Link href="#" className="text-blue-600 font-medium underline">
                  🛡️ Permanently Withdrawn From Juror Program
                </Link>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Section 7: Violations & Consequences */}
        <div className="bg-secondary-foreground py-12 md:py-16 lg:py-24">
          <div className="container mx-auto">
            <CardHeader className="pb-4">
              <div className="">
                {/* <AlertTriangle className="h-5 w-5 text-red-600" /> */}
                <h3 className="mb-6">
                  SECTION 7: Violations & Consequences
                </h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Violation of these ethics guidelines may lead to:
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div>• Platform sanctions, which may include fines</div>
                <div>• Suspension or permanent ban from platform services</div>
                <div>
                  • Temporary or permanent suspension from juror service
                </div>
                <div>
                  • Record placement on{" "}
                  <strong>Juror Misconduct Register</strong> (internal)
                </div>
                <div>
                  • Loss of platform privileges (including suspension rights)
                </div>
                <div>
                  • Referral to legal or safety authorities if misconduct is
                  severe
                </div>
              </div>
              <p className="">
                Non-compliance results in automatic suspension from the juror
                pool.
              </p>
            </CardContent>
          </div>
        </div>

        {/* Questions Section */}
       <div className="bg-secondary py-12 md:py-16 lg:py-24">
         <div className="container mx-auto">
          <CardHeader className="">
            <div className="">
              {/* <HelpCircle className="h-5 w-5 text-gray-600" /> */}
              <h3 className="mb-6">
                🤔 QUESTIONS OR ETHICS CONCERNS?
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-5">
              If you suspect unethical behavior from another juror or believe a
              case was compromised:
            </p>
            <div className="space-y-5 flex gap-10">
              <div className="flex ">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  🚨 Report Juror Misconduct
                </a>
              </div>
              <div className="flex ">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  📋 Request Confidential Ethics Review
                </a>
              </div>
            </div>
          </CardContent>
        </div>
       </div>
      </div>
    </div>
  );
};

export default JurorEthicsOverview;
