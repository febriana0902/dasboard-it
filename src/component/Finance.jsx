import { useState } from "react";
import { useContractData } from './DataContext';
import './css/Finance.css';
import menu from './asset/menu-sidebar.png';
import BarChartOp from "./barChart/BarChartFinanceOp";
import BarChartCogs from "./barChart/BarChartFinanceCogs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';


const Finance = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { recipes } = useContractData();
    if (!recipes) return <div>Loading...</div>;

    const ratings = recipes.map(recipe => recipe.rating);
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / ratings.length;
    const rating = averageRating.toFixed(2);

    const totalReviewCount = recipes.reduce((accumulator, recipe) => accumulator + recipe.reviewCount, 0);


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
    const filteredData = recipes.filter(recipe => {
        return (
            recipe.id.toString().includes(searchTerm.toLowerCase()) ||
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.cookTimeMinutes.toString().includes(searchTerm.toLowerCase()) ||
            recipe.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Pagination calculations
    const maxPage = Math.ceil(filteredData.length / entriesPerPage);
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
                <div className='f-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>FINANCE</h2>
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
                    <div><BarChartOp recipes={recipes}/></div>
                    <div><BarChartCogs recipes={recipes}/></div>
                    
                    <div className="f-table">
                        <h1 className="title-table">Data Recipe</h1>
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
                                        <th>Id</th>
                                        <th>Nama</th>
                                        <th>Waktu Masak</th>
                                        <th>Kesulitan</th>
                                        <th>Masakan</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.length > 0 ? (
                                        displayedData.map((recipe) => (
                                            <tr key={recipe.id}>
                                                <td>{recipe.id}</td>
                                                <td>{recipe.name}</td>
                                                <td>{recipe.cookTimeMinutes}</td>
                                                <td>{recipe.difficulty}</td>
                                                <td>{recipe.cuisine}</td>
                                            
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
                                <p>
                                Showing {startIndex + 1} to {endIndex} of {filteredData.length} entries
                                </p>
                                <div className="f-pagination-container">
                                <FontAwesomeIcon
                                    icon={faAnglesLeft}
                                    onClick={handlePreviousPage}
                                    style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
                                />
                                <span>{currentPage}</span>
                                <FontAwesomeIcon
                                    icon={faAnglesRight}
                                    onClick={handleNextPage}
                                    style={{ cursor: currentPage < maxPage ? 'pointer' : 'not-allowed' }}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="f-grid">
                        <h1 className="title-grid">Jumlah Rating dan Review</h1>
                            <div className="f-grid-container">
                                <div className="f-grid-item1">
                                    <h3>{rating}</h3>
                                    <p>Ratings</p>
                                </div>
                                <div className="f-grid-item2">
                                    <h3>{totalReviewCount}</h3>
                                    <p>Review</p>
                                </div>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finance;
