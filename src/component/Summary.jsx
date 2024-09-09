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


  //MENGAMBIL DATA SALES CONTRACT
  const { users } = useContractData();
  if (!users) return <div>Loading...</div>;

  const maleCount = users.filter(user => user.gender === 'male').length;
  const femaleCount = users.filter(user => user.gender === 'female').length;

  //MENGAMBIL DATA E-LEARNING, DATA CENTER, MPTI
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

  // rata-rata diskon
  const calculateAverageDiscount = (products) => {
    if (products.length === 0) return 0;
    const totalDiscount = products.reduce((sum, product) => sum + product.discountPercentage, 0);
    return totalDiscount / products.length;
  };
  
  const [averageDiscount, setAverageDiscount] = useState(0);
  
  useEffect(() => {
    setAverageDiscount(calculateAverageDiscount(products));
  }, [products]);
  
  //rata-rata harga
  const calculateAveragePrice = (products) => {
    if (products.length === 0) return 0; // Menghindari pembagian dengan 0
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    return totalPrice / products.length;
  };
  
  const averagePrice = calculateAveragePrice(products);
  const averagePriceFixed = averagePrice.toFixed(2);
  
  //rata-rata garansi
  const [averageWarranty, setAverageWarranty] = useState(0);

  useEffect(() => {
    // Log data produk
    console.log('Produk:', products);

    const totalMonths = products.reduce((sum, product) => {
      const warranty = product.warrantyInformation;
      if (typeof warranty === 'string') {
        const match = warranty.match(/(\d+) month/);
        return sum + (match ? parseInt(match[1], 10) : 0);
      }
      return sum;
    }, 0);

    // Hitung rata-rata garansi
    const newAverageWarranty = products.length > 0 ? totalMonths / products.length : 0;
    setAverageWarranty(newAverageWarranty);
  }, [products]);


  //MENGAMBIL DATA HELDESK
  const { todos } = useContractData();
  if (!todos) return <div>Loading...</div>;

  const trueCount = todos.filter(todo => todo.completed === true).length;
  const falseCount = todos.filter(todo => todo.completed === false).length;

  //MENGAMBIL DATA FINANCE
  const { recipes } = useContractData();
  if (!recipes) return <div>Loading...</div>;
  
  const totalReviewCount = recipes.reduce((accumulator, recipe) => accumulator + recipe.reviewCount, 0);
  const totalCuisine = recipes.reduce((accumulator, recipe) => {
    if (!accumulator.includes(recipe.cuisine)) {
      accumulator.push(recipe.cuisine);
    }
    return accumulator;
  }, []).length;  // Menghitung jumlah cuisine yang unik

  const totalMealType = recipes.reduce((accumulator, recipe) => {
    recipe.mealType.forEach(type => {
      if (!accumulator.includes(type)) {
        accumulator.push(type);
      }
    });
    return accumulator;
  }, []).length; 

  const ratingsF = recipes.map(recipe => recipe.rating);
  const totalRatingF = ratingsF.reduce((acc, rating) => acc + rating, 0);
  const averageRatingF = totalRatingF / ratings.length;
  const ratingF = averageRatingF.toFixed(2);
  
  // MENGAMBIL DATA WORK ORDER
  const { posts } = useContractData();
  if (!posts) return <div>Loading...</div>;
  
  

  return (
    <div>
      <div className="summary-content">
        <div className="summary-navbar">

          <div className="s-title">
            <img className="s-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
            <h2>SUMMARY</h2>
          </div>

          <div className="s-filter">
            <div className="s-filter-month">
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

            <div className="s-filter-year">
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
          <div className="s-grid-container">

            {/* Sales Contract */}
            <div className="s-item1">
              <p className="s-label-title">Sales Contract (Dalam Juta)</p>

              <div className="s-sc">
                <p className="s-label-teks">Jumlah Karyawan Laki-Laki</p>
                <div className="s-progress-bar">
                  <div className="s-progress-bar-label">{maleCount} Org</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${maleCount}%` }}></div>
                </div>

                <p className="s-label-teks">Jumlah Karyawan Perempuan</p>
                <div className="s-progress-bar">
                  <div className="s-progress-bar-label">{femaleCount} Org</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${femaleCount}%` }}></div>
                </div>
              </div>

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* Finance */}
            <div className="s-item2">

              <div className="s-top">
                <p className="s-label-title">Finance</p>

                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="s-flex">
                <p className="s-label-teks">Masakan</p>
                <div className="s-progress-bar-2">
                  <div className="s-progress-bar-label">{totalCuisine}</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${totalCuisine}%` }}></div>
                </div>
              </div>

              <div className="s-flex">
                <p className="s-label-teks">Meal Type</p>
                <div className="s-progress-bar-2">
                  <div className="s-progress-bar-label">{totalMealType}</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${totalMealType}%` }}></div>
                </div>
              </div>

              <div className="s-flex">
                <p className="s-label-teks">Review</p>
                <div className="s-progress-bar-2">
                  <div className="s-progress-bar-label">{totalReviewCount}</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${totalReviewCount}%` }}></div>
                </div>
              </div>

              <div className="s-flex">
                <p className="s-label-teks">Rating</p>
                <div className="s-progress-bar-2">
                  <div className="s-progress-bar-label">{ratingF}</div>
                  <div className="s-progress-bar-bg"></div>
                  <div className="s-progress-bar-fill" style={{ width: `${ratingF}%` }}></div>
                </div>
              </div>

            </div>

            {/* E-Learning */}
            <div className="s-item3">
              <p className="s-label-title">E-Learning</p>
              
              <div className="s-el">
                <div className="s-teks1">
                  <p>Brands</p>
                  <p>{totalBrands}</p>
                </div>

                <div className="s-teks2">
                  <p>Low Stock</p>
                  <p>{lowStock}</p>
                </div>

                <div className="s-teks3">
                  <p>Rating</p>
                  <p>{rating}</p>
                </div>
              </div>

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>  

            {/* RKA */}
            <div className="s-item4">
              <p className="s-label-title">RKA</p>

              <PieChartRka />

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* MPTI */}
            <div className="s-item5">
              <p className="s-label-title">MPTI</p>
              
              <PieChartMpti products={products}/>

              <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
            </div>

            {/* Work Order */}
            <div className="s-item6">

              <div className="s-top">
                <p className="s-label-title">Work Order</p>
                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <BarChartWorkOrder posts={posts}/>
            </div>

            {/* Data Center */}
            <div className="s-item7">

              <div className="s-top">
                <p className="s-label-title">Data Center</p>
                <div className="s-start-ends">
                    <p>Start</p>
                    <p>Ends</p>
                </div>
              </div>

              <div className="s-content-dc">
                <p>{averageDiscount.toFixed(2)}%</p>
                <p>Rata-rata Diskon</p>
              </div>

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            <div className="s-item8">

              <div className="s-content-dc-8">
                  <p>{averagePriceFixed}</p>
                  <p>Rata - rata Harga</p>
              </div>

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            <div className="s-item9">

              <div className="s-content-dc-9">
                <p>{averageWarranty} Bulan</p>
                <p>Rata - rata Garansi</p>
              </div>

              <div className="s-update">
                <p>Last Update</p>
                <p>Tidak ada</p>
              </div>
            </div>

            {/* Help Desk */}
            <div className="s-item10">

              <div className="s-top">
                <p className="s-label-title">Help Desk</p>

                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="s-hd">

                <div className="s-hd-group">
                  <p className="s-label-teks">Completed</p>
                  <div className="s-progress-bar-3">
                    <div className="s-progress-bar-label">{trueCount}</div>
                    <div className="s-progress-bar-bg"></div>
                    <div className="s-progress-bar-fill-3" style={{ width: `${trueCount}%` }}></div>
                  </div>
                </div>

                <div className="s-hd-group">
                  <p className="s-label-teks">True</p>
                  <div className="s-progress-bar-4">
                    <div className="s-progress-bar-label">{trueCount}</div>
                    <div className="s-progress-bar-bg"></div>
                    <div className="s-progress-bar-fill-4" style={{ width: `${trueCount}%` }}></div>
                  </div>
                </div>

                <div className="s-hd-group">
                  <p className="s-label-teks">False</p>
                  <div className="s-progress-bar-5">
                    <div className="s-progress-bar-label">{falseCount}</div>
                    <div className="s-progress-bar-bg"></div>
                    <div className="s-progress-bar-fill-5" style={{ width: `${falseCount}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI */}
            <div className="s-item11">
              <div className="s-top">
                <p className="s-label-title">KPI</p>
                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <div className="s-group">
                <div className="s-group-1">
                  <div className="s-flex">
                    <p className="s-label-teks">TRW I</p>
                    <div className="s-progress-bar">
                      <div className="s-progress-bar-label">{trwI}%</div>
                      <div className="s-progress-bar-bg"></div>
                      <div className="s-progress-bar-fill" style={{ width: `${trwI}%` }}></div>
                    </div>
                  </div>

                  <div className="s-flex">
                    <p className="s-label-teks">TRW II</p>
                    <div className="s-progress-bar">
                      <div className="s-progress-bar-label">{trwII}%</div>
                      <div className="s-progress-bar-bg"></div>
                      <div className="s-progress-bar-fill" style={{ width: `${trwII}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="s-group-2">
                  <div className="s-flex">
                    <p className="s-label-teks">TRW III</p>
                    <div className="s-progress-bar">
                      <div className="s-progress-bar-label">{trwIII}%</div>
                      <div className="s-progress-bar-bg"></div>
                      <div className="s-progress-bar-fill" style={{ width: `${trwIII}%` }}></div>
                    </div>
                  </div>

                  <div className="s-flex">
                    <p className="s-label-teks">TRW IV</p>
                    <div className="s-progress-bar">
                      <div className="s-progress-bar-label">{trwIV}%</div>
                      <div className="s-progress-bar-bg"></div>
                      <div className="s-progress-bar-fill" style={{ width: `${trwIV}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tata kelola */}
            <div className="s-item12">

              <div className="s-top">
                <p className="s-label-title">Tata Kelola</p>

                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>
              </div>

              <PieChartTataKelola />
            </div>

            {/* hasil asesmen */}
            <div className="s-item13">

              <div className="s-top">
                <p className="s-label-title">Hasil Asesmen</p>

                <div className="s-update">
                  <p>Last Update</p>
                  <p>Tidak ada</p>
                </div>

              </div>

              <div className="s-group-3">
                <p className="s-year">2023</p>
                <div className="s-teks4">
                  <p>ITML</p>
                  <p>3.63</p>
                </div>

                <p className="s-year">2023</p>
                <div className="s-teks5">
                  <p>INDI 4.0</p>
                  <p>2.56</p>
                </div>

                <p className="s-year">2022</p>
                <div className="s-teks6">
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