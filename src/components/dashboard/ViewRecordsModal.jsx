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

const ViewRecordsModal = ({ isOpen, onClose, record }) => {
  if (!record) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Case Records: {record.caseId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Respondent</p>
              <p className="font-medium">{record.respondent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Outcome</p>
              <Badge className={getOutcomeBadge(record.outcome)}>
                {record.outcome}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Appeal Status</p>
            <p>{record.appealed}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Case Details</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm">
                This section would contain the full case details, including
                submission date, evidence provided, juror votes, and final
                decision details.
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
                <span>Juror Review Completed</span>
                <span className="text-gray-500">June 14, 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Case Closed</span>
                <span className="text-gray-500">June 15, 2025</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Download Records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRecordsModal;
