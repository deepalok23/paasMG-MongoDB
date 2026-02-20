import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'



function App() {

  return (
    <>
     <Navbar/>
     <div className=" flex min-h-[89.7vh] md:min-h-[86vh] flex-col  ">
     <Manager/>
     </div>
     <Footer/>
    </>
  )
}

export default App
