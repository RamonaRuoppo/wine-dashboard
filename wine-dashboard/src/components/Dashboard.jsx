import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Overview from "../pages/Overview.jsx"
import Analytics from "../pages/Analytics.jsx"
import Sidebar from "./Sidebar.jsx"
import Settings from "../pages/Settings.jsx"
import Logistics from "../pages/Logistics.jsx"


const Dashboard = ({onLogout}) => {
    return (
      <div className="w-screen h-screen p-4 text-gray-800">
        <div className="w-full h-full flex gap-4">
          <div className="bg-gradient-to-b from-[#722F37] to-[#5A2530] text-white rounded-xl shadow-md w-64 p-4 flex flex-col">
            <Sidebar onLogout={onLogout} />
          </div>
          <main className="flex-1 bg-gray-100 dark:bg-gray-200 rounded-xl shadow-md p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        </div> 
      </div>
  )
}

export default Dashboard;