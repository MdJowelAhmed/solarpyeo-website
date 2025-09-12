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

const ViewDetailsModal = ({ isOpen, onClose, submission }) => {
  if (!submission) return null;

  const getStatusBadge = (statusType) => {
    const styles = {
      pending: "bg-blue-100 text-blue-800 border-blue-200",
      notice: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return styles[statusType] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Case Details: {submission.caseId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Respondent</p>
              <p className="font-medium">{submission.respondent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge className={getStatusBadge(submission.statusType)}>
                {submission.status}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Activity</p>
            <p>{submission.lastActivity}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Case Summary</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm">
                This section would contain the summary of the case, including the
                initial complaint, evidence provided, and current status in the
                review process.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Case Timeline</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Submission Created</span>
                <span className="text-gray-500">June 10, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Notice Sent</span>
                <span className="text-gray-500">June 11, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Awaiting Juror Review</span>
                <span className="text-gray-500">Current</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Next Steps</p>
            <p className="text-sm">
              {submission.statusType === "pending"
                ? "Waiting for jurors to complete their review. You will be notified when a decision is reached."
                : "Waiting for respondent to acknowledge the notice. You will be notified when they respond."}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;