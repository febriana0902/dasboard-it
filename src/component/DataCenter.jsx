import menu from './asset/menu-sidebar.png';
import './css/DataCenter.css';
import { useContractData } from './DataContext';
import { useState, useEffect } from "react";
import BarChart from './barChart/BarChartData1';
import BarChart2 from './barChart/BarChartData2';
import BarChart3 from './barChart/BarChartData3';
import BarChart4 from './barChart/BarChartData4';

const DataCenter = ({ toggleSidebar, isSidebarOpen }) => {
  // Mengambil data
  const { products } = useContractData();
  if (!products) return <div>Loading...</div>;

  // card 1 - Filter berdasarkan produk title
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const handleProductChange1 = (e) => setSelectedProduct1(e.target.value);

  useEffect(() => {
    console.log(`Menampilkan data untuk produk ${selectedProduct1}`);
  }, [selectedProduct1]);

  // card 2 - Filter berdasarkan produk title
  const [selectedProduct2, setSelectedProduct2] = useState("");
  const handleProductChange2 = (e) => setSelectedProduct2(e.target.value);

  useEffect(() => {
    console.log(`Menampilkan data untuk produk ${selectedProduct2}`);
  }, [selectedProduct2]);

  // card 3 - Filter berdasarkan product.id dan product.price
  const [selectedProductId, setSelectedProductId] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("");
  const handleProductIdChange = (e) => setSelectedProductId(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(e.target.value);

  useEffect(() => {
    console.log(`Menampilkan data untuk server dengan produk ID ${selectedProductId} dan harga ${selectedPrice}`);
  }, [selectedProductId, selectedPrice]);

  // card 4 - Filter berdasarkan data.warranty
  const [selectedWarranty, setSelectedWarranty] = useState("");
  const handleWarrantyChange = (e) => setSelectedWarranty(e.target.value);

  useEffect(() => {
    console.log(`Menampilkan data garansi untuk produk ${selectedWarranty}`);
  }, [selectedWarranty]);

  // Filter logic
  const filteredProducts1 = selectedProduct1 ? products.filter(p => p.title === selectedProduct1) : products;
  const filteredProducts2 = selectedProduct2 ? products.filter(p => p.title === selectedProduct2) : products;
  const filteredProducts3 = products.filter(p => 
    (selectedProductId === "all" || p.id === selectedProductId) &&
    (selectedPrice === "" || p.price === Number(selectedPrice))
  );
  const filteredProducts4 = selectedWarranty ? products.filter(p => p.warrantyInformation === selectedWarranty) : products;

  return (
    <div className="data-content">
      <div className="d-title">
        <img className="menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
        <h2>DATA CENTER</h2>
      </div>

      <div className='data-container'>

        {/* card 1 - Filter by product.title */}
        <div className='item'>
          <div className='top-dc'>
            <p>Jumlah Komentar Produk</p>
            <div className="filter-product-dc">
              <select id="product1" value={selectedProduct1} onChange={handleProductChange1}>
                <option value="">Pilih Produk</option>
                {products.map((product, index) => (
                  <option key={index} value={product.title}>{product.title}</option>
                ))}
              </select>
            </div>
          </div>

          <BarChart products={filteredProducts1} />
        </div>

        {/* card 2 - Filter by product.title */}
        <div className='item'>
          <div className='top-dc'>
            <p>Produk dengan Diskon</p>
            <div className="filter-product-dc">
              <select id="product2" value={selectedProduct2} onChange={handleProductChange2}>
                <option value="">Pilih Produk</option>
                {products.map((product, index) => (
                  <option key={index} value={product.title}>{product.title}</option>
                ))}
              </select>
            </div>
          </div>

          <BarChart2 products={filteredProducts2} />
        </div>

        {/* card 3 - Filter by product.id and product.price */}
        <div className='item'>
          <div className='top-dc'>
            <p>Harga Tiap Produk</p>
            <div className='filter-dc'>
              <div className="filter-server-dc">
                <select id="server" value={selectedProductId} onChange={handleProductIdChange}>
                  <option value="all">Semua Produk</option>
                  {products.map((product, index) => (
                    <option key={index} value={product.id}>{`ID: ${product.id}`}</option>
                  ))}
                </select>
              </div>

              <div className='filter-price'>
                <select id="price" value={selectedPrice} onChange={handlePriceChange}>
                  <option value="">Pilih Harga</option>
                  {products
                    .filter(p => selectedProductId === "all" || p.id === selectedProductId)
                    .map((product, index) => (
                      <option key={index} value={product.price}>{`Harga: ${product.price}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <BarChart3 products={filteredProducts3} />
        </div>

        {/* card 4 - Filter by data.warranty */}
        <div className='item'>
          <div className='top-dc'>
            <p>Garansi Tiap Produk</p>
            <div className="filter-warranty-dc">
              <select id="warranty" value={selectedWarranty} onChange={handleWarrantyChange}>
                <option value="">Pilih Garansi</option>
                {products.map((product, index) => (
                  <option key={index} value={product.warrantyInformation}>{`${product.warrantyInformation}`}</option>
                ))}
              </select>
            </div>
          </div>
          
          <BarChart4 products={filteredProducts4} />
        </div>

      </div>
    </div>
  );
};

export default DataCenter;
