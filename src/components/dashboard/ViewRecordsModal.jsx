import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const ViewRecordsModal = ({ isOpen, onClose, record }) => {
  console.log("record:", record);
  if (!record) return null;

  // Handle both direct record and fullData structure
  const data = record.fullData || record;

  const getOutcomeBadge = (outcome) => {
    const styles = {
      LAND: "bg-orange-100 text-orange-800 border-orange-200",
      VP: "bg-green-100 text-green-800 border-green-200",
      WON: "bg-red-100 text-red-800 border-red-200",
      APPROVED: "bg-green-100 text-green-800 border-green-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
      "N/A": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[outcome] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getJurorActionIcon = (action) => {
    if (action === "ACCEPT") return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (action === "REJECT") return <XCircle className="w-4 h-4 text-red-600" />;
    return <AlertCircle className="w-4 h-4 text-gray-600" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Case Records: {data.caseId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Case Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Case ID</p>
                <p className="font-medium">{data.caseId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{data.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={getOutcomeBadge(data.status)}>
                  {data.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type of Filing</p>
                <p className="font-medium">{data.typeOfFiling}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submission Type</p>
                <p className="font-medium">{data.submittionType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className="font-medium">{data.isPaid ? "✓ Paid" : "Pending"}</p>
              </div>
            </div>
          </div>

          {/* Respondent Information */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Respondent Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {data.respondentFastName} {data.respondentMiddleName} {data.respondentLastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-sm">{data.respondentEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(data.respondentDOB)}</p>
              </div>
            </div>
          </div>

          {/* Filing User Information */}
          {data.user && (
            <div>
              <h2 className="font-semibold text-lg mb-3">Filed By</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {data.user.firstName} {data.user.middleName} {data.user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-sm">{data.user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Allegations */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Allegations</h2>
            <div className="space-y-2">
              {data.allegation && data.allegation.length > 0 ? (
                data.allegation.map((allege, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">{allege}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No allegations recorded</p>
              )}
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Evidence</h2>
            <div className="space-y-2">
              {data.evidence && data.evidence.length > 0 ? (
                data.evidence.map((ev, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm">
                    <a href={ev} className="text-blue-600 hover:underline break-all">
                      {ev}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No evidence uploaded</p>
              )}
            </div>
          </div>

          {/* Admin Decisions */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Admin Reviews</h2>
            <div className="space-y-2">
              {data.adminDecisions && data.adminDecisions.length > 0 ? (
                data.adminDecisions.map((decision, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <p className="text-sm"><span className="font-medium">Review {idx + 1}:</span> {decision}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No admin reviews</p>
              )}
            </div>
          </div>

          {/* Juror Decisions */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Juror Decisions</h2>
            <div className="space-y-3">
              {data.jurorDecisions && data.jurorDecisions.length > 0 ? (
                data.jurorDecisions.map((decision, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      {getJurorActionIcon(decision.action)}
                      <span className="font-medium text-sm">{decision.action}</span>
                      <span className="text-xs text-gray-500">
                        {formatDate(decision.votedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{decision.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No juror decisions yet</p>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Timeline</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">{formatDate(data.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">{formatDate(data.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRecordsModal;