import { useState, useEffect } from 'react';
import './css/WorkOrder.css';
import menu from './asset/menu-sidebar.png';
import BarChart from './barChart/BarChartWorkOrder2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight  } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const WorkOrder = ({ toggleSidebar, isSidebarOpen }) => {
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
        const maxPage = Math.ceil(data.length / entriesPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };


    return(
        <div className="wko-content">
            <div className='wko-navbar'>
                <div className='w-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar}/>
                    <h2>WORK ORDER</h2>
                </div>

                <div className="w-filter-container">
                    <div className="w-filter-month">
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
                    <div className="w-filter-year">
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

            <div className='w-background-bar'>
                <BarChart />

                {selectedMonth === currentMonth && selectedYear === currentYear.toString() && (
                    <div className="w-table-container">

                        <div className='w-group-search'>
                            <div className="w-dropdown-container">
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

                            <div className="w-search-container">
                                <input
                                    type="text"
                                    id="search-input"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                        </div>

                        <table className="w-table-auto">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Work Order</th>
                                    <th>Description</th> 
                                    <th>Current State</th>
                                    <th>PIC</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>%Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.workOrder}</td>
                                            <td>{item.description}</td>
                                            <td>{item.currentState}</td>
                                            <td>{item.pic}</td>
                                            <td>{item.dueDate}</td>
                                            <td>{item.status}</td>
                                            <td>{item.progress}%</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center' }}>
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="w-info-container">
                            <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                            <div className="w-pagination-container">
                            <FontAwesomeIcon icon={faAnglesLeft} onClick={handlePreviousPage}/>
                            <span> 1</span>
                            <FontAwesomeIcon icon={faAnglesRight} onClick={handleNextPage}/>
                        </div>
                        </div>
                        <div className='w-update'>
                            <p>Last Update </p>
                            <p>Tidak Ada </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default WorkOrder;