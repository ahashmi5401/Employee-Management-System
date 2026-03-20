const SidebarIcon = [
  {
    to: '/employee/dashboard',
    text: 'Dashboard',
    section:'Overview',
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
    to: '/employee/tasks',
    text: 'My Tasks',
    section:'work',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="1.5" y1="6" x2="13.5" y2="6" stroke="currentColor" strokeWidth="1.3"/>
        <line x1="4" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    to: '/employee/submitWork',
    section:null,
    text: 'Submit Work',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 11l3-4 3 2.5 4-5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    to: '/employee/history',
    section:null,
    text: 'History',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <polyline points="7.5,4 7.5,7.5 9.5,9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    to: '/employee/profile',
    section:'Account',
    text: 'Profile',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2.5 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default SidebarIcon