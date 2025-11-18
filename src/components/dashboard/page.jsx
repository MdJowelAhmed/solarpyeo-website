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
import { useGetDashboardPageQuery, useGetJurorStatusMonitoringQuery } from "@/redux/featured/dashboard/dashboardPageApi";

const DashboardContainer = () => {
  // State for modals
  const [viewRecordsModal, setViewRecordsModal] = useState(false);
  const [appealModal, setAppealModal] = useState(false);
  const [sealExpungeModal, setSealExpungeModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  const {data: dashboardPage} = useGetDashboardPageQuery();
  const {data: jurorStatusMonitoring} = useGetJurorStatusMonitoringQuery();
  console.log("jurorStatusMonitoring", jurorStatusMonitoring)
  console.log("dashboardPage", dashboardPage)
  
  // Transform API data for current submissions
  const currentSubmissions = dashboardPage?.data?.map(item => ({
    _id: item._id,
    caseId: item.caseId,
    respondent: `${item.respondentFastName} ${item.respondentLastName}`,
    status: item.status,
    lastActivity: new Date(item.updatedAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    statusType: item.status === "PENDING" ? "pending" : item.status === "APPROVED" ? "approved" : "notice",
    fullData: item // Store full data for modal
  })) || [];

  // Transform API data for juror status monitoring
  const jurorStatus = jurorStatusMonitoring?.data?.map(item => {
    const submission = item.submissionId;
    const totalJurors = 3;
    const currentVotes = submission?.jurorDecisions?.length || 0;
    
    // Determine vote action display
    let myVoteDisplay = "Pending Review";
    if (submission?.jurorDecisions && submission.jurorDecisions.length > 0) {
      const firstVote = submission.jurorDecisions[0];
      if (firstVote.action === "ACCEPT") {
        myVoteDisplay = "ACCEPT";
      } else if (firstVote.action === "REJECT") {
        myVoteDisplay = "REJECT";
      } else if (firstVote.action === "UNABLETODECIDE") {
        myVoteDisplay = "UNABLE TO DECIDE";
      }
    }
    
    // Calculate outcome based on juror decisions
    let outcomeDisplay = "——";
    if (submission?.status === "APPROVED") {
      outcomeDisplay = "APPROVED";
    } else if (submission?.status === "REJECTED") {
      outcomeDisplay = "REJECTED";
    } else if (currentVotes === totalJurors) {
      // All votes are in, calculate majority
      const acceptVotes = submission.jurorDecisions.filter(d => d.action === "ACCEPT").length;
      const rejectVotes = submission.jurorDecisions.filter(d => d.action === "REJECT").length;
      
      if (acceptVotes > rejectVotes) {
        outcomeDisplay = "LIKELY APPROVED";
      } else if (rejectVotes > acceptVotes) {
        outcomeDisplay = "LIKELY REJECTED";
      } else {
        outcomeDisplay = "PENDING DECISION";
      }
    }
    
    return {
      _id: item._id,
      caseId: submission?.caseId || "N/A",
      myVote: myVoteDisplay,
      jury: totalJurors.toString(),
      progress: `${currentVotes} of ${totalJurors} votes`,
      outcome: outcomeDisplay,
      fullData: item,
      submissionData: submission
    };
  }) || [];

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

  const getVoteBadge = (vote) => {
    const styles = {
      "ACCEPT": "bg-green-100 text-green-800 border-green-200",
      "REJECT": "bg-red-100 text-red-800 border-red-200",
      "UNABLE TO DECIDE": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Pending Review": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[vote] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getOutcomeBadgeJuror = (outcome) => {
    const styles = {
      "APPROVED": "bg-green-100 text-green-800 border-green-200",
      "REJECTED": "bg-red-100 text-red-800 border-red-200",
      "LIKELY APPROVED": "bg-green-50 text-green-700 border-green-200",
      "LIKELY REJECTED": "bg-red-50 text-red-700 border-red-200",
      "PENDING DECISION": "bg-blue-100 text-blue-800 border-blue-200",
      "——": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[outcome] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: "bg-blue-100 text-blue-800 border-blue-200",
      APPROVED: "bg-green-100 text-green-800 border-green-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-blue-100 text-blue-800 border-blue-200",
      notice: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="mb-3">User Dashboard</h3>
          <p className="mb-10">
            Welcome to your personal User Dashboard. Here you can manage active
            and past submissions, monitor juror voting, respond to platform
            notifications, and control your user obligations.
          </p>
        </div>
        <div className="text-center">
          <h3 className="mb-3">CURRENT SUBMISSIONS OVERVIEW</h3>
        </div>

        {/* Current Submissions Overview */}
        <div>
          <CardHeader className="border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="mb-2">Active Case</p>
                <p className="text-sm">Displays all pending, in-review, or under-juror-evaluation submissions.</p>
              </div>
              <Button
                onClick={() => (window.location.href = "/form-submission")}
                className="py-6 text-white w-full md:w-auto"
              >
                Start A New Submission
              </Button>
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
                  {currentSubmissions.length > 0 ? (
                    currentSubmissions.map((submission, index) => (
                      <tr key={submission._id || index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-blue-600">
                          {submission.caseId}
                        </td>
                        <td className="p-4">{submission.respondent}</td>
                        <td className="p-4">
                          <Badge className={getStatusBadge(submission.status)}>
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No active submissions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {currentSubmissions.length > 0 ? (
                currentSubmissions.map((submission, index) => (
                  <Card key={submission._id || index} className="border">
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
                          <Badge className={getStatusBadge(submission.status)}>
                            {submission.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last Activity: {submission.lastActivity}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border">
                  <CardContent className="p-8 text-center text-gray-500">
                    No active submissions found
                  </CardContent>
                </Card>
              )}
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
                  {jurorStatus.length > 0 ? (
                    jurorStatus.map((status, index) => (
                      <tr key={status._id || index} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-blue-600">
                          {status.caseId}
                        </td>
                        <td className="p-4">
                          <Badge className={getVoteBadge(status.myVote)}>
                            {status.myVote}
                          </Badge>
                        </td>
                        <td className="p-4">{status.jury}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span>{status.progress}</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all"
                                style={{ 
                                  width: `${(parseInt(status.progress.split(' ')[0]) / parseInt(status.progress.split(' ')[2])) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getOutcomeBadgeJuror(status.outcome)}>
                            {status.outcome}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No juror status data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {jurorStatus.length > 0 ? (
                jurorStatus.map((status, index) => (
                  <Card key={status._id || index} className="border">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="font-medium text-blue-600 text-lg">
                          {status.caseId}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 block mb-1">My Vote:</span>
                            <Badge className={getVoteBadge(status.myVote)}>
                              {status.myVote}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-500 block mb-1">Jury:</span>
                            <span className="font-medium">{status.jury}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500 block mb-2">Progress:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{status.progress}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ 
                                    width: `${(parseInt(status.progress.split(' ')[0]) / parseInt(status.progress.split(' ')[2])) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500 block mb-1">Outcome:</span>
                            <Badge className={getOutcomeBadgeJuror(status.outcome)}>
                              {status.outcome}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border">
                  <CardContent className="p-8 text-center text-gray-500">
                    No juror status data available
                  </CardContent>
                </Card>
              )}
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
    </div>
  );
};

export default DashboardContainer;