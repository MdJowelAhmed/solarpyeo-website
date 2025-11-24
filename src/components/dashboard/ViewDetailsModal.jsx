import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ViewDetailsModal = ({ isOpen, onClose, submission }) => {
  if (!submission?.fullData) return null;

  const data = submission.fullData;

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-blue-100 text-blue-800 border-blue-200",
      APPROVED: "bg-green-100 text-green-800 border-green-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Case Details: {data.caseId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Case ID</p>
                  <p className="font-medium text-blue-600">{data.caseId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={getStatusBadge(data.status)}>
                    {data.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{data.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type of Filing</p>
                  <p className="font-medium">{data.typeOfFiling}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initiator Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Initiator Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{`${data?.user?.firstName || ""} ${data?.user?.middleName || ""} ${data?.user?.lastName || ""}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{new Date(data.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data?.user?.email || ""}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Respondent Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Respondent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{`${data.respondentFastName} ${data.respondentMiddleName} ${data.respondentLastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{new Date(data.respondentDOB).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{data.respondentEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allegations */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Allegations</h3>
              <div className="space-y-2">
                {data.allegation?.map((allegation, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">#{index + 1}:</span> {allegation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evidence */}
          {data.evidence && data.evidence.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-lg">Evidence Submitted</h3>
                <div className="space-y-2">
                  {data.evidence.map((evidence, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">
                        Evidence #{index + 1}: {evidence.split('/').pop()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Juror Decisions */}
          {data.jurorDecisions && data.jurorDecisions.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-lg">Juror Decisions ({data.jurorDecisions.length})</h3>
                <div className="space-y-3">
                  {data.jurorDecisions.map((decision, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">Juror #{index + 1}</p>
                        <Badge className={
                          decision.action === "ACCEPT" ? "bg-green-100 text-green-800" :
                          decision.action === "REJECT" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {decision.action}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Comment:</span> {decision.comment}
                      </p>
                      <p className="text-xs text-gray-500">
                        Voted: {formatDate(decision.votedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admin Decisions */}
          {data.adminDecisions && data.adminDecisions.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-lg">Admin Decisions</h3>
                <div className="space-y-2">
                  {data.adminDecisions.map((decision, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">#{index + 1}:</span> {decision}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {/* <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Case Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm border-l-2 border-blue-500 pl-4 py-2">
                  <span className="font-medium">Case Created</span>
                  <span className="text-gray-500">{formatDate(data.createdAt)}</span>
                </div>
                <div className="flex justify-between text-sm border-l-2 border-blue-500 pl-4 py-2">
                  <span className="font-medium">Last Updated</span>
                  <span className="text-gray-500">{formatDate(data.updatedAt)}</span>
                </div>
                <div className="flex justify-between text-sm border-l-2 border-green-500 pl-4 py-2">
                  <span className="font-medium">Current Status</span>
                  <Badge className={getStatusBadge(data.status)}>
                    {data.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Payment Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge className={data.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {data.isPaid ? "PAID" : "UNPAID"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Type</p>
                  <p className="font-medium">{data.submittionType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Next Steps</h3>
              <p className="text-sm text-gray-700">
                {data.status === "PENDING" && !data.jurorDecisions?.length
                  ? "This case is awaiting juror review. You will be notified when jurors begin evaluating your submission."
                  : data.status === "PENDING" && data.jurorDecisions?.length > 0
                  ? `Currently ${data.jurorDecisions.length} of 3 jurors have voted. Waiting for remaining jurors to complete their review.`
                  : data.status === "APPROVED"
                  ? "This case has been approved. You can now view the final decision and take appropriate actions."
                  : data.status === "REJECTED"
                  ? "This case has been rejected. You may appeal this decision if you have additional evidence or believe there was an error in the evaluation."
                  : "Please check back for updates on your case status."}
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;