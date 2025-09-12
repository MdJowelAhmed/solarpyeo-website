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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SealExpungeModal = ({ isOpen, onClose, record }) => {
  const [requestType, setRequestType] = useState("seal");
  const [reason, setReason] = useState("");

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
    // Handle seal/expunge submission logic here
    console.log("Request submitted:", { requestType, reason });
    // Reset form and close modal
    setRequestType("seal");
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seal/Expunge Request: {record.caseId}</DialogTitle>
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

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Seal:</strong> Record remains in the system but is hidden from public view.
              <br />
              <strong>Expunge:</strong> Record is permanently deleted from the system.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Request Type</p>
            <RadioGroup 
              value={requestType} 
              onValueChange={setRequestType}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seal" id="seal" />
                <Label htmlFor="seal">Seal Record</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expunge" id="expunge" />
                <Label htmlFor="expunge">Expunge Record</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="request-reason">
              Reason for Request
            </label>
            <Textarea
              id="request-reason"
              placeholder="Please provide detailed reasoning for your request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-600">
              Note: Requests are reviewed by platform administrators and may take up to 30 days to process.
              You will be notified of the decision via email.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!reason.trim()}
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SealExpungeModal;