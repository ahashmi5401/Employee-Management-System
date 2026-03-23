import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    totalSubmissions: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
    totalReports: 0,
    taskReports: 0,
    thisMonthReports:0,
    submissionReports:0,
    totalAdmins : 0
  });

  useEffect(() => {
    // Employees count
    const empRef = ref(db, "users");
    onValue(empRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const users = Object.values(data).filter(
          (u) => u.role === "employee" || "admin",
        );
        const employees = users.filter(u => u.role === 'employee')
        const admins = users.filter(u => u.role === 'admin' || u.role === 'superadmin')
        console.log('admins:', admins) 
        setStats((prev) => ({ ...prev,
           totalEmployees: employees.length ,
           totalAdmins : admins.length
          }));
      }
    });

    // Tasks count
    const taskRef = ref(db, "tasks");
    onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tasks = Object.values(data);
        setStats((prev) => ({
          ...prev,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t) => t.status === "Completed").length,
          pendingTasks: tasks.filter((t) => t.status === "Pending").length,
          highPriorityTasks: tasks.filter((t) => t.priority === "High").length,
        }));
      }
    });

    // Submissions count
    const subRef = ref(db, "submissions");
    onValue(subRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const subs = Object.values(data);
        setStats((prev) => ({
          ...prev,
          totalSubmissions: subs.length,
          pendingSubmissions: subs.filter((s) => s.status === "Pending").length,
          approvedSubmissions: subs.filter((s) => s.status === "Approved")
            .length,
          rejectedSubmissions: subs.filter((s) => s.status === "Rejected")
            .length,
        }));
        //report count
        const reportRef = ref(db, "reports");
        onValue(reportRef, (snapshot) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            let reports = Object.values(data);
            setStats((prev) => ({
              ...prev,
              totalReports: reports.length,
              taskReports: reports.filter((r) => r.type === "Task").length,
              employeeReports: reports.filter((r) => r.type === "Employee")
                .length,
              submissionReports: reports.filter((r) => r.type === "Submission")
                .length,
              thisMonthReports: reports.filter((r) => {
                const date = new Date(r.generatedAt);
                const now = new Date();
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              }).length,
            }));
          }
        });
      }
    });
  }, []);

  return stats;
};
