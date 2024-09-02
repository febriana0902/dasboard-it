import React, { useState } from "react";
import menu from './asset/menu-sidebar.png';
import './css/Kpi.css';

const currentYear = new Date().getFullYear();

const Kpi = ({ toggleSidebar, isSidebarOpen }) => {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedTrw, setSelectedTrw] = useState("I");

  const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
  };

  const handleTrwChange = (e) => {
      setSelectedTrw(e.target.value);
  };

    return (
        <div className="kpi-content">

            <div className='k-navbar'>
                <div className="title">
                  <img className="k-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                  <h2>KPI</h2>
                </div>

                <div className="filter">
                  <div className="filter-trw">
                      <select id="trw" value={selectedTrw} onChange={handleTrwChange}>
                          <option value="I">I</option>
                          <option value="II">II</option>
                          <option value="III">III</option>
                          <option value="IV">IV</option>
                      </select>
                  </div>

                  <div className="filter-year">
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

            <div className="k-container">
              {selectedTrw === "I" && selectedYear === currentYear.toString() && (
                  <div className="rtw-I">
                    <h3>Realisasi KPI TRW I</h3>

                    <div className="k-content">
                      <div className="ring">
                        <p>10%</p>
                      </div>

                      <div className="label-warna">

                        <div className="row">
                          <div className="green"></div>
                          <p>Terpenuhi 100%</p>
                        </div>

                        <div className="row">
                          <div className="red"></div>
                          <p>Pemenuhan &lt; 100%</p>
                        </div>

                        <div className="row">
                          <div className="blue"></div>
                          <p>Pemenuhan &gt; 100%</p>
                        </div>

                      </div>
                    </div>
                  </div>
              )}
              
              {selectedTrw === "II" && selectedYear === currentYear.toString() && (
                  <div className="rtw-II">
                    <h3>Realisasi KPI TRW II</h3>

                    <div className="k-content">
                      <div className="ring-green">
                        <p>100%</p>
                      </div>

                      <div className="label-warna">

                        <div className="row">
                          <div className="green"></div>
                          <p>Terpenuhi 100%</p>
                        </div>

                        <div className="row">
                          <div className="red"></div>
                          <p>Pemenuhan &lt; 100%</p>
                        </div>

                        <div className="row">
                          <div className="blue"></div>
                          <p>Pemenuhan &gt; 100%</p>
                        </div>

                      </div>
                    </div>
                  </div>
              )}

              {selectedTrw === "III" && selectedYear === currentYear.toString() && (
                  <div className="rtw-III">
                    <h3>Realisasi KPI TRW III</h3>

                    <div className="k-content">
                      <div className="ring">
                        <p>20%</p>
                      </div>

                      <div className="label-warna">

                        <div className="row">
                          <div className="green"></div>
                          <p>Terpenuhi 100%</p>
                        </div>

                        <div className="row">
                          <div className="red"></div>
                          <p>Pemenuhan &lt; 100%</p>
                        </div>

                        <div className="row">
                          <div className="blue"></div>
                          <p>Pemenuhan &gt; 100%</p>
                        </div>

                      </div>
                    </div>
                  </div>
              )}

              {selectedTrw === "IV" && selectedYear === currentYear.toString() && (
                  <div className="rtw-IV">
                    <h3>Realisasi KPI TRW I</h3>

                    <div className="k-content">
                      <div className="ring-blue">
                        <p>150%</p>
                      </div>

                      <div className="label-warna">

                        <div className="row">
                          <div className="green"></div>
                          <p>Terpenuhi 100%</p>
                        </div>

                        <div className="row">
                          <div className="red"></div>
                          <p>Pemenuhan &lt; 100%</p>
                        </div>

                        <div className="row">
                          <div className="blue"></div>
                          <p>Pemenuhan &gt; 100%</p>
                        </div>

                      </div>
                    </div>
                  </div>
              )}
            </div>
        </div>
    )
};

export default Kpi;
