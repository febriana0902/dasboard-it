import { useState } from 'react';
import menu from './asset/menu-sidebar.png';
import './css/Helpdesk.css'; 
import BarChart2 from './barChart/BarCharHelp2';
import BarChart3 from './barChart/BarCharHelp3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Sample data for the table
const sampleData = [
    {
        ticketNo: "PPM1",
        title: "System Outage",
        organization: "IT Department",
        caller: "John Doe",
        startDate: "2024-09-01",
        status: "Open",
        serviceFamily: "Network",
        agent: "Agent Smith"
    },
    {
        ticketNo: "TI1",
        title: "Login Issue",
        organization: "HR",
        caller: "Jane Roe",
        startDate: "2024-09-02",
        status: "Open",
        serviceFamily: "Software",
        agent: "Agent Johnson"
    },
    {
        ticketNo: "TI2",
        title: "Password Reset",
        organization: "Finance",
        caller: "Alice Brown",
        startDate: "2024-09-03",
        status: "Closed",
        serviceFamily: "Support",
        agent: "Agent Davis"
    },
    // Add more data as needed
];

const Helpdesk = ({ toggleSidebar, isSidebarOpen }) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedStatus, setSelectedStatus] = useState('Open');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(sampleData);
    const [currentPage, setCurrentPage] = useState(1);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredData = data.filter(item => {
        return (
            item.ticketNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.caller.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.serviceFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.agent.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }).filter(item => item.status === selectedStatus && item.startDate.startsWith(selectedYear));

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            console.log('Previous page clicked');
            setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        const maxPage = Math.ceil(filteredData.length / entriesPerPage);
        if (currentPage < maxPage) {
            console.log('Next page clicked');
            setCurrentPage(currentPage + 1);
        }
    };
    

    return (
        <div className="helpdesk-container">
            <div className="helpdesk-navbar">
                <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                <h2>IT HELPDESK</h2>

            </div>

            <div className='h-group-tabel-bar'>
                <div className='h-bar'>
                    <div className='h-background-bar'>
                        <div className="h-filter-container">
                            <select
                                className="h-dropdown"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <select
                                className="h-dropdown"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {[...Array(5).keys()].map(i => (
                                    <option key={currentYear - i} value={currentYear - i}>
                                        {currentYear - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <BarChart2 filteredData={filteredData} />
                    </div>
                    <div className='h-background-bar'>
                        <BarChart3 />
                    </div>
                </div>

                <div className='h-tabel'>
                    {selectedYear === currentYear.toString() && (
                        <div className="h-table-container">
                            <div className='h-group-search'>
                                <div className="h-dropdown-container">
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

                                <div className="h-search-container">
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <table className="h-table-auto">
                                <thead>
                                    <tr>
                                        <th>No Tiket</th>
                                        <th>Title</th>
                                        <th>Organization</th>
                                        <th>Caller</th>
                                        <th>Start Date</th>
                                        <th>Status</th>
                                        <th>Service Family</th>
                                        <th>Agent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.length > 0 ? (
                                        displayedData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ticketNo}</td>
                                                <td>{item.title}</td>
                                                <td>{item.organization}</td>
                                                <td>{item.caller}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.status}</td>
                                                <td>{item.serviceFamily}</td>
                                                <td>{item.agent}</td>
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
                            <div className="h-info-container">
                                <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                                <div className="h-pagination-container">
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
    );
};

export default Helpdesk;
