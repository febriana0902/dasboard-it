import { useState } from "react";
import { useContractData } from './DataContext';
import './css/Learning.css';
import menu from './asset/menu-sidebar.png';
import Tabung from "./pieChart/TabungLearning";
import BarChart from "./barChart/BarChartLearning";

const Learning = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { products } = useContractData();
    if (!products) return <div>Loading...</div>;

    const maxRating = 5;

    // Get unique brands from products
    const uniqueBrands = [...new Set(products.map(product => product.brand))];

    const [selectedBrand, setSelectedBrand] = useState("");

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    // Filter products based on selected month and brand
    const filteredProducts = products.filter(product => 
        (selectedBrand === "" || product.brand === selectedBrand)
    );

    return (
        <div className="learning-content">
            <div className='learning-navbar'>
                <div className='l-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>E-LEARNING</h2>
                </div>

                <div className="l-filter">
                    <div className="l-filter-brand">
                        <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
                            <option value="">Pilih Brand</option>
                            {uniqueBrands.map((brand, idx) => (
                                <option key={idx} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='learning-container'>
                <div className='l-grid-group'>
                    <div className='l-group-1'>
                        <h3>Produk Berdasarkan Merek</h3>
                        <BarChart products={filteredProducts} />
                    </div>

                    <div className='l-group-2'>
                        <h3>Jumlah Stock</h3>
                        <Tabung products={filteredProducts} />
                    </div>
                </div>

                <div className='l-group-3'>
                    <h3>Rating Produk Berdasarkan Tag</h3>

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <div className="l-flex" key={index}>
                                <p className="l-label-teks">{product.title}</p>
                                <div className="l-progress-bar">
                                    <div className="l-progress-bar-fill" style={{ width: `${(product.rating / maxRating) * 100}%` }}>
                                        <span className="l-progress-bar-label">{product.rating}</span>
                                    </div>
                                </div>
                                <p className="l-label-teks">{product.tags.join(', ')}</p>
                            </div>
                        ))
                    ) : (
                        <div>No Data Available</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;
