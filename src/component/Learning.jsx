import { useState } from "react";
import { useContractData } from './DataContext';
import './css/Learning.css';
import menu from './asset/menu-sidebar.png';
import PieChartLearning from "./pieChart/PieChartLearning";
import BarChart from "./barChart/BarChartLearning";

const Learning = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { products } = useContractData();
    if (!products) return <div>Loading...</div>;

    const maxRating = 5;

    const currentYear = new Date().getFullYear();
    const monthIndex = new Date().getMonth(); // 0-based index for month
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentMonth = monthNames[monthIndex];

    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className="learning-content">
            <div className='learning-navbar'>
                <div className='l-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>E-LEARNING</h2>
                </div>

                <div className="l-filter">
                    <div className="l-filter-month">
                        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                            {monthNames.map((month, idx) => (
                                <option key={idx} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div className="l-filter-year">
                        <select id="year" value={selectedYear} onChange={handleYearChange}>
                            {[...Array(5)].map((_, idx) => (
                                <option key={idx} value={currentYear - idx}>{currentYear - idx}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedMonth === currentMonth && selectedYear === currentYear.toString() && (
                <div className='learning-container'>
                    <div className='l-grid-group'>
                        <div className='l-group-1'>
                            <h3>Produk Berdasarkan Merek</h3>
                            <BarChart  products= {products}/>
                        </div>

                        <div className='l-group-2'>
                            <h3>Jumlah Stock</h3>
                            <PieChartLearning products= {products}/>
                        </div>
                    </div>

                    <div className='l-group-3'>
                        <h3>Rating Produk Berdasarkan Tag</h3>

                        {products.length > 0 ? (
                            products.map((product, index) => (
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
            )}
        </div>
    );
}

export default Learning;
