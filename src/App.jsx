import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import './app.css';
import './index.css';
import Sidebar from "./component/Sidebar";
import Summary from './component/Summary';
import Contract from './component/Contract';
import DataCenter from './component/DataCenter';
import Learning from "./component/Learning";
import Finance from "./component/Finance";
import Rka from "./component/Rka"
import WorkOrder from "./component/WorkOrder";
import TataKelola from "./component/TataKelola";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mengontrol sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar
  };

  return (
    <>
      <Router>
        <div className="app">
          {isSidebarOpen && <Sidebar />} {/* Render Sidebar jika terbuka */}
          
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/summary" />} />
              <Route 
                path="/summary" 
                element={<Summary toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} 
              />
              <Route path="/contract" element={<Contract toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/data-center" element={<DataCenter toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/e-learning" element={<Learning toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/rka" element={<Rka toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/finance" element={<Finance toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/tata-kelola" element={<TataKelola toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              <Route path="/work-order" element={<WorkOrder toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
