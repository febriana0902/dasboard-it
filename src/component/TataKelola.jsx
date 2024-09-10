import { useState, useEffect } from 'react';
import { useContractData } from './DataContext';
import './CSS/TataKelola.css';
import menu from './asset/menu-sidebar.png';
import BarChart1 from './barChart/BarChartKelola1';
import BarChart2 from './barChart/BarChartKelola2';
import BarChart3 from './barChart/BarChartKelola3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const TataKelola = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { recipes } = useContractData(); // Ganti 'carts' menjadi 'recipes'
    if (!recipes) return <div>Loading...</div>;

    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(''); // State untuk produk yang dipilih

    const filteredData = data.filter(item => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Tetap saring berdasarkan search term
            (selectedProduct === '' || item.name === selectedProduct) // Menambahkan filter berdasarkan produk yang dipilih
        );
    });
    
    useEffect(() => {
        if (filteredData.length === 0) {
          setCurrentPage(1);
        } else {
          const maxPage = Math.ceil(filteredData.length / entriesPerPage);
          if (currentPage > maxPage) {
            setCurrentPage(maxPage);
          }
        }
      }, [searchTerm, filteredData, entriesPerPage, currentPage]);

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

    useEffect(() => {
        setData(recipes); // Set data ke 'recipes'
    }, [recipes]);

    // Menyaring data berdasarkan produk yang dipilih
    const selectedData = selectedProduct
        ? recipes.filter(recipe => recipe.name === selectedProduct)
        : recipes;

    // Mengambil label dan data untuk BarChart1
    const barLabels = selectedData.map(recipe => recipe.name);
    const barData = selectedData.map(recipe => recipe.prepTimeMinutes);

    // Mengambil label dan data untuk BarChart2
    const barLabels2 = selectedData.map(recipe => recipe.name);
    const barData2 = selectedData.map(recipe => recipe.cookTimeMinutes);

    // Mengambil label dan data untuk BarChart3
    const barLabels3 = selectedData.map(recipe => recipe.name);
    const barData3 = selectedData.map(recipe => recipe.caloriesPerServing);

    return (
        <div>
            <div className="kelola-content">
                <div className="kelola-navbar">
                    <div className="t-title">
                        <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                        <h2>TATA KELOLA</h2>
                    </div>
                    
                    <div className="t-filter-container">
                        <div className="t-filter-product">
                            <select
                                id="product"
                                value={selectedProduct} // Menggunakan state untuk produk yang dipilih
                                onChange={(e) => setSelectedProduct(e.target.value)} // Update state saat produk dipilih
                            >
                                <option value="">Pilih Produk</option>
                                {recipes.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='t-group-tabel-bar'>
                    <div className='t-bar'>
                        <div className='t-background-bar'>
                            <p>Prep Time Product</p>
                            <BarChart1 data={barData} labels={barLabels} />
                        </div>
                        <div className='t-background-bar'>
                            <p>Cook Time Product</p>
                            <BarChart2 data={barData2} labels={barLabels2}/>
                        </div>
                        <div className='t-background-bar'>
                            <p>Calories Per Serving</p>
                            <BarChart3 data={barData3} labels={barLabels3}/>
                        </div>
                    </div>

                    <div className='t-tabel'>
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
                                        <th>Id</th>
                                        <th>Nama</th>
                                        <th>Prep Time</th>
                                        <th>Cook Time</th>
                                        <th>Difficulty</th>
                                        <th>Serving</th>
                                        <th>Calories Per Serving</th>
                                        <th>Cuisine</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.length > 0 ? (
                                        displayedData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.prepTimeMinutes} mins</td>
                                                <td>{item.cookTimeMinutes} mins</td>
                                                <td>{item.difficulty}</td>
                                                <td>{item.servings}</td>
                                                <td>{item.caloriesPerServing} kcal</td>
                                                <td>{item.cuisine}</td>
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
                            <div className="t-info-container">
                                <p>Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries</p>
                                <div className="t-pagination-container">
                                    <FontAwesomeIcon  
                                        icon={faAnglesLeft} 
                                        onClick={handlePreviousPage} 
                                        style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}/>
                                    <span>{currentPage}</span>
                                    <FontAwesomeIcon 
                                        icon={faAnglesRight} 
                                        onClick={handleNextPage} 
                                        style={{ cursor: currentPage < maxPage ? 'pointer' : 'not-allowed' }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TataKelola;