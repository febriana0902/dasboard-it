import { useState } from 'react';
import { useContractData } from './DataContext';
import menu from './asset/menu-sidebar.png';
import './css/Helpdesk.css'; 
import BarChart2 from './barChart/BarCharHelp2';
import BarChart3 from './barChart/BarCharHelp3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";


const Helpdesk = ({ toggleSidebar, isSidebarOpen }) => {
    //mengambil data 
    const { todos } = useContractData();
    if (!todos) return <div>Loading...</div>;
    console.log(todos);

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedStatus, setSelectedStatus] = useState('True');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    // const [data, setData] = useState(sampleData);
    const [currentPage, setCurrentPage] = useState(1);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const filteredData = todos.filter(todo => {
        // Filter berdasarkan status yang dipilih (True atau False)
        const statusMatch = selectedStatus === 'True' 
            ? todo.completed === true 
            : todo.completed === false;
    
        // Filter berdasarkan pencarian (searchTerm)
        const searchMatch = 
            todo.id.toString().includes(searchTerm) || 
            todo.todo.toLowerCase().includes(searchTerm.toLowerCase()) || 
            todo.completed.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.userId.toString().includes(searchTerm)
    
        // Mengembalikan hasil filter gabungan antara status dan pencarian
        return statusMatch && searchMatch;
    });
    
    

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
                                <option value="True">True</option>
                                <option value="False">False</option>
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
                        <BarChart2 filteredData={filteredData} todos={todos}/>
                    </div>
                    <div className='h-background-bar'>
                        <BarChart3 todos={todos}/>
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
                                        <th>Id</th>
                                        <th>Todo</th>
                                        <th>Completed</th>
                                        <th>User Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.length > 0 ? (
                                        displayedData.map((todo) => (
                                            <tr key={todo.id}>
                                                <td>{todo.id}</td>
                                                <td>{todo.todo}</td>
                                                <td>{todo.completed ? "True" : "False"}</td>
                                                <td>{todo.userId}</td>
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
