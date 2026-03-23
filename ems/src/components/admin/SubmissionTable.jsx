import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { approveSubmission } from "../../utils/updateSubmission";
import RejectModal from "./RejectModal";
import ViewSubmissionModal from './ViewSubmissionModal'
import Input from './Input'
import { useMediaQuery } from "../../hooks/useMediaQuery";

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const { isMobile, isTablet } = useMediaQuery()
  const showCards = isMobile || isTablet

  const handleApprove = async (id) => {
    await approveSubmission(id);
  };

  const handleRejectClick = (id) => {
    setSelectedId(id);
    setShowRejectModal(true);
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
    setShowViewModal(true);
  };

  useEffect(() => {
    const subRef = ref(db, "submissions");
    const unsub = onValue(subRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const subList = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setSubmissions(subList);
      } else {
        setSubmissions([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-green-500/10 text-green-400 border border-green-500/20";
    if (status === "Rejected") return "bg-red-500/10 text-red-400 border border-red-500/20";
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  };

  const filterSubmissions = submissions
    .filter(item =>
      item.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
      item.taskTitle?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item => statusFilter === '' || item.status === statusFilter)

  if (loading) return <p className="text-zinc-500 text-sm mt-4">Loading submissions...</p>;

  return (
    <>
      <div className="flex flex-col gap-4 mt-10 ">

        {/* Search + Filter */}
        <div className="flex gap-2 flex-wrap">
          <Input
            search={search}
            setSearch={setSearch}
            placeholder="Search Submissions..."
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 py-2.5 md:py-3 px-3 md:px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Mobile + Tablet — Card View */}
        {showCards ? (
          <div className="flex flex-col gap-3 mt-4">
            {filterSubmissions.map(({ id, employeeName, taskTitle, hoursSpent, completion, status, notes, description, adminNote, submittedAt }) => (
              <div key={id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">

                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 mr-2">
                    <p className="text-white text-sm font-medium">{taskTitle}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{employeeName}</p>
                  </div>
                  <span className={`${statusStyle(status)} text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0`}>
                    {status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">Hours</span>
                    <span className="text-zinc-300 text-xs">{hoursSpent} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">Completion</span>
                    <span className="text-zinc-300 text-xs">{completion}%</span>
                  </div>
                  {notes && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500 text-xs">Notes</span>
                      <span className="text-zinc-300 text-xs truncate max-w-[180px]">{notes}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(id)}
                    className="flex-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-green-500/20 transition-all">
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectClick(id)}
                    className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-red-500/20 transition-all">
                    Reject
                  </button>
                  <button
                    onClick={() => handleView({ id, employeeName, taskTitle, hoursSpent, completion, status, notes, description, adminNote, submittedAt })}
                    className="flex-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-all">
                    View
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          // Desktop — Table View
          <div className="overflow-x-auto border border-zinc-800 rounded-2xl mt-2">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[20%]">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[20%]">Task</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]">Hours</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]">Completion</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[28%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterSubmissions.map(({ id, employeeName, taskTitle, hoursSpent, completion, status, notes, description, adminNote, submittedAt }) => (
                  <tr key={id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all">
                    <td className="px-4 py-3 text-white text-sm font-medium">{employeeName}</td>
                    <td className="px-4 py-3">
                      <p className="text-white text-sm font-medium">{taskTitle}</p>
                      <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-[160px]">{notes}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">{hoursSpent} hrs</td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">{completion}%</td>
                    <td className="px-4 py-3">
                      <span className={`${statusStyle(status)} text-xs font-semibold px-3 py-1 rounded-full`}>{status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleApprove(id)} className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-green-500/20 transition-all">Approve</button>
                        <button onClick={() => handleRejectClick(id)} className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">Reject</button>
                        <button onClick={() => handleView({ id, employeeName, taskTitle, hoursSpent, completion, status, notes, description, adminNote, submittedAt })} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showRejectModal && selectedId && (
        <RejectModal
          submissionId={selectedId}
          onClose={() => setShowRejectModal(false)}
          onSuccess={() => setShowRejectModal(false)}
        />
      )}

      {showViewModal && selectedSubmission && (
        <ViewSubmissionModal
          submission={selectedSubmission}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
};

export default SubmissionTable;