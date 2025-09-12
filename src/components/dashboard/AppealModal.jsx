import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const AppealModal = ({ isOpen, onClose, record }) => {
  const [appealReason, setAppealReason] = useState("");

  if (!record) return null;

  const getOutcomeBadge = (outcome) => {
    const styles = {
      LAND: "bg-orange-100 text-orange-800 border-orange-200",
      VP: "bg-green-100 text-green-800 border-green-200",
      WON: "bg-red-100 text-red-800 border-red-200",
      "N/A": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[outcome] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleSubmit = () => {
    // Handle appeal submission logic here
    console.log("Appeal submitted with reason:", appealReason);
    // Reset form and close modal
    setAppealReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appeal Case: {record.caseId}</DialogTitle>
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

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            <p className="text-sm text-yellow-800">
              Appeals must be submitted within 7 days of case closure and must
              provide substantial new evidence or demonstrate procedural errors.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="appeal-reason">
              Appeal Reason
            </label>
            <Textarea
              id="appeal-reason"
              placeholder="Please provide detailed reasoning for your appeal..."
              value={appealReason}
              onChange={(e) => setAppealReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Supporting Evidence
            </label>
            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
              <p className="text-sm text-gray-500">
                Drag and drop files here or click to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (PDF, JPG, PNG, max 10MB each)
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!appealReason.trim()}
          >
            Submit Appeal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppealModal;