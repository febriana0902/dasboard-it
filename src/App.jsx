import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ContractProvider } from './component/DataContext';
import './app.css';
import './index.css';
import Sidebar from "./component/Sidebar";
import Summary from './component/Summary';
import Contract from './component/Contract';
import DataCenter from './component/DataCenter';
import Learning from "./component/Learning";
import Finance from "./component/Finance";
import Rka from "./component/Rka";
import WorkOrder from "./component/WorkOrder";
import TataKelola from "./component/TataKelola";
import Helpdesk from "./component/Helpdesk";
import Kpi from "./component/Kpi";
import Mpti from "./component/Mpti";
import Upload from "./component/Upload";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <ContractProvider>
      <Router>
          <div className="app">
            {isSidebarOpen && <Sidebar />}
            
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
                <Route path="/helpdesk" element={<Helpdesk toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/kpi" element={<Kpi toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/rka" element={<Rka toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/mpti" element={<Mpti toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/finance" element={<Finance toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/tata-kelola" element={<TataKelola toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/work-order" element={<WorkOrder toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
                <Route path="/upload" element={<Upload toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
              </Routes>
            </div>
          </div>
      </Router>
    </ContractProvider>
    
  );
}

export default App;
