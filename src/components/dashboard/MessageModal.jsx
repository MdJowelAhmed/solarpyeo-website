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

const MessageModal = ({ isOpen, onClose, submission }) => {
  const [message, setMessage] = useState("");

  if (!submission) return null;

  const handleSubmit = () => {
    // Handle message submission logic here
    console.log("Message sent:", message);
    // Reset form and close modal
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Message: {submission.caseId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium">{submission.respondent}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="message-content">
              Message
            </label>
            <Textarea
              id="message-content"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-600">
              Note: All messages are recorded and may be reviewed by platform administrators.
              Please ensure your communication adheres to platform guidelines.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!message.trim()}
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;