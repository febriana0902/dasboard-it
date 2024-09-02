import React, { useState, useEffect } from "react";
import menu from './asset/menu-sidebar.png';
import './css/Mpti.css';

const Mpti = ({ toggleSidebar, isSidebarOpen }) => {
    const Mpti = ({ toggleSidebar, isSidebarOpen }) => {
        useEffect(() => {
            const content = document.querySelector('.m-content');
            if (isSidebarOpen) {
                content.style.width = 'calc(100% - 40px)';
            } else {
                content.style.width = '100%';
            }
        }, [isSidebarOpen]);
    
        // ... rest of your component
    };
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const defaultYear = "2024";

    const [selectedYear, setSelectedYear] = useState(defaultYear);
    const [startYear, setStartYear] = useState("2023");
    const [endYear, setEndYear] = useState("2024");
    const [showImplementations, setShowImplementations] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (startYear === "2023" && endYear === "2024") {
            setShowImplementations(true);
        }
    }, [startYear, endYear]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleStartYearChange = (e) => {
        setStartYear(e.target.value);
    };

    const handleEndYearChange = (e) => {
        setEndYear(e.target.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowImplementations(true);
    };

    const getValueClass = (progress) => {
        if (progress >= 70) return 'value-high';
        if (progress >= 50) return 'value-medium';
        return 'value-low';
    };

    const renderCardsForCategory = () => {
        switch (selectedCategory) {
            case "Industry 4.0":
                return Array.from({ length: 10 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI INDUSTRY 4.0</div>
                        <div>Detail Kategori Industry 4.0</div>
                        <div className={`value ${getValueClass(index * 10)}`}>
                            {index * 10}%
                        </div>
                    </div>
                ));
            case "Infrastruktur":
                return Array.from({ length: 3 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI INFRASTRUKTUR</div>
                        <div>Detail Kategori Infrastruktur</div>
                        <div className={`value ${getValueClass(index * 30)}`}>
                            {index * 30}%
                        </div>
                    </div>
                ));
            case "Inovasi Solusi & Cyber Security":
                return Array.from({ length: 4 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI INOVASI & CYBER SECURITY</div>
                        <div>Detail Kategori Inovasi Solusi</div>
                        <div className={`value ${getValueClass(index * 25)}`}>
                            {index * 25}%
                        </div>
                    </div>
                ));
            case "Pengembangan Infrastruktur Kebutuhan Eksternal":
                return Array.from({ length: 2 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI INFRASTRUKTUR EKSTERNAL</div>
                        <div>Detail Kategori Pengembangan Eksternal</div>
                        <div className={`value ${getValueClass(index * 40)}`}>
                            {index * 40}%
                        </div>
                    </div>
                ));
            case "PINDAD Industry 4.0":
                return Array.from({ length: 4 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI PINDAD INDUSTRY 4.0</div>
                        <div>Detail Kategori PINDAD</div>
                        <div className={`value ${getValueClass(index * 15)}`}>
                            {index * 15}%
                        </div>
                    </div>
                ));
            case "PINDAD Workshop & Cyber":
                return Array.from({ length: 4 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI PINDAD WORKSHOP & CYBER</div>
                        <div>Detail Kategori Workshop & Cyber</div>
                        <div className={`value ${getValueClass(index * 20)}`}>
                            {index * 20}%
                        </div>
                    </div>
                ));
            case "Program Bersama Idhan":
                return Array.from({ length: 3 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI PROGRAM BERSAMA IDHAN</div>
                        <div>Detail Kategori Program Idhan</div>
                        <div className={`value ${getValueClass(index * 30)}`}>
                            {index * 30}%
                        </div>
                    </div>
                ));
            case "Sistem Aplikasi":
                return Array.from({ length: 12 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI SISTEM APLIKASI</div>
                        <div>Detail Kategori Sistem Aplikasi</div>
                        <div className={`value ${getValueClass(index * 10)}`}>
                            {index * 10}%
                        </div>
                    </div>
                ));
            case "Tata Kelola":
                return Array.from({ length: 2 }).map((_, index) => (
                    <div className="card" key={index}>
                        <div>IMPLEMENTASI TATA KELOLA</div>
                        <div>Detail Kategori Tata Kelola</div>
                        <div className={`value ${getValueClass(index * 50)}`}>
                            {index * 50}%
                        </div>
                    </div>
                ));
            default:
                return <p></p>;
        }
    };
    

    return (
        <div className="mpti-content">
            <div className='m-navbar'>
                <img className="m-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                <h2>MASTER PLAN TI</h2>
            </div>

            <div className="m-content">
                <div className="content-left">
                    {showImplementations && renderCardsForCategory()}
                </div>

                <div className="content-right">
                    <div className="year-selector">
                        <select value={selectedYear} onChange={handleYearChange}>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="content-right-top">
                        {selectedYear === defaultYear && (
                            <div className="statistics">
                                <div className="stat-item">
                                    <div className="stat-value" style={{ color: "green" }}>100.00%</div>
                                    <div className="stat-label">Target</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value" style={{ color: "blue" }}>22.04%</div>
                                    <div className="stat-label">Realisasi s/d Tahun {defaultYear}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="select-year">
                        <div className="year-range">
                            <select name="startYear" value={startYear} onChange={handleStartYearChange}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <span>-</span>
                            <select name="endYear" value={endYear} onChange={handleEndYearChange}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => setShowImplementations(true)}>Submit Periode</button>
                    </div>

                    <div className="right-panel">
                        {startYear === "2023" && endYear === "2024" && (
                            <>
                                <div onClick={() => handleCategoryClick("Industry 4.0")}>Industry 4.0</div>
                                <div onClick={() => handleCategoryClick("Infrastruktur")}>Infrastruktur</div>
                                <div onClick={() => handleCategoryClick("Inovasi Solusi & Cyber Security")}>Inovasi Solusi & Cyber Security</div>
                                <div onClick={() => handleCategoryClick("Pengembangan Infrastruktur Kebutuhan Eksternal")}>Pengembangan Infrastruktur Kebutuhan Eksternal</div>
                                <div onClick={() => handleCategoryClick("PINDAD Industry 4.0")}>PINDAD Industry 4.0</div>
                                <div onClick={() => handleCategoryClick("PINDAD Workshop & Cyber")}>PINDAD Workshop & Cyber</div>
                                <div onClick={() => handleCategoryClick("Program Bersama Idhan")}>Program Bersama Idhan</div>
                                <div onClick={() => handleCategoryClick("Sistem Aplikasi")}>Sistem Aplikasi</div>
                                <div onClick={() => handleCategoryClick("Tata Kelola")}>Tata Kelola</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mpti;
