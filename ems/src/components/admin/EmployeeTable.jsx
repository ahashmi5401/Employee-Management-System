import React from "react"
import EmployeeData from "../../data/admin/Employee"
import Input from "./Input"

const EmployeeTable = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* Search + Filter */}
      <div className="flex gap-4">
        <Input placeholder={"Search Employee..."} />
        <select
          className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="busy">Busy</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-950 border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500">Tasks</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {EmployeeData.map(({ id, profile, profileBg, fullName, email, assignedTasks, status, statusStyle }) => (
              <tr key={id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all">
                
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`${profileBg} rounded-full h-8 w-8 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                      {profile}
                    </div>
                    <span className="text-white text-sm font-medium">{fullName}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-zinc-400 text-sm">{email}</td>
                <td className="px-4 py-3 text-white text-sm font-medium">{assignedTasks}</td>
                
                <td className="px-4 py-3">
                  <span className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                    {status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all">
                      Edit
                    </button>
                    <button className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default EmployeeTable