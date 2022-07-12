import { useState } from 'react'
import { Navbar, Welcome, Footer, Services, Transactions, Header, RecentBets } from './components'
const App = () => {

  return (
    <div className="">
      <div className="gradient-bg-welcome">
        test
        {/* <Navbar /> */}
        <Header/>
        <Welcome />
      
      <RecentBets/>
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
