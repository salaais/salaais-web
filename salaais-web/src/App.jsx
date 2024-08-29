import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { GlobalStyle } from "./style"

import Home from "./pages/Home/index"
import Profile from "./pages/Profile/index"
import Notifications from "./pages/Notifications/index"
import Settings from "./pages/Settings/index"
import SignUp from "./pages/Access/SignUp"
import SignIn from "./pages/Access/SignIn"
import User from "./pages/User"
import Admin from "./pages/Admin"

// cnd fontweasome
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* not logged */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* logged */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/Users" element={<User />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  )
}
