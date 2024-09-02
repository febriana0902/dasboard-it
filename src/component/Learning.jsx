import { useState} from "react";
import './css/Learning.css';
import menu from './asset/menu-sidebar.png';
import PieChartLearning from "./pieChart/PieChartLearning";
import BarChart from "./barChart/BarChartLearning";

const Learning = ({ toggleSidebar, isSidebarOpen }) => {
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


    const maxPeopleDivAb = 30; // Jumlah maksimal orang
    const maxPeopleDivC = 20;
    const maxPeopleDivD = 10; 

    const [currentPeople1, setCurrentPeople1] = useState(8); // Jumlah orang saat ini
    const [currentPeople2, setCurrentPeople2] = useState(10);
    const [currentPeople3, setCurrentPeople3] = useState(14);
    const [currentPeople4, setCurrentPeople4] = useState(5);

    // Hitung lebar progress bar sebagai persentase dari jumlah orang
    const progressWidthAb = (currentPeople1 / maxPeopleDivAb) * 100;
    const progressWidthC = (currentPeople3 / maxPeopleDivC) * 100;
    const progressWidthD = (currentPeople4 / maxPeopleDivD) * 100;

    return(
        <div className="learning-content">
            
            <div className='learning-navbar'>
                <div className='title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                    <h2>E-Learning</h2>
                </div>

                <div className="l-filter">
                    <div className="l-filter-month">
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

                    <div className="l-filter-year">
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

            {selectedMonth === currentMonth && selectedYear === currentYear.toString() && (
                <div className='learning-container'>
                    <div className='l-grid-group'>
                        <div className='l-group-1'>
                            <h3>Data Kerjasama Instansi</h3>
                           <BarChart />
                        </div>
                
                        <div className='l-group-2'>
                            <h3>Kuota Magang dan Prakerin</h3>
                            <PieChartLearning />
                        </div>
                    </div>

                    <div className='l-group-3'>
                            <h3>Data Pesebaran Magang</h3>

                            <div className="l-flex">
                                <p className="l-label-teks">SMK Wiraswasta</p>
                                <div className="l-progress-bar">
                                    <div className="l-progress-bar-fill" style={{ width: `${progressWidthAb}%` }}>
                                        <span className="l-progress-bar-label">{currentPeople1} / {maxPeopleDivAb}</span>
                                    </div>
                                </div>
                                <p className="l-label-teks">Divisi A</p>

                            </div>

                            <div className="l-flex">
                                <p className="l-label-teks">Universitas Komputer Indonesia</p>
                                <div className="l-progress-bar">
                                    <div className="l-progress-bar-fill" style={{ width: `${progressWidthAb}%` }}>
                                        <span className="l-progress-bar-label">{currentPeople2} / {maxPeopleDivAb}</span>
                                    </div>
                                </div>
                                <p className="l-label-teks">Divisi B</p>

                            </div>

                            <div className="l-flex">
                                <p className="l-label-teks">Universitas Islam Bandung</p>
                                <div className="l-progress-bar">
                                    <div className="l-progress-bar-fill" style={{ width: `${progressWidthC}%` }}>
                                        <span className="l-progress-bar-label">{currentPeople3} / {maxPeopleDivC}</span>
                                    </div>
                                </div>
                                <p className="l-label-teks">Divisi C</p>

                            </div>

                            <div className="l-flex">
                                <p className="l-label-teks">SMK Negeri 1 Bandung</p>
                                <div className="l-progress-bar">
                                    <div className="l-progress-bar-fill" style={{ width: `${progressWidthD}%` }}>
                                        <span className="l-progress-bar-label">{currentPeople4} / {maxPeopleDivD}</span>
                                    </div>
                                </div>
                                <p className="l-label-teks">Divisi D</p>

                            </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Learning;