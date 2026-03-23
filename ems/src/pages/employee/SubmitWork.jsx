import React from 'react'
import Sidebar from '../../components/employee/Sidebar'
import Navbar from '../../components/employee/Navbar'
import SubmitWorkForm from '../../components/employee/SubmitWorkForm'

const SubmitWork = () => {
  return (
     <div className='flex h-screen bg-zinc-950 overflow-hidden'> 
    <Sidebar />
    <div className='flex flex-col  flex-1 overflow-hidden'>
      <Navbar title={"Submit Work"} subTitle={"Submit your completed work"} btnText=''/>
      <main className='flex-1 overflow-y-auto  p-6'>
        <SubmitWorkForm />
      </main>
    </div>
    </div>
  )
}

export default SubmitWork