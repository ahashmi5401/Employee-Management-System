import React from "react";
import TaskData from "../../data/admin/TaskData";
import Input from "./Input";
const TaskTable = () => {
  return (
    <div className="flex  flex-col ">
      <div className="flex gap-2 px-2">
        <Input placeholder={"Search Task..."} />
        <select
          name=""
          id=""
          className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none"
        >
          <option value="">Priority</option>
          <option value="">High</option>
          <option value="">Medium</option>
          <option value="">Low</option>
        </select>
        <select
          name=""
          id=""
          className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none"
        >
          <option value="">Status</option>
          <option value="">Compeleted</option>
          <option value="">Pending</option>
          <option value="">Failed</option>
        </select>
      </div>
      <div className="overflow-x-auto border border-zinc-800 rounded-2xl overflow-hidden mt-4">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-zinc-950 border-b border-zinc-800">
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[20%]">
                Task
              </th>
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[23%]">
                Assign to
              </th>
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[11%]">
                Priority
              </th>
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[10%]">
                Due Date
              </th>
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[12%]">
                Status
              </th>
              <th className="text-zinc-500 text-xs font-semibold tracking-widest uppercase text-left px-4 py-3 w-[15%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {TaskData.map(({id , title , desc , assignedTo , profile , profileBg , priority , priorityStyle , dueDate , status , statusStyle }) => (
                <tr className="p-2 border-b border-zinc-800 hover:bg-zinc-800/50 transition-all" key={id}>
                <td className="px-4 py-3">
                       <div className="flex flex-col gap-0.5">
                             <p className="text-white text-sm font-medium">{title}</p>
                             <span className="text-zinc-500 text-xs">{desc}</span>
                        </div>
                </td>
                <td className="text-white p-3 flex gap-3">
                    <div className={`${profileBg} rounded-full flex h-10 w-10 items-center justify-center text-sm`}><p>{profile}</p></div>
                    <span className="text-sm text-zinc-500 ">{assignedTo}</span>
                </td>
                <td className="">
                    <button className={`${priorityStyle} text-xs font-semibold px-3 py-1 rounded-lg  transition-all`}>{priority}</button>
                </td>
                <td className="text-zinc-500 text-md ">{dueDate}</td>
                <td className="">
                    <button className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-lg `}>{status}</button>
                </td>
                <td >
                    <div className="gap-3 flex">
                         <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all">Edit</button>
                         <button className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">Delete</button>
                    </div>
                </td>
            </tr> 
            ))}
            {/* <tr className="p-2">
                <td className="text-white p-3">Ui Design</td>
                <td className="text-white p-3 flex gap-3">
                    <div className="bg-red-500 rounded-full flex h-10 w-10 items-center justify-center text-sm"><p>AH</p></div>
                    <span className="text-sm text-zinc-500 ">Muhammad Ayan Hashmi</span>
                </td>
                <td className="">
                    <button className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">High</button>
                </td>
                <td className="text-zinc-500 text-md ">29 March</td>
                <td className="">
                    <button className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-yellow-500/20 transition-all">pending</button>
                </td>
                <td >
                    <div className="gap-3 flex">
                         <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all">Edit</button>
                         <button className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all">Delete</button>
                    </div>
                </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
