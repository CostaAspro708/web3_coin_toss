import { useState } from 'react'
import { Navbar, Welcome, Footer, Services, Transactions, Header } from './components'
const App = () => {

  return (
    <div className="">
      <div className="gradient-bg-welcome">
        test
        {/* <Navbar /> */}
        <Header/>
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
