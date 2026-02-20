import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer  flex  justify-between items-center px-1 md:px-14 py-5 h-13">
            <div className="logo font-bold text-2xl ">
             <span className='text-green-600'>&lt;</span>
              Pass
             <span className='text-green-600'>MG/&gt;</span>
            </div>
    
            <button className=" flex  items-center gap-2 bg-green-700 rounded-full px-3 py-1 hover:bg-green-600">
                <img className="invert" src="src/assets/gthub.png" alt="" />
                <span>GitHub</span>
            </button>
        </div>
    </nav>
  )
}

export default Navbar
