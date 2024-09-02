import { useState } from "react";
import './css/Finance.css';
import menu from './asset/menu-sidebar.png';
import BarChartOp from "./barChart/BarChartFinanceOp";
import BarChartCogs from "./barChart/BarChartFinanceCogs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

// Dummy data for demonstration
const data = [
    { asesmen: "A", workOrder: "WO001", description: "Task A", status: "Ongoing" },
    { asesmen: "B", workOrder: "WO002", description: "Task B", status: "Done" },
    // Add more data here...
];

const Finance = ({ toggleSidebar, isSidebarOpen }) => {
    // Filter
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Filter data
    const filteredData = data.filter(item => {
        return (
            item.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Pagination calculations
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

    return (
        <div className="finance-content">
            <div className='finance-navbar'>
                <div className='title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>Finance</h2>
                </div>

                <div className="f-filter">
                    <div className="f-filter-year">
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

            {selectedYear === currentYear.toString() && (
                <div className='finance-container'>
                    <div><BarChartOp selectedYear={selectedYear} /></div>
                    <div><BarChartCogs /></div>
                    
                    <div className="f-table">
                        <h1 className="title-table">Expense</h1>
                        <div className="f-table-container">

                            <div className='f-group-search'>
                                <div className="f-dropdown-container">
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

                                <div className="f-search-container">
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <table className="f-table-auto">
                                <thead>
                                    <tr>
                                        <th>Asesmen</th>
                                        <th>Work Order</th>
                                        <th>Description</th>
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

                            <div className="f-info-container">
                                <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                                <div className="f-pagination-container">
                                    <FontAwesomeIcon icon={faAnglesLeft} onClick={handlePreviousPage} />
                                    <span>{currentPage}</span>
                                    <FontAwesomeIcon icon={faAnglesRight} onClick={handleNextPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="f-grid">
                        <h1 className="title-grid">Aset TI</h1>
                        <div className="f-grid-container">
                            <div className="f-grid-item1">
                                <h3>0.00 M</h3>
                                <p>Anggaran</p>
                            </div>
                            <div className="f-grid-item2">
                                <h3>0.00 M</h3>
                                <p>Realisasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finance;
