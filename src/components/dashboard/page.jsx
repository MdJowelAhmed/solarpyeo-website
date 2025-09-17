"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare } from "lucide-react";
import FormDropdown from "@/components/FormDropdown";
import ViewRecordsModal from "./ViewRecordsModal";
import AppealModal from "./AppealModal";
import SealExpungeModal from "./SealExpungeModal";
import ViewDetailsModal from "./ViewDetailsModal";
import MessageModal from "./MessageModal";

const DashboardContainer = () => {
  // State for modals
  const [viewRecordsModal, setViewRecordsModal] = useState(false);
  const [appealModal, setAppealModal] = useState(false);
  const [sealExpungeModal, setSealExpungeModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  const currentSubmissions = [
    {
      caseId: "#A2394B",
      respondent: "M. Ray",
      status: "Awaiting Juror Review 0 of 3 votes",
      lastActivity: "June 16, 2025",
      statusType: "pending",
    },
    {
      caseId: "#B11803",
      respondent: "J. Doe",
      status: "Notice Sent... Awaiting Response",
      lastActivity: "June 15, 2025",
      statusType: "notice",
    },
  ];

  const jurorStatus = [
    {
      caseId: "#A2394B",
      myVote: "VP",
      jury: "3",
      progress: "2 of 3 votes",
      outcome: "——",
    },
    {
      caseId: "#B11803",
      myVote: "(Review)",
      jury: "3",
      progress: "1 of 3 votes",
      outcome: "——",
    },
  ];

  const submissionHistory = [
    {
      caseId: "#A2394B",
      respondent: "P. Lee",
      outcome: "LAND",
      appealed: "Rejected (Insufficient Basis)",
      actions: ["View Records", "Seal/Expunge"],
    },
    {
      caseId: "#B11803",
      respondent: "P. Lee",
      outcome: "VP",
      appealed: "Withdrawn by Initiator",
      actions: ["View Records", "Appeal", "Seal/Expunge"],
    },
    {
      caseId: "#B11803",
      respondent: "P. Lee",
      outcome: "VP",
      appealed: "N/A",
      actions: ["View Records", "Appeal", "Seal/Expunge"],
    },
    {
      caseId: "#B11803",
      respondent: "P. Lee",
      outcome: "N/A",
      appealed: "No",
      actions: ["View Records", "Appeal", "Seal/Expunge"],
    },
    {
      caseId: "#B11803",
      respondent: "P. Lee",
      outcome: "WON",
      appealed: "No",
      actions: ["View Records", "Appeal", "Seal/Expunge"],
    },
  ];

  const getOutcomeBadge = (outcome) => {
    const styles = {
      LAND: "bg-orange-100 text-orange-800 border-orange-200",
      VP: "bg-green-100 text-green-800 border-green-200",
      WON: "bg-red-100 text-red-800 border-red-200",
      "N/A": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[outcome] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusBadge = (statusType) => {
    const styles = {
      pending: "bg-blue-100 text-blue-800 border-blue-200",
      notice: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return styles[statusType] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="mb-3">User Dashboard</h3>
          <p className="mb-10">
            Welcome to your personal User Dashboard. Here you can manage active
            and past submissions, monitor juror voting, respond to platform
            notifications, and control your user obligations.
          </p>
        </div>
        <div className="text-center">
          <h3 className="mb-3">CURRENT SUBMISSIONS OVERVIEW</h3>
          {/* <p className="mb-10">
            Welcome to your personal User Dashboard. Here you can manage active and past submissions, monitor juror voting, respond to platform notifications, and control your user obligations.
          </p> */}
        </div>

        {/* Current Submissions Overview */}
        <div>
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                {" "}
                <p className="mb-2">Active Case</p>
                <p className="text-sm">Displays all pending, in-review, or under-juror-evaluation submissions.</p>
              </div>
              <FormDropdown
                buttonText="Start A New Submission"
                buttonClassName="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Case ID
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Respondent
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Last Activity
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubmissions.map((submission, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-blue-600">
                        {submission.caseId}
                      </td>
                      <td className="p-4">{submission.respondent}</td>
                      <td className="p-4">
                        <Badge
                          className={getStatusBadge(submission.statusType)}
                        >
                          {submission.status}
                        </Badge>
                      </td>
                      <td className="p-4">{submission.lastActivity}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setViewDetailsModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setMessageModal(true);
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {currentSubmissions.map((submission, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-blue-600">
                          {submission.caseId}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setViewDetailsModal(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setMessageModal(true);
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Respondent:{" "}
                        </span>
                        <span>{submission.respondent}</span>
                      </div>
                      <div>
                        <Badge
                          className={getStatusBadge(submission.statusType)}
                        >
                          {submission.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Last Activity: {submission.lastActivity}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Juror Status Monitoring */}
        <div>
          <h3 className="mb-3">JUROR STATUS MONITORING</h3>
         <CardHeader className="">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
               
               <div className="text-sm text-gray-600 mb-3 bg-gray-50">
              Displays the status of juror evaluation for active submissions.
           
              </div>
              {/* <FormDropdown
                buttonText="Start A New Submission"
                buttonClassName="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto"
              /> */}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Case ID
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      My Vote
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Jury
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Progress
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Outcome
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jurorStatus.map((status, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-blue-600">
                        {status.caseId}
                      </td>
                      <td className="p-4">{status.myVote}</td>
                      <td className="p-4">{status.jury}</td>
                      <td className="p-4">{status.progress}</td>
                      <td className="p-4">{status.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {jurorStatus.map((status, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium text-blue-600">
                        {status.caseId}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">My Vote: </span>
                          <span>{status.myVote}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Jury: </span>
                          <span>{status.jury}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Progress: </span>
                          <span>{status.progress}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Outcome: </span>
                          <span>{status.outcome}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div>

        {/* Submission History & Record Status */}
        <div>
          <CardHeader className="">
            <h3 className="mb-8 mt-4">
              SUBMISSION HISTORY & RECORD STATUS
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-sm mb-6">
              <div className="font-semibold mb-2">Closed Cases:</div>
              Displays of all submissions that have been closed in accordance
              with Platform Policy and Record Retention.
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Case ID
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Respondent
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Outcome
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Appealed
                    </th>
                    <th className="text-left p-4 font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissionHistory.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-blue-600">
                        {record.caseId}
                      </td>
                      <td className="p-4">{record.respondent}</td>
                      <td className="p-4">
                        <Badge className={getOutcomeBadge(record.outcome)}>
                          {record.outcome}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm">{record.appealed}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {record.actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              size="sm"
                              variant="outline"
                              className={`text-xs ${
                                action === "View Records"
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : action === "Cancel"
                                  ? "bg-red-100 text-red-700 border-red-300"
                                  : action === "Appeal"
                                  ? "bg-blue-50 text-blue-600 border-blue-200"
                                  : action === "Seal/Expunge"
                                  ? "bg-purple-50 text-purple-600 border-purple-200"
                                  : "bg-blue-50 text-blue-600 border-blue-200"
                              }`}
                              onClick={() => {
                                setSelectedRecord(record);
                                if (action === "View Records") {
                                  setViewRecordsModal(true);
                                } else if (action === "Appeal") {
                                  setAppealModal(true);
                                } else if (action === "Seal/Expunge") {
                                  setSealExpungeModal(true);
                                }
                              }}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {submissionHistory.map((record, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-blue-600">
                          {record.caseId}
                        </span>
                        <Badge className={getOutcomeBadge(record.outcome)}>
                          {record.outcome}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Respondent:{" "}
                        </span>
                        <span>{record.respondent}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          Appealed:{" "}
                        </span>
                        <span className="text-sm">{record.appealed}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {record.actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            size="sm"
                            variant="outline"
                            className={`text-xs ${
                              action === "View Records"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : action === "Cancel"
                                ? "bg-red-100 text-red-700 border-red-300"
                                : action === "Appeal"
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : action === "Seal/Expunge"
                                ? "bg-purple-50 text-purple-600 border-purple-200"
                                : "bg-blue-50 text-blue-600 border-blue-200"
                            }`}
                            onClick={() => {
                              setSelectedRecord(record);
                              if (action === "View Records") {
                                setViewRecordsModal(true);
                              } else if (action === "Appeal") {
                                setAppealModal(true);
                              } else if (action === "Seal/Expunge") {
                                setSealExpungeModal(true);
                              }
                            }}
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div>
      </div>

      {/* Modals */}
      <ViewRecordsModal 
        isOpen={viewRecordsModal} 
        onClose={() => setViewRecordsModal(false)} 
        record={selectedRecord} 
      />
      <AppealModal 
        isOpen={appealModal} 
        onClose={() => setAppealModal(false)} 
        record={selectedRecord} 
      />
      <SealExpungeModal 
        isOpen={sealExpungeModal} 
        onClose={() => setSealExpungeModal(false)} 
        record={selectedRecord} 
      />
      <ViewDetailsModal 
        isOpen={viewDetailsModal} 
        onClose={() => setViewDetailsModal(false)} 
        submission={selectedSubmission} 
      />
      {/* <MessageModal 
        isOpen={messageModal} 
        onClose={() => setMessageModal(false)} 
        submission={selectedSubmission} 
      /> */}
    </div>
  );
};

export default DashboardContainer;
