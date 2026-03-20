const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor"/>
        <rect x="9" y="1" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="1" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".5"/>
        <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity=".2"/>
      </svg>
    )
  },
  {
    to: "/admin/employees",
    label: "Employees",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2.5 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    to: "/admin/tasks",
    label: "Tasks",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="1.5" y1="6" x2="13.5" y2="6" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="4" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    to: "/admin/submissions",
    label: "Submissions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 11l3-4 3 2.5 4-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    to: "/admin/reports",
    label: "Reports",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="2" y="1" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="4.5" y1="5" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="4.5" y1="7.5" x2="10.5" y2="7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="4.5" y1="10" x2="7.5" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default navItems