import { useState, useEffect } from "react";
import { useContractData } from './DataContext';
import './css/Summary.css';
import menu from './asset/menu-sidebar.png';
import PieChartRka from "./pieChart/PieChartRka";
import PieChartMpti from "./pieChart/PieChartMpti";
import PieChartTataKelola from "./pieChart/PieChartTataKelola";
import BarChartWorkOrder from "./barChart/BarChartWorkOrder";

const Summary = ({ toggleSidebar, isSidebarOpen }) => {
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

  // Sales Contract
  const [targetKontrak, setTargetKontrak] = useState(80);
  const [targetPenjualan, setTargetPenjualan] = useState(40);

  // Finance
  const [cogs, setCogs] = useState(10);
  const [assets, setAssets] = useState(80);
  const [expenses, setExpenses] = useState(40);
  const [opeCost, setOpeCost] = useState(35);

  // Help Desk
  const [totalTicket, setTotalTicket] = useState(70);
  const [open, setOpen] = useState(60);
  const [close, setClose] = useState(80);

  // KPI
  const [trwI, setTrwI] = useState(70);
  const [trwII, setTrwII] = useState(40);
  const [trwIII, setTrwIII] = useState(10);
  const [trwIV, setTrwIV] = useState(0);

  useEffect(() => {
    // Logika untuk memperbarui data sesuai dengan bulan dan tahun terpilih
    console.log(`Menampilkan data untuk ${selectedMonth} ${selectedYear}`);
  }, [selectedMonth, selectedYear]);


  //mengambil data sales contract
  const { users } = useContractData();
  if (!users) return <div>Loading...</div>;

  const maleCount = users.filter(user => user.gender === 'male').length;
  const femaleCount = users.filter(user => user.gender === 'female').length;

  //mengambil data e-learning
  const { products } = useContractData();
  if (!products) return <div>Loading...</div>;

  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const totalBrands = uniqueBrands.length;

  const lowStock = products.filter(product => product.availabilityStatus === 'Low Stock').length;

  // rata-rata rating
  const ratings = products.map(product => product.rating);
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = totalRating / ratings.length;
  const rating = averageRating.toFixed(2);


  return (
    <div>
      <div className="summary-content">
        <div className="summary-navbar">

          <div className="title">
            <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
            <h2>SUMMARY</h2>
          </div>

          <div className="filter">
            <div className="filter-month">
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
        
        {/* data bulan agustus */}
        {selectedMonth === currentMonth && selectedYear === currentYear.toString() && (
          <div className="grid-container">

            {/* Sales Contract */}
            <div className="item1">
              <p className="label-title">Sales Contract (Dalam Juta)</p>

              <div className="sc">
                <p className="label-teks">Jumlah Karyawan Laki-Laki</p>
                <div className="progress-bar">
                  <div className="progress-bar-label">{maleCount} Org</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${maleCount}%` }}></div>
                </div>

                <p className="label-teks">Jumlah Karyawan Perempuan</p>
                <div className="progress-bar">
                  <div className="progress-bar-label">{femaleCount} Org</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${femaleCount}%` }}></div>
                </div>
              </div>

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* Finance */}
            <div className="item2">

              <div className="top">
                <p className="label-title">Finance</p>

                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="flex">
                <p className="label-teks">COGS</p>
                <div className="progress-bar-2">
                  <div className="progress-bar-label">{cogs}%</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${cogs}%` }}></div>
                </div>
              </div>

              <div className="flex">
                <p className="label-teks">Assets</p>
                <div className="progress-bar-2">
                  <div className="progress-bar-label">{assets}%</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${assets}%` }}></div>
                </div>
              </div>

              <div className="flex">
                <p className="label-teks">Expenses</p>
                <div className="progress-bar-2">
                  <div className="progress-bar-label">{expenses}%</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${expenses}%` }}></div>
                </div>
              </div>

              <div className="flex">
                <p className="label-teks">Ope Cost</p>
                <div className="progress-bar-2">
                  <div className="progress-bar-label">{opeCost}%</div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill" style={{ width: `${opeCost}%` }}></div>
                </div>
              </div>

            </div>

            {/* E-Learning */}
            <div className="item3">
              <p className="label-title">E-Learning</p>
              
              <div className="el">
                <div className="teks1">
                  <p>Brands</p>
                  <p>{totalBrands}</p>
                </div>

                <div className="teks2">
                  <p>Low Stock</p>
                  <p>{lowStock}</p>
                </div>

                <div className="teks3">
                  <p>Rating</p>
                  <p>{rating}</p>
                </div>
              </div>

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>  

            {/* RKA */}
            <div className="item4">
              <p className="label-title">RKA</p>

              <PieChartRka />

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* MPTI */}
            <div className="item5">
              <p className="label-title">MPTI</p>
              
              <PieChartMpti />

              <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
            </div>

            {/* Work Order */}
            <div className="item6">

              <div className="top">
                <p className="label-title">Work Order</p>
                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <BarChartWorkOrder />
            </div>

            {/* Data Center */}
            <div className="item7">

              <div className="top">
                <p className="label-title">Data Center</p>
                <div className="start-ends">
                    <p>Start</p>
                    <p>Ends</p>
                </div>
              </div>

              <div className="content-dc">
                <p>Data Tidak Tersedia</p>
                <p>Uptime Server</p>
              </div>

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            <div className="item8">

              <div className="content-dc-8">
                  <p>Data Tidak Tersedia</p>
                  <p>End Of Ups Uptime</p>
              </div>

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            <div className="item9">

              <div className="content-dc-9">
                <p>Data Tidak Tersedia</p>
                <p>Max Switch Traffic</p>
              </div>

              <div className="update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* Help Desk */}
            <div className="item10">

              <div className="top">
                <p className="label-title">Help Desk</p>

                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="hd">
                <p className="label-teks">Total Ticket</p>
                <div className="progress-bar-3">
                  <div className="progress-bar-label"></div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill-3" style={{ width: `${totalTicket}%` }}></div>
                </div>

                <p className="label-teks">Open</p>
                <div className="progress-bar-4">
                  <div className="progress-bar-label"></div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill-4" style={{ width: `${open}%` }}></div>
                </div>

                <p className="label-teks">Close</p>
                <div className="progress-bar-5">
                  <div className="progress-bar-label"></div>
                  <div className="progress-bar-bg"></div>
                  <div className="progress-bar-fill-5" style={{ width: `${close}%` }}></div>
                </div>
              </div>
            </div>

            {/* KPI */}
            <div className="item11">
              <div className="top">
                <p className="label-title">KPI</p>
                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="group">
                <div className="group-1">
                  <div className="flex">
                    <p className="label-teks">TRW I</p>
                    <div className="progress-bar">
                      <div className="progress-bar-label">{trwI}%</div>
                      <div className="progress-bar-bg"></div>
                      <div className="progress-bar-fill" style={{ width: `${trwI}%` }}></div>
                    </div>
                  </div>

                  <div className="flex">
                    <p className="label-teks">TRW II</p>
                    <div className="progress-bar">
                      <div className="progress-bar-label">{trwII}%</div>
                      <div className="progress-bar-bg"></div>
                      <div className="progress-bar-fill" style={{ width: `${trwII}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="group-2">
                  <div className="flex">
                    <p className="label-teks">TRW III</p>
                    <div className="progress-bar">
                      <div className="progress-bar-label">{trwIII}%</div>
                      <div className="progress-bar-bg"></div>
                      <div className="progress-bar-fill" style={{ width: `${trwIII}%` }}></div>
                    </div>
                  </div>

                  <div className="flex">
                    <p className="label-teks">TRW IV</p>
                    <div className="progress-bar">
                      <div className="progress-bar-label">{trwIV}%</div>
                      <div className="progress-bar-bg"></div>
                      <div className="progress-bar-fill" style={{ width: `${trwIV}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tata kelola */}
            <div className="item12">

              <div className="top">
                <p className="label-title">Tata Kelola</p>

                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <PieChartTataKelola />
            </div>

            {/* hasil asesmen */}
            <div className="item13">

              <div className="top">
                <p className="label-title">Hasil Asesmen</p>

                <div className="update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>

              </div>

              <div className="group-3">
                <p className="year">2023</p>
                <div className="teks4">
                  <p>ITML</p>
                  <p>3.63</p>
                </div>

                <p className="year">2023</p>
                <div className="teks5">
                  <p>INDI 4.0</p>
                  <p>2.56</p>
                </div>

                <p className="year">2022</p>
                <div className="teks6">
                  <p>ITML</p>
                  <p>3</p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;


