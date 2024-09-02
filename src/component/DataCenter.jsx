import menu from './asset/menu-sidebar.png';
import './css/DataCenter.css';
import { useState, useEffect } from "react";
import BarChart from './barChart/BarChartData1';
import BarChart2 from './barChart/BarChartData2';
import BarChart3 from './barChart/BarChartData3';
import BarChart4 from './barChart/BarChartData4';

const DataCenter = ({ toggleSidebar, isSidebarOpen }) => {
  //card 1
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    console.log(`Menampilkan data untuk ${selectedYear}`);
  }, [selectedYear]);


  //card 2
  const currentYear2 = new Date().getFullYear();

  const [selectedYear2, setSelectedYear2] = useState(currentYear2.toString());

  const handleYearChange2 = (e) => {
    setSelectedYear2(e.target.value);
  };

  useEffect(() => {
    console.log(`Menampilkan data untuk  ${selectedYear2}`);
  }, [selectedYear2]);

  //card 3
  const currentYear3 = new Date().getFullYear();
  const [selectedYear3, setSelectedYear3] = useState(currentYear3.toString());
  const [selectedServer, setSelectedServer] = useState('all');

  const handleYearChange3 = (e) => {
    setSelectedYear3(e.target.value);
  };

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value);
  };

  useEffect(() => {
    console.log(`Menampilkan data untuk ${selectedYear3}`);
  }, [selectedYear3]);

  //card 4
  const currentYear4 = new Date().getFullYear();
  const monthIndex = new Date().getMonth(); // 0-based index for month
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const currentMonth = monthNames[monthIndex];

  const [selectedYear4, setSelectedYear4] = useState(currentYear4.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

 const handleMonthChange = (e) => {
   setSelectedMonth(e.target.value);
 };

 const handleYearChange4 = (e) => {
   setSelectedYear4(e.target.value);
 };

 useEffect(() => {
   console.log(`Menampilkan data untuk ${selectedMonth} ${selectedYear4}`);
 }, [selectedMonth, selectedYear4]);

    return (
      <div className="data-content">

          <div className="title">
            <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
            <h2>Data Center</h2>
          </div>

          <div className='container'>

            {/* card 1 */}
            {selectedYear === currentYear.toString() && (
              <div className='item'>

                <div className='top-dc'>
                  <p>UPTIME SERVER</p>
                  <div className="filter-year-dc">
                    <select id="year" value={selectedYear} onChange={handleYearChange}>
                      <option value={currentYear}>{currentYear}</option>
                      <option value={currentYear - 1}>{currentYear - 1}</option>
                      <option value={currentYear - 2}>{currentYear - 2}</option>
                      <option value={currentYear - 3}>{currentYear - 3}</option>
                      <option value={currentYear - 4}>{currentYear - 4}</option>
                    </select>
                  </div>

                </div>
                <BarChart />

              </div>  
            )}

            {/* card 2 */}
            {selectedYear2 === currentYear2.toString() && (
              <div className='item'>
                <div className='top-dc'>
                  <p>SWICTH TRAFFIC</p>
                  <div className="filter-year-dc">
                    <select id="year" value={selectedYear2} onChange={handleYearChange2}>
                      <option value={currentYear2}>{currentYear2}</option>
                      <option value={currentYear2 - 1}>{currentYear2 - 1}</option>
                      <option value={currentYear2 - 2}>{currentYear2 - 2}</option>
                      <option value={currentYear2 - 3}>{currentYear2 - 3}</option>
                      <option value={currentYear2 - 4}>{currentYear2 - 4}</option>
                    </select>
                  </div>

                </div>

                <BarChart2 />
              </div>
            )}

            {/* card 3 */}
            {selectedServer && selectedYear3 === currentYear.toString() && (
              <div className='item'>
                <div className='top-dc'>
                    <p>SERVER ULTILIZATION</p>

                    <div className='filter-dc'>
                      <div className="filter-year-dc">
                        <select id="year" value={selectedYear3} onChange={handleYearChange3}>
                          <option value={currentYear3}>{currentYear3}</option>
                          <option value={currentYear3 - 1}>{currentYear3 - 1}</option>
                          <option value={currentYear3 - 2}>{currentYear3 - 2}</option>
                          <option value={currentYear3 - 3}>{currentYear3 - 3}</option>
                          <option value={currentYear3 - 4}>{currentYear3 - 4}</option>
                        </select>
                      </div>

                      <div className='server'>
                        <select id="server" value={selectedServer} onChange={handleServerChange}>
                          <option value="all">All Server</option>
                          <option value="serv1">Server 1</option>
                          <option value="serv2">Server 2</option>
                          <option value="serv3">Server 3</option>
                        </select>
                      </div>
                    </div>
                    
                </div>

                <BarChart3 />
              </div>
            )}

            {/* card 4 */}
            {selectedMonth === currentMonth && selectedYear4 === currentYear.toString() && (
              <div className='item'>

                <div className='top-dc'>
                  <p>UPS LIFE TIME</p>

                  <div className='filter-dc'>
                    <div className="filter-month-dc">
                      <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                      </select>
                    </div>

                    <div className="filter-year-dc">
                      <select id="year" value={selectedYear4} onChange={handleYearChange4}>
                        <option value={currentYear4}>{currentYear4}</option>
                        <option value={currentYear4 - 1}>{currentYear4 - 1}</option>
                        <option value={currentYear4 - 2}>{currentYear4 - 2}</option>
                        <option value={currentYear4 - 3}>{currentYear4 - 3}</option>
                        <option value={currentYear4 - 4}>{currentYear4 - 4}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <BarChart4 />
              </div>
            )}

          </div>
        
      </div>
      
    )
  };
  
  export default DataCenter;