import React from "react";
import Input from "./Input";
import SubmissionData from "../../data/admin/SubmissionData";

const SubmissionTable = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-4">
        <Input placeholder={"Search Submissions..."} />
        <select className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="busy">Busy</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="overflow-x-auto border rounded-2xl border-zinc-800 mt-4">
        <table className="border-collapse w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all">
              <th className="bg-zinc-950 text-zinc-500 uppercase text-left text-xs px-5 py-3 w-[20%]">
                Employee
              </th>
              <th className="bg-zinc-950 text-zinc-500 uppercase text-left text-xs px-5 py-3 w-[15%]">
                Task
              </th>
              <th className="bg-zinc-950 text-zinc-500 uppercase text-left text-xs px-5 py-3 w-[15%]">
                Submitted
              </th>
              <th className="bg-zinc-950 text-zinc-500 uppercase text-left text-xs px-5 py-3 w-[10%]">
                Status
              </th>
              <th className="bg-zinc-950 text-zinc-500 uppercase text-left text-xs px-5 py-3 w-[30%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {SubmissionData.map(
              ({
                id,
                profile,
                profileBg,
                employeeName,
                taskTitle,
                taskPriority,
                submittedAt,
                status,
                statusStyle,
              }) => (
                <tr
                  key={id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`${profileBg} rounded-full h-8 w-8 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}
                      >
                        {profile}
                      </div>
                      <span className="text-white text-sm">{employeeName}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <h2 className="text-white text-sm font-medium">
                        {taskTitle}
                      </h2>
                      <span className="text-zinc-500 text-xs">
                        {taskPriority}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-zinc-500 text-sm">{submittedAt}</p>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-lg`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-green-500/20 transition-all">
                        Approve
                      </button>
                      <button className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">
                        Reject
                      </button>
                      <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTable;
