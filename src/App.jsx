import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './app.css';
import Sidebar from "./component/Sidebar";
import Summary from './component/Summary';
import Contract from './component/Contract';
import DataCenter from './component/DataCenter';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

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
              <Route 
                path="/summary" 
                element={<Summary toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} 
              />
              <Route path="/contract" element={<Contract />} />
              <Route path="/data-center" element={<DataCenter />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
