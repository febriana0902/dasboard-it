import { useState, useEffect, useRef } from "react";
import { useContractData } from './DataContext';
import menu from './asset/menu-sidebar.png';
import './css/Mpti.css';

const Mpti = ({ toggleSidebar, isSidebarOpen }) => {
    const { products } = useContractData();
    const contentRef = useRef(null); // Menggunakan ref untuk mengakses DOM

    //menampilkan product saat pertama halaman dibuka
    useEffect(() => {
        if (products && products.length > 0) {
            // Mengurutkan produk berdasarkan title
            const sortedProducts = products.slice().sort((a, b) => a.title.localeCompare(b.title));
            setSelectedProduct(sortedProducts[0].title);
            setSelectedProductDetails(sortedProducts[0]);
        }
    }, [products]);

    // Mengubah lebar content saat sidebar terbuka atau tertutup
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.width = isSidebarOpen ? 'calc(100% - 40px)' : '100%';
        }
    }, [isSidebarOpen]);

    // State untuk produk yang dipilih dan detail produk
    const defaultProduct = "Pilih Product";
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);

    const handleProductChange = (e) => {
        const selectedTitle = e.target.value;
        const selected = products.find(product => product.title === selectedTitle);
    
        if (selected) {
            // Periksa tag hanya jika tag sudah dipilih
            const hasFirstTag = firstTag && selected.tags.includes(firstTag);
            const hasSecondTag = secondTag && selected.tags.includes(secondTag);
    
            if (firstTag && !hasFirstTag) {
                setFirstTag(''); // Reset firstTag jika tidak sesuai
            }
            if (secondTag && !hasSecondTag) {
                setSecondTag(''); // Reset secondTag jika tidak sesuai
            }
    
            // Selalu perbarui produk yang dipilih dan detail produk
            setSelectedProduct(selectedTitle);
            setSelectedProductDetails(selected);
        }
    };
    
    

    // State untuk tag dan apakah filter diterapkan
    const [firstTag, setFirstTag] = useState('');
    const [secondTag, setSecondTag] = useState('');
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const handleFirstTag = (e) => {
        setFirstTag(e.target.value);
        setIsFilterApplied(true);
    };

    const handleSecondTag = (e) => {
        setSecondTag(e.target.value);
        setIsFilterApplied(true);
    };

    // Filter produk berdasarkan tag
    const filteredProducts = isFilterApplied
        ? products.filter(product => {
            return (firstTag && product.tags.includes(firstTag)) || (secondTag && product.tags.includes(secondTag));
        })
        : [];

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

    if (!products) return <div>Loading...</div>;


    return (
        <div className="mpti-content">
            <div className='m-navbar'>
                <img className="m-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
                <h2>MASTER PLAN TI</h2>
            </div>

            <div className="m-content" ref={contentRef}>
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
