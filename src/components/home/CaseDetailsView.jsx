import React from "react";
import { Gavel } from "lucide-react";
import { Button } from "../ui/button";

const CaseDetailsView = ({ selectedPerson, handleRecordsRequest }) => {
  if (!selectedPerson) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">
        Case Records for {selectedPerson.fullName}
      </h3>
      <div className="space-y-4">
        {selectedPerson.caseIds.map((caseData) => (
          <div key={caseData.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-medium text-lg">{caseData.id}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Gavel className="w-4 h-4 text-gray-600" />
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      caseData.verdictCode === "GUILTY"
                        ? "bg-red-100 text-red-800"
                        : caseData.verdictCode === "NOT GUILTY"
                        ? "bg-green-100 text-green-800"
                        : caseData.verdictCode === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {caseData.verdictCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <Button
                onClick={() => handleRecordsRequest(caseData, "Full Case File")}
                className="px-4 py-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                Full Case File
              </Button>
              <Button
                onClick={() =>
                  handleRecordsRequest(caseData, "Party Submissions")
                }
                className="px-4 py-6 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                Party Submissions
              </Button>
              <Button
                onClick={() =>
                  handleRecordsRequest(caseData, "Juror Voting Materials")
                }
                className="px-4 py-6 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
              >
                Juror Voting Materials
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseDetailsView;