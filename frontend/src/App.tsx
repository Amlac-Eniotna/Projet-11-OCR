import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import User from "./pages/User"
import Header from "containers/Header"
import Footer from "containers/Footer"


let navData = [{
  fa: "fa fa-user-circle",
  text: "Sign In",
  path: "/login",
},{
  fa: "fa fa-sign-out",
  text: "Log Out",
  path: "/",
}]

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Header navData={navData}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <Footer/>
      </Router>
    </React.StrictMode>
  )
}

export default App
