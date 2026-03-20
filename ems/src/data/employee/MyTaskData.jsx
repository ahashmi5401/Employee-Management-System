const MyTaskData = [
  {
    id: 1,
    title: "Fix Login Bug",
    desc: "Authentication issue on production server",
    dueDate: "14 Feb",
    priority: "High",
    priorityStyle: "bg-red-500/10 text-red-400 border border-red-500/20",
    status: "Pending",
    statusStyle: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    borderLeft: "border-l-4 border-red-500",
    progress: 60,
    progressColor: "bg-amber-500",
    notification: {
      msg: "Deadline approaching — 1 day left",
      time: "1 day left",
      dotColor: "#f59e0b",
    },
    submission: {
      submittedAt: "2 days ago",
      hours: 4,
      adminNote: "Good progress but fix the token validation.",
    }
  },
  {
    id: 2,
    title: "Update Dashboard UI",
    desc: "Redesign layout according to Figma",
    dueDate: "18 Feb",
    priority: "Medium",
    priorityStyle: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    status: "Pending",
    statusStyle: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    borderLeft: "border-l-4 border-amber-500",
    progress: 40,
    progressColor: "bg-blue-500",
    notification: {
      msg: "Task updated by Admin",
      time: "3 hrs ago",
      dotColor: "#a855f7",
    },
    submission: {
      submittedAt: "5 days ago",
      hours: 6,
      adminNote: "Looks clean! Minor spacing issues to fix.",
    }
  },
  {
    id: 3,
    title: "Write Unit Tests",
    desc: "Frontend components testing",
    dueDate: "25 Feb",
    priority: "Low",
    priorityStyle: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
    status: "Completed",
    statusStyle: "bg-green-500/10 text-green-400 border border-green-500/20",
    borderLeft: "border-l-4 border-green-500",
    progress: 100,
    progressColor: "bg-green-500",
    notification: {
      msg: "Submission approved by Admin",
      time: "2 hrs ago",
      dotColor: "#22c55e",
    },
    submission: {
      submittedAt: "2 days ago",
      hours: 4,
      adminNote: "Great work! All tests passing with 90% coverage.",
    }
  },
  {
    id: 4,
    title: "API Integration",
    desc: "Payment gateway setup",
    dueDate: "20 Feb",
    priority: "High",
    priorityStyle: "bg-red-500/10 text-red-400 border border-red-500/20",
    status: "Failed",
    statusStyle: "bg-red-500/10 text-red-400 border border-red-500/20",
    borderLeft: "border-l-4 border-red-500",
    progress: 10,
    progressColor: "bg-red-500",
    notification: {
      msg: "Submission rejected — needs revision",
      time: "Yesterday",
      dotColor: "#dc2626",
    },
    submission: {
      submittedAt: "5 days ago",
      hours: 8,
      adminNote: "Webhook config incomplete. Fix and resubmit.",
    }
  },
  {
    id: 5,
    title: "Database Backup",
    desc: "Schedule full database backup",
    dueDate: "22 Feb",
    priority: "High",
    priorityStyle: "bg-red-500/10 text-red-400 border border-red-500/20",
    status: "Completed",
    statusStyle: "bg-green-500/10 text-green-400 border border-green-500/20",
    borderLeft: "border-l-4 border-red-500",
    progress: 100,
    progressColor: "bg-green-500",
    notification: {
      msg: "New task assigned by Admin",
      time: "10 min ago",
      dotColor: "#dc2626",
    },
    submission: {
      submittedAt: "1 week ago",
      hours: 2,
      adminNote: "Backup completed successfully. Well done.",
    }
  },
]

export default MyTaskData