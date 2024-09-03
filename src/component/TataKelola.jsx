import { useState, useEffect } from 'react';
import './CSS/TataKelola.css';
import menu from './asset/menu-sidebar.png';
import BarChart1 from './barChart/BarChartKelola1';
import BarChart2 from './barChart/BarChartKelola2';
import BarChart3 from './barChart/BarChartKelola3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const TataKelola = ({ toggleSidebar, isSidebarOpen }) => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item => {
        return (
            item.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.pic.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const maxPage = Math.ceil(filteredData.length / entriesPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };


    const currentYear = new Date().getFullYear();
    const monthIndex = new Date().getMonth(); // 0-based index for month
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentMonth = monthNames[monthIndex];
  
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
   const handleMonthChange = (e) => {
     setSelectedMonth(e.target.value);
   };
  
   const handleYearChange = (e) => {
     setSelectedYear(e.target.value);
   };
  
   useEffect(() => {
     console.log(`Menampilkan data untuk ${selectedMonth} ${selectedYear}`);
   }, [selectedMonth, selectedYear]);

    return (
        <div>
            <div className="kelola-content">
                <div className="kelola-navbar">
                        <div className="t-title">
                            <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                            <h2>TATA KELOLA</h2>
                        </div>
                        
                        <div className="t-filter-container">
                            <div className="t-filter-month">
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
                            <div className="t-filter-year">
                                <select id="year" value={selectedYear} onChange={handleYearChange}>
                                    <option value={currentYear}>{currentYear}</option>
                                    <option value={currentYear - 1}>{currentYear - 1}</option>
                                    <option value={currentYear - 2}>{currentYear - 2}</option>
                                    <option value={currentYear - 3}>{currentYear - 3}</option>
                                    <option value={currentYear - 4}>{currentYear - 4}</option>
                                </select>
                            </div>
                        </div>
                </div>

                <div className='t-group-tabel-bar'>
                    <div className='t-bar'>
                        <div className='t-background-bar'>
                            <p>ITML</p>
                            <BarChart1 />
                        </div>
                        <div className='t-background-bar'>
                            <p>CSM</p>
                            <BarChart2 />
                        </div>
                        <div className='t-background-bar'>
                            <p>INDI</p>
                            <BarChart3 />
                        </div>
                    </div>

                    <div className='t-tabel'>
                        {selectedMonth === currentMonth && selectedYear === currentYear.toString() && (
                            <div className="t-table-container">
                                <div className='t-group-search'>
                                    <div className="t-dropdown-container">
                                        <label htmlFor="entries">Show </label>
                                        <select
                                            id="entries"
                                            value={entriesPerPage}
                                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                            <option value={50}>50</option>
                                        </select>
                                        <label> entries</label>
                                    </div>

                                    <div className="t-search-container">
                                        <input
                                            type="text"
                                            id="search-input"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <table className="t-table-auto">
                                    <thead>
                                        <tr>
                                            <th>Asesmen</th>
                                            <th>Domain</th>
                                            <th>Rekomendasi</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedData.length > 0 ? (
                                            displayedData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.asesmen}</td>
                                                    <td>{item.workOrder}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.status}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="t-info-container">
                                    <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                                    <div className="t-pagination-container">
                                        <FontAwesomeIcon icon={faAnglesLeft} onClick={handlePreviousPage} />
                                        <span>{currentPage}</span>
                                        <FontAwesomeIcon icon={faAnglesRight} onClick={handleNextPage} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TataKelola;