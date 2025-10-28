import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Overview from "./Overview.jsx"
import Analytics from "./Analytics.jsx"
import Sidebar from "../components/Sidebar.jsx"
import Settings from "./Settings.jsx"


const Dashboard = ({onLogout}) => {
    return (
      <div className="w-screen h-screen p-4 text-gray-800">
        <div className="w-full h-full flex gap-4">
          <div className="bg-gray-100  rounded-2xl shadow-md w-64 p-4 flex flex-col">
            <Sidebar onLogout={onLogout} />
          </div>
          <main className="flex-1 bg-gray-100 rounded-2xl shadow-md p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        </div> 
      </div>
  )
}

export default Dashboard;