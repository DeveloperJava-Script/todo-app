import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
