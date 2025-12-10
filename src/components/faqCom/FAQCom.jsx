"use client"
import React, { useState } from 'react';
import { Plus, Minus, Menu, X, Shield, Scale, HelpCircle, Users, FileText, Check, AlertTriangle, Clock } from 'lucide-react';

const FAQCom = () => {
  const [openSections, setOpenSections] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const decisionData = [
    {
      label: "Verified",
      icon: <div className="bg-green-500 rounded p-0.5"><Check className="w-4 h-4 text-white" strokeWidth={3} /></div>,
      labelColor: "text-green-700",
      votes: (
        <span>
          100% voted as <span className="text-green-700 font-bold">Verified</span>
        </span>
      ),
      record: "Respondent"
    },
    {
      label: "Not Disproven",
      icon: <AlertTriangle className="w-6 h-6 text-orange-400 fill-orange-100" />,
      labelColor: "text-orange-400",
      votes: (
        <span>
          Majority voted as <span className="text-green-700 font-bold">Verified</span>
        </span>
      ),
      record: "Respondent"
    },
    {
      label: "Disproven",
      icon: <X className="w-6 h-6 text-red-500" strokeWidth={3} />,
      labelColor: "text-red-500",
      votes: (
        <span>
          100% voted as <span className="text-red-500 font-bold">Disproven</span>
        </span>
      ),
      record: "Initiator"
    },
    {
      label: (
        <span className="flex flex-col leading-tight">
          <span>Unable to</span>
          <span>Decide</span>
        </span>
      ),
      icon: <Clock className="w-6 h-6 text-gray-500" />,
      labelColor: "text-slate-900",
      votes: (
        <span className="text-slate-900 block max-w-xs mx-auto">
          Votes did not meet any final decision criteria
        </span>
      ),
      record: "N/A"
    }
  ];

  const faqSections = [
    {
      id: 'legal',
      title: '🔒 Legal Questions',
      icon: <Scale className="w-5 h-5" />,
      questions: [
        {
          id: 'legal1',
          question: 'Is the platform a legal court?',
          answer: 'No! The Platform is not a court of law, nor does it replace legal or civil proceedings. It is a distinct, separate, structured system for community-based review and recordkeeping based on user-submitted evidence and peer assessments. Verified records issued by the Platform are not legal judgments.'
        },
        {
          id: 'legal2',
          question: 'Can I use platform records in court?',
          answer: 'Platform records are private and intended for internal accountability. Use of records in civil or criminal court is subject to local jurisdictional rules of evidence.'
        },
        {
          id: 'legal3',
          question: 'What if I`ve already filed a police report or restraining order?',
          answer: 'You may include documentation from law enforcement or the courts in your case submission. In verified instances, official records may be included in the offender’s profile as a sealed or permanent entry.'
        },
        {
          id: 'legal4',
          question: 'Can I be sued for submitting a case or voting as a juror?',
          answer: 'All users agree to operate under penalty of perjury and abide by the Platform’s Terms of Use. Submissions made in good faith are protected under internal review. However, knowingly false reports may expose a user to civil or criminal consequences, including liability for defamation or fraud.'
        },
        {
          id: 'legal5',
          question: 'How does the Platform respond to subpoenas or legal orders?',
          answer: 'The Platform complies with valid legal process. If your information is requested, we may contact you unless prohibited by law.'
        },
        {
          id: 'legal6',
          question: 'How can I request official copies of records?',
          answer: 'Due to the nature of this platform`s procedures, all documentation is digitally created, and thus, official copies are digital only. If you are a named party, you can view all case files from within your User Dashboard. You may request a certified copy be mailed to you by filling out a Records Request Form. There may be fees related to a Records Request, which will be charged to you according to the Fee Policy'
        }
      ]
    },
    {
      id: 'ethical',
      title: '⚖️ Ethical Questions',
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          id: 'ethical1',
          question: 'How are jurors chosen?',
          answer: 'Jurors are randomly assigned from the approved juror pool. All jurors must complete orientation, an ethics certification, a background check, and agree to confidentiality and declare any conflicts of interest.'
        },
        {
          id: 'ethical2',
          question: 'Can I be a juror and a party in a case on the platform?',
          answer: 'Yes, but never for the same or connected cases. You will be disqualified from reviewing any case where you are the Initiator, Respondent, or have a declared relationship to any party involved.'
        },
        {
          id: 'ethical3',
          question: 'What if someone lies in their submission?',
          answer: 'Each submission is bound by a signed perjury declaration. If a user is found to have knowingly submitted false information, the case will be visible on the user`s platform record. Repeated or malicious perjury will result in account termination and may result in legal referral.'
        },
        {
          id: 'ethical4',
          question: 'How is retaliation prevented?',
          answer: 'Retaliatory behavior is a violation of the Platform`s code of conduct. All users are protected from targeted harassment and may report misuse using the Misuse Report Form. Verified retaliation will result in permanent suspension or legal referral.'
        }
      ]
    },
    {
      id: 'procedural',
      title: '🧱 Procedural Questions',
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          id: 'proc1',
          question: 'What happens after I submit a case?',
          answer: 'Submissions undergo an Initial System Review to check for completeness, jurisdiction, and rule compliance. If accepted, the Respondent is notified and given the opportunity to respond. Juror panels then evaluate the evidence and vote anonymously.'
        },
        {
          id: 'proc2',
          question: 'What are the possible outcomes?',
          answer: (
            <div className="w-full space-y-4">
              <p className="text-slate-700">
                See the table below. This table is also available to Jurors in their designated Juror Protocol.
              </p>
              <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-slate-200">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-4 px-6 text-center font-bold text-slate-900 border border-slate-300 text-lg">Decision</th>
                      <th className="py-4 px-6 text-center font-bold text-slate-900 border border-slate-300 text-lg">Votes</th>
                      <th className="py-4 px-6 text-center font-bold text-slate-900 border border-slate-300 text-lg">Record on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionData.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="py-4 px-6 border border-slate-300">
                          <div className="flex items-center justify-center space-x-3">
                            {item.icon}
                            <span className={`font-bold text-lg ${item.labelColor}`}>{item.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-lg text-slate-700 border border-slate-300 font-medium">
                          {item.votes}
                        </td>
                        <td className="py-4 px-6 text-center text-lg text-slate-700 border border-slate-300 font-medium">
                          {item.record}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        },
        {
          id: 'proc3',
          question: 'Can I appeal a decision?',
          answer: 'Yes. Either party in the case file an Appeal Request Form within 30 days of the verdict. New evidence or procedural errors must be presented for a review panel to consider the appeal. To get started, log in to your User Dashboard and find the option to appeal within the Active Cases menu.'
        },
        {
          id: 'proc4',
          question: 'How long does a record remain visible?',
          answer: `
• Verified submissions remain indefinitely.
• Unverified submissions are visible for up to 2 years.
• Rejected submissions are purged within 30 days, except rejection logs.
• Withdrawn submissions remain for 12 months if a notice was issued.
`
        }

      ]
    },
    {
      id: 'privacy',
      title: '🧑‍⚖️ User Rights & Privacy',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          id: 'privacy1',
          question: 'Can I view my own record?',
          answer: 'Yes. All users may access their personal profile and submission history at any time. Juror voting history and moderator decisions are not publicly viewable.'
        },
        {
          id: 'privacy2',
          question: 'What if I’m misidentified or falsely named?',
          answer: 'You may file a User Identity Dispute / Mistaken Identity Claim, providing documentation to resolve the issue. Falsely attributed records will be removed or corrected. You will have to be logged in to begin the process within the Active Cases menu on your User Dashboard. If the case does not show in your Active Cases, you will need to contact the platform at [support@platform.org].'
        },
        {
          id: 'privacy3',
          question: 'Can I request to seal or expunge a record?',
          answer: 'Yes. The Request to Seal or Expunge Form is available for eligible cases. Approval depends on the type of case, time elapsed, and conduct history'
        },
        {
          id: 'privacy4',
          question: 'Is my data secure?',
          answer: 'Yes. The Platform uses encrypted storage and access logs. Juror activity, user submissions, and sensitive documents are not public-facing and cannot be accessed without authorization. When a Case is Sealed or Expunged, the files affected are tasked to be removed from the online records management system'
        },
        {
          id: 'privacy5',
          question: 'Is my participation confidential?',
          answer: 'Juror votes are permanently confidential, through the use of unique Juror IDs on forms. User submissions may remain private dependent on when an outcome is reached, what the outcome is, and the platform’s retention rules.'
        }
     
      ]
    },
    {
      id: 'general',
      title: '🤍 General',
      icon: <FileText className="w-5 h-5" />,
      questions: [
       {
          id: 'general1',
          question: 'Can I delete my account?',
          answer: 'Yes. Account deletion requests must be submitted via Account Settings within the User Dashboard or by contacting support. Deletion does not remove records, which remain archived under platform retention policies.'
        },
        {
          id: 'general2',
          question: 'How do I report a bug or technical problem?',
          answer: 'Use the Technical Support Request Form or contact [techsupport@[platformname].org].'
        }
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-secondary">


      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-slate-900 mb-4">
            Frequently asked questions (FAQ)
          </h3>
          <p className="text-lg text-slate-600  mx-auto">
            Welcome to the Platform FAQ. Below, you’ll find answers to the most common questions about legal standards, ethical guidelines, platform procedures, and your rights as a user. If you cannot find the answer you’re looking for, please contact [support@[platformname].org].
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className=" px-6 py-4 border-b">
                <div className="flex items-center justify-center space-x-3">
                  {/* <div className="p-2 bg-white rounded-lg shadow-sm">
                    {section.icon}
                  </div> */}
                  <h3 className="">{section.title}</h3>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {section.questions.map((item, index) => (
                  <div key={item.id} className="px-6 py-4">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex items-center justify-between text-left focus:outline-none  rounded-lg p-2 -m-2"
                    >
                      <span className="font-medium text-slate-900 pr-4">{item.question}</span>
                      <div className="flex-shrink-0">
                        {openSections[item.id] ? (
                          <Minus className="w-5 h-5 text-slate-500" />
                        ) : (
                          <Plus className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {openSections[item.id] && (
                      <div className="mt-4 pl-2">
                        <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>


      </main>

      {/* Footer */}

    </div>
  );
};

export default FAQCom;
