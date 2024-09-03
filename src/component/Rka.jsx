import { useState, useEffect } from 'react';
import './css/Rka.css';
import menu from './asset/menu-sidebar.png';

const Rka = ({ toggleSidebar, isSidebarOpen }) => {
    const [ppi, setPpi] = useState(30);
    const [impti, setImpti] = useState(12);
    const [pkfo, setPkfo] = useState(100);
    const [pai, setPai] = useState(0);
    const [itas, setItas] = useState(6);
    const [pk, setPk] = useState(30);
    const [phs, setPhs] = useState(0);
    const [pkpk, setPkpk] = useState(65);
    const [sertif, setSertif] = useState(0);
    const [rnd, setRnd] = useState(0);
    const [pcs, setPcs] = useState(0);
    const [td, setTd] = useState(0);
    const [pp, setPp] = useState(0);

    const currentYear = new Date().getFullYear();
    const monthIndex = new Date().getMonth(); // 0-based index for month
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentMonth = monthNames[monthIndex];
  
    const [selectedYear, setSelectedYear] = useState(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
   const handleMonthChange = (e) => {
     setSelectedMonth(e.target.value);
   };
  
   const handleYearChange = (e) => {
     setSelectedYear(e.target.value);
   };
  
   useEffect(() => {
     console.log(`Menampilkan data untuk ${selectedMonth} ${selectedYear}`);
   }, [selectedMonth, selectedYear]);

    return(
        <div className="rka-content">
            <div className='rka-navbar'>
                <div className='rka-title'>
                    <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar}/>
                    <h2>RKA</h2>
                </div>

                <div className="r-filter-container">
                    <div className="r-filter-month">
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

                    <div className="r-filter-year">
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
                <div className="r-grid-group-container">
                    <div className="r-grid-container">

                        <div className='grid-ppi'>
                            <label className='r-title'>Pendukung Program Idhan</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${ppi}%` }}></div>
                                <div className="r-progress-bar-label">{ppi}%</div>
                            </div>
                            <div className="r-catatan">
                                <label>Asesment Tata Kelola TI, Roadmap INDI, IMS, FI Dashboard, ERM, HCMIS</label>
                            </div>
                        </div>

                        <div className='grid-impti'>
                            <label className='r-title'>Implementasi MPTI</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${impti}%` }}></div>
                                <div className="r-progress-bar-label">{impti}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Sertifikasi ISO, Enterprice Architecture</label>
                            </div>
                        </div>

                        <div className="grid-pkfo">
                            <label className='r-title'>Peningkatan Fasilitas FO</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pkfo}%` }}></div>
                                <div className="r-progress-bar-label">{pkfo}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Persiapan Instalasi</label>
                            </div>
                        </div> 

                        <div className="grid-pai">
                            <label className='r-title'>Pengembangan Aplikasi In-House</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pai}%` }}></div>
                                <div className="r-progress-bar-label">{pai}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>iTop, Update EIS</label>
                            </div>
                        </div>

                        <div className="grid-itas">
                            <label className='r-title'>IT Availabity Service</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${itas}%` }}></div>
                                <div className="r-progress-bar-label">{itas}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Untangle Mail Border, Domain pindad.id</label>
                            </div>
                        </div>

                        <div className="grid-pk">
                            <label className='r-title'>Pengembangan Kompetensi</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pk}%` }}></div>
                                <div className="r-progress-bar-label">{pk}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>254 kegiatan belum terealisasi</label>
                            </div>
                        </div>

                        <div className="grid-phs">
                            <label className='r-title'>Pemenuhan Hardware & Software</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${phs}%` }}></div>
                                <div className="r-progress-bar-label">{phs}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Plotter</label>
                            </div> 
                        </div>

                        <div className="grid-pkpk">
                            <label className='r-title'>Peningkatan Kapasitas Perfoma & Keamanan DC</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pkpk}%` }}></div>
                                <div className="r-progress-bar-label">{pkpk}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Firewall Bandung, Turen (Validasi Top), Distribution Switch (Persiapan Aanwijzing)</label>
                            </div>
                        </div>

                        <div className="grid-sertif">
                            <label className='r-title'>Sertifikasi</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${sertif}%` }}></div>
                                <div className="r-progress-bar-label">{sertif}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>73 Modul belum dirilis</label>
                            </div>
                        </div>

                        <div className="grid-rnd">
                            <label className='r-title'>RnD Cyber Security</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${rnd}%` }}></div>
                                <div className="r-progress-bar-label">{rnd}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>ICSS</label>
                            </div>
                        </div>

                        <div className="grid-pcs">
                            <label className='r-title'>Produksi Cyber Security Solutions</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pcs}%` }}></div>
                                <div className="r-progress-bar-label">{pcs}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Pengembangan Sistem Analysis Malware</label>
                            </div>
                        </div>

                        <div className="grid-td">
                            <label className='r-title'>Talent Development</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${td}%` }}></div>
                                <div className="r-progress-bar-label">{td}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Follow up kebutuhan data suspem & susnalind</label>
                            </div>
                        </div>

                        <div className="grid-pp">
                            <label className='r-title'>Pemasaran & Penjualan</label>
                            <div className="r-progress-bar">
                                <div className="r-progress-bar-fill" style={{ width: `${pp}%` }}></div>
                                <div className="r-progress-bar-label">{pp}%</div>
                            </div>
                            <div className='r-catatan'>
                                <label>Persiapan tender Ditjenpas, Domain pindad.id</label>
                            </div>
                        </div>
                    </div>
                </div>   
            )}
        </div>
    )
};

export default Rka;