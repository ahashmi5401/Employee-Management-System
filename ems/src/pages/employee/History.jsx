import React from "react";
import Sidebar from "../../components/employee/Sidebar";
import Navbar from "../../components/employee/Navbar";
import StatList from "../../components/admin/StatList";
import { useEmployeeStats } from "../../hooks/useEmployeeStats";
import { getHistoryStats } from "../../data/employee/EmployeeStatConfig";
import HistoryTable from "../../components/employee/HistoryTable";

const History = () => {
  const stats = useEmployeeStats();

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar title="History" subTitle="Your submission history" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollBar">
          <div className="flex flex-col gap-4">
            <StatList data={getHistoryStats(stats)} cols={"grid-cols-3"} />
            <HistoryTable /> {/* ya MyTaskTable ya koi bhi */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
