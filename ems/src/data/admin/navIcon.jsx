// src/data/admin/NavbarIcons.js

export const getNavbarIcon = (btnText) => {
  if (btnText === 'Add Employee') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="white" strokeWidth="1.3"/>
        <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="12" y1="8" x2="12" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9" y1="11" x2="15" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }

  if (btnText === 'Assign Task') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="2" width="10" height="12" rx="2" stroke="white" strokeWidth="1.3"/>
        <line x1="4" y1="6" x2="9" y2="6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="4" y1="9" x2="7" y2="9" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="12" y1="8" x2="12" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9" y1="11" x2="15" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }

  if (btnText === 'Log Out') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="10" y1="8" x2="15" y2="8" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        <polyline points="12,5 15,8 12,11" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }

  // Default plus icon
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="8" y1="2" x2="8" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="2" y1="8" x2="14" y2="8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}