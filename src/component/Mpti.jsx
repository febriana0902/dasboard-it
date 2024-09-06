import { useState, useEffect } from "react";
import { useContractData } from './DataContext';
import menu from './asset/menu-sidebar.png';
import './css/Mpti.css';

const Mpti = ({ toggleSidebar, isSidebarOpen }) => {
    // Mengambil data
    const { products } = useContractData();
    if (!products) return <div>Loading...</div>;

    useEffect(() => {
        const content = document.querySelector('.m-content');
        if (isSidebarOpen) {
            content.style.width = 'calc(100% - 40px)';
        } else {
            content.style.width = '100%';
        }
    }, [isSidebarOpen]);

    // Filter produk
    const defaultProduct = "Pilih Product";
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const handleProductChange = (e) => {
        const selectedTitle = e.target.value;
        setSelectedProduct(selectedTitle);
        const selected = products.find(product => product.title === selectedTitle);
        setSelectedProductDetails(selected);
    };

    // Filter berdasarkan tag
    const [firstTag, setFirstTag] = useState('');
    const [secondTag, setSecondTag] = useState('');
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const handleFirstTag = (e) => {
        setFirstTag(e.target.value);
    };

    const handleSecondTag = (e) => {
        setSecondTag(e.target.value);
    };

    const handleButtonSubmit = () => {
        setIsFilterApplied(true);
    };

    const filteredProducts = isFilterApplied
        ? products.filter(product => {
            return (firstTag && product.tags.includes(firstTag)) || (secondTag && product.tags.includes(secondTag));
        })
        : []; // Kosongkan daftar produk jika filter belum diterapkan

    const uniqueTags = new Set();
    products.forEach(product => {
        product.tags.forEach(tag => {
            uniqueTags.add(tag);
        });
    });

    const handleProductClick = (product) => {
        setSelectedProduct(product.title);
        setSelectedProductDetails(product);
    };

    return (
        <div className="mpti-content">
            <div className='m-navbar'>
                <img className="m-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                <h2>MASTER PLAN TI</h2>
            </div>

            <div className="m-content">
                <div className="content-left">
                    {selectedProductDetails && (
                        <div className="product-details">
                            <h3>{selectedProductDetails.title}</h3>
                            <div className="card-detail">
                                <div className="detail-item">
                                    <span className="detail-label">Stok</span>
                                    <span className="detail-value">{selectedProductDetails.stock}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Brand</span>
                                    <span className="detail-value">{selectedProductDetails.brand}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Kategori</span>
                                    <span className="detail-value">{selectedProductDetails.category}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Garansi</span>
                                    <span className="detail-value">{selectedProductDetails.warrantyInformation}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Info Pengiriman</span>
                                    <span className="detail-value">{selectedProductDetails.shippingInformation}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Status</span>
                                    <span className="detail-value">{selectedProductDetails.availabilityStatus}</span>
                                </div>
                    
                            </div>
                        </div>
                    )}
                </div>

                <div className="content-right">
                    <div className="year-selector">
                        <select value={selectedProduct} onChange={handleProductChange}>
                            <option value={defaultProduct}>{defaultProduct}</option>
                            {products.map(product => (
                                <option key={product.id} value={product.title}>{product.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="content-right-top">
                        {/* Menampilkan statistik produk */}
                        {selectedProduct !== defaultProduct && 
                            products
                                .filter(product => product.title === selectedProduct)
                                .map(product => (
                                    <div className="statistics" key={product.id}>
                                        <div className="stat-item">
                                            <div className="stat-value" style={{ color: "green" }}>{product.price}</div>
                                            <div className="stat-label">Harga</div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-value" style={{ color: "blue" }}>{product.discountPercentage}%</div>
                                            <div className="stat-label">Diskon</div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>

                    <div className="select-year">
                        <div className="year-range">
                            <select value={firstTag} onChange={handleFirstTag}>
                                <option value="">Pilih Tag</option>
                                {[...uniqueTags].map((tag, index) => (
                                    <option key={index} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                            <span>-</span>
                            <select value={secondTag} onChange={handleSecondTag}>
                                <option value="">Pilih Tag</option>
                                {[...uniqueTags].map((tag, index) => (
                                    <option key={index} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleButtonSubmit}>Submit</button>
                    </div>

                    <div className="right-panel">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id}>
                                    <h3 onClick={() => handleProductClick(product)}>{product.title}</h3>
                                </div>
                            ))
                        ) : (
                            <div>{isFilterApplied ? "Tidak ada produk yang cocok dengan tag yang dipilih." : ""}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mpti;
