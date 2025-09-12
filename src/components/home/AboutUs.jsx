import React from "react";
import { FileText, Shield, Users, Search, HelpCircle } from "lucide-react";
import { Card } from "../ui/card";
import { File, Jury, King, Question, SearchIcon } from "../share/svg/howItWorkSvg";

const RelationshipArchive = () => {
  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-secondary py-12 md:py-16 lg:py-24 ">
        <div className="container mx-auto">
          <div className="  text-center">
            <h2 className="text-2xl lg:text-4xl font-bold   mb-6">
              Every pattern has a file.
            </h2>
            <p className=" max-w-2xl mx-auto mb-12">
              A public archive of relationship conduct—documented, accessible,
              and preserved for awareness and safety.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white ">
            <div className="mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {/* File A Claim */}
                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center ">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <File className="" />
                    </div>
                  </div>
                  <h2 className=" text-2xl font-bold">File A Claim</h2>
                  <p className="">
                    A verified user submits a claim with evidence through our
                    secure web forms.
                  </p>
                </Card>

                {/* Moderate & Redact */}
                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center ">
                    <div className="w-16 h-16  flex items-center justify-center">
                      <King />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Moderate & Redact
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A trained moderator redacts all personal information to
                    ensure anonymity.
                  </p>
                </Card>

                {/* Jury Vote */}
                <Card className="text-center px-10 py-12">
                  <div className="flex justify-center ">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Jury />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Jury Vote
                  </h2>
                  <p className=" text-sm leading-relaxed">
                    Anonymous jurors review the redacted evidence and cast a
                    blind vote on the outcome.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-primary-foreground py-12 md:py-16 lg:py-24 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Search The Records */}
            <div className="bg-white rounded-lg px-20 lg:px-32 py-10 shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16  flex items-center justify-center">
                  <SearchIcon />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Search The Records
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
              Conduct reports on individuals — filed by users, reviewed for patterns
              </p>
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200">
                View a Record
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-lg px-20 lg:px-32 py-10 shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16  flex items-center justify-center">
                  <Question />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Understand the filing process and verification procedures
              </p>
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200">
                Learn the Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipArchive;
