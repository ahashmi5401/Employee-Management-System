import React from "react";
import EmployeeData from "../../data/admin/Employee";
import { NavLink } from "react-router-dom";


const EmployeeStatus = () => {
  return (
    <div  className="scrollBar border-2 border-zinc-800 flex-1 bg-zinc-900 rounded-2xl max-h-[320px] overflow-y-auto">
      <div className="flex justify-between px-4 py-3 items-center border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <h2 className="text-white text-sm font-semibold">Recent Submissions</h2>
        <NavLink to={'/admin/employees'} key={1} className={"text-red-500 cursor-pointer hover:text-red-400 text-xs font-medium transition-all"}>View all</NavLink>      </div>
      <div className="flex flex-col px-4 mt-2 py-2 gap-2">
        {EmployeeData.map((item) => {
          const {
            id,
            profile,
            profileBg,
            fullName,
            assignedTasks,
            status,
            statusStyle,
          } = item;
          return (
            <div
              key={id}
              className="flex justify-between bg-zinc-950 rounded-xl px-3 py-3 items-center"
            >
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-full ${profileBg} h-9 w-9 justify-center text-white flex items-center text-xs font-semibold flex-shrink-0`}
                >
                  {profile}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{fullName}</p>
                  <span className="text-zinc-500 text-xs">
                    {assignedTasks} tasks assigned
                  </span>
                </div>
              </div>

              <span
                className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
// <div className='border-2 border-zinc-800 bg-zinc-900 rounded'>
//     <div className="flex justify-between w-[400px] px-3 py-4 items-center">
//         <h2 className='text-white text-2xl'>Employees</h2>
//         <span className='text-red-500'>View all</span>
//     </div>
//     <div className='flex flex-col px-4 mt-2'>
//       <div className="flex justify-between bg-zinc-950 rounded-2xl px-2 py-4 items-center">
//         <div className=" flex gap-2 items-center">
//             <div className="rounded-full  bg-red-500 h-10 w-10 justify-center text-white flex items-center">
//               AD
//             </div>
//             <div>
//               <p className='text-white'>Ayan Hashmi</p>
//               <span className='text-zinc-500 task-sm'>3 task assign</span>
//             </div>
//         </div>
//         <p className='cursor-pointer bg-green-200 text-green-800 rounded-2xl px-4 py-2 border-green-900 border-2 hover:bg-green-300'>
//           Active
//         </p>
//       </div>
//     </div>
// </div>
//   )
// }

export default EmployeeStatus;
