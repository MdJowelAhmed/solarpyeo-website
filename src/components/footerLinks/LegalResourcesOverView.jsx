import React from "react";

export default function LegalResourcesOverView() {
  return (
    <div className="container mx-auto py-12 md:py-16 lg:py-24 px-4 bg-secondary">
      {/* Header */}
      <div className="">
        <h3 className="">
          Legal Resources & External Reporting
        </h3>
        <h3 className=" mb-6">Overview</h3>
        <p className="text-sm text-left mb-8">
          While the Platform provides structured tools for community-based
          accountability and digital records regarding interpersonal
          misconduct, we recognize that certain matters require or are better
          served by formal legal intervention or external reporting. This page
          is dedicated to assisting users in identifying when and how to
          engage legal systems, governmental agencies, or external advocacy
          groups.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: When To Seek Legal Assistance */}
        <div className="">
          <h3 className="mb-6">
            Section 1: When To Seek Legal Assistance
          </h3>
          <p className=" mb-6">
            The Platform is not a substitute for law enforcement, courts, or
            licensed legal counsel. You should consider contacting a licensed
            attorney or appropriate agency if:
          </p>
          
          <div className="space-y-5 mb-6">
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">You are in Immediate Danger</span>
                <span className="text-gray-700"> or experiencing ongoing harassment or violence.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">You are seeking a Protective Order</span>
                <span className="text-gray-700"> through your local court.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">You wish to File Criminal Charges</span>
                <span className="text-gray-700"> or initiate civil proceedings (e.g., defamation, restraining orders, custody, harassment, etc.).</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">You require legal advice</span>
                <span className="text-gray-700"> regarding your rights, obligations, or defenses.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="text-gray-700">You believe your rights have been violated in ways not addressed by the Platform (e.g., discrimination, stalking, coercion).</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Resources For Legal Help:
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span>•</span>
                <a href="https://www.americanbar.org/groups/legal_services/flh-home/flh-bar-directories-and-lawyer-finders" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
                  American Bar Association (ABA) Lawyer Referral Directory
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <a href="https://www.lsc.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
                  Legal Aid Services By State
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <a href="https://victimbar.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
                  National Crime Victim Bar Association
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Emergency & Protective Services */}
        <div className="">
          <h3 className="mb-6">
            Section 2: Emergency & Protective Services
          </h3>
          <p className="mb-6 font-semibold">
            If You Or Someone You Know Is In Crisis, The Following Agencies
            Can Provide Direct Support:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">911 (U.S. Emergency Services)</span>
                <span className="text-gray-700"> – For immediate threats or danger.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">National Domestic Violence Hotline</span>
                <span className="text-gray-700"> – 1-800-799-7233 | </span>
                <a href="https://thehotline.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">thehotline.org</a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">RAINN (Rape, Abuse & Incest National Network)</span>
                <span className="text-gray-700"> – 1-800-656-HOPE | </span>
                <a href="https://rainn.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">rainn.org</a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">Cyber Civil Rights Initiative</span>
                <span className="text-gray-700"> – </span>
                <a href="https://cybercivilrights.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">cybercivilrights.org</a>
                <span className="text-gray-700"> for image-based abuse or online harassment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Reporting To Governmental Authorities */}
        <div className="">
          <h3 className="mb-6">
            Section 3: Reporting To Governmental Authorities
          </h3>
          <p className=" mb-6">
            In certain cases, Platform users may need to submit complaints or
            reports to public authorities. These may include:
          </p>
          
          <div className="space-y-5 mb-6">
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">State Attorneys General</span>
                <span className="text-gray-700"> – For consumer fraud or identity misuse.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">Department Of Justice (DOJ)</span>
                <span className="text-gray-700"> – For civil rights violations.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">Federal Trade Commission (FTC)</span>
                <span className="text-gray-700"> – For online privacy and identity-related concerns.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <div>
                <span className="font-semibold">Child Protective Services (CPS)</span>
                <span className="text-gray-700"> – If a minor is endangered or involved.</span>
              </div>
            </div>
          </div>

          <div className="py-4 bg-primary-foreground border-l-4 border-red-700 mb-4 pl-4">
            <p className="font-semibold">
              The Platform supports and will cooperate with valid government orders, subpoenas, and requests within our jurisdiction.
            </p>
          </div>
        </div>

        {/* Section 4: Reporting Platform Misuse Or Abuse */}
        <div className="mb-8">
          <h3 className="mb-6">
            Section 4: Reporting Platform Misuse Or Abuse
          </h3>
          <p className=" mb-6">
            We take allegations of misuse, false submissions, harassment, retaliation, or ethical violations seriously. If you believe a user has violated platform policies, or if you've been falsely named or retaliated against:
          </p>

          <div className="mb-6">
            <p className="font-semibold mb-3">You May:</p>
            <div className="space-y-5">
              <div className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <span className="font-semibold">Submit A Formal Complaint</span>
                  <span className="text-gray-700"> using our </span>
                  <span className="text-red-600 font-semibold">[Misuse Report Form]</span>
                  <span className="text-gray-700">.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <span className="font-semibold">Contact The Compliance & Integrity Division</span>
                  <span className="text-gray-700"> at [compliance@[platformname].org].</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-5">
            <p className="">
              We log all complaints and audit our systems regularly. Verified abuse or falsification will result in permanent sanctions and may trigger legal actions.
            </p>
          </div>
        </div>

        {/* Section 5: Educational Resources */}
        <div className="mb-8 container mx-auto">
          <h3 className="mb-6">
            Section 5: Educational Resources
          </h3>
          <p className=" mb-6">
            For users who wish to better understand the legal definitions and frameworks surrounding romantic misconduct, abuse, coercion, and civil redress:
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-2">
              <span>•</span>
              <a href="https://stoprelationshipabuse.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">
                The Center For Relationship Abuse Awareness
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <a href="https://www.knowyourix.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">
                Know Your IX (Title IX Rights And Legal Advocacy)
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <a href="https://www.aclu.org/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline">
                ACLU Resources On Civil Liberties & Abuse
              </a>
            </div>
          </div>
        </div>

        {/* Section 6: Confidentiality And Data Sharing */}
        <div className="mb-8 container mx-auto">
          <h3 className="mb-6">
            Section 6: Confidentiality And Data Sharing
          </h3>
          <p className=" mb-6">
            Other than stated within our Privacy Policy:
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-2">
              <span>•</span>
              <p className="text-gray-700">
                We will never share private user information or submission contents with any third party except under legal compulsion or user authorization.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <p className="text-gray-700">
                We are not obligated to notify a user of governmental access under certain emergency or law enforcement exceptions.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <p className="text-gray-700">
                Juror votes, internal deliberation logs, and moderator activity are permanently retained for compliance but never made public.
              </p>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="">
          <h3 className="mb-6">Final Note</h3>
          <p className="">
            The Platform encourages informed and responsible action. If you believe a situation exceeds the scope of the Platform's purpose, or if someone is in danger, act immediately and contact proper legal or emergency authorities.
          </p>
        </div>
      </div>
    </div>
  );
}