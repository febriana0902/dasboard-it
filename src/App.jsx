import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './app.css';
import Sidebar from "./component/Sidebar";
import Summary from './component/Summary';
import Contract from './component/Contract';
import DataCenter from './component/DataCenter';
import Mpti from './component/Mpti';
import Kpi from './component/Kpi';
import Upload from './component/Upload';
import Helpdesk from './component/Helpdesk';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <Router>
      <div className="app">
        {isSidebarOpen && <Sidebar />} {/* Render Sidebar if open */}
        <div className="content">
          <Routes>
            <Route 
              path="/summary" 
              element={<Summary toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} 
            />
            <Route path="/contract" element={<Contract />} />
            <Route path="/data-center" element={<DataCenter />} />
            <Route path="/mpti" element={<Mpti toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
            <Route path="/kpi" element={<Kpi toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
            <Route path="/upload" element={<Upload toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
            <Route path="/helpdesk" element={<Helpdesk toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
