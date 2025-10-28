import { BarChart3, Home, Settings } from "lucide-react"
import Overview from "./pages/Overview.jsx"
import Analytics from "./pages/Analytics.jsx"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen p-4 text-gray-800">
        <div className="w-full h-full flex gap-4">
          <div className="bg-gray-100  rounded-2xl shadow-md w-64 p-4 flex flex-col">
            <Sidebar />
          </div>
          <main className="flex-1 bg-gray-100 rounded-2xl shadow-md p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        </div> 
      </div>
    </BrowserRouter>
  )
}

export default App
