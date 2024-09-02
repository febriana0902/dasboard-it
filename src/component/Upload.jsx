import React, { useState } from "react";
import menu from './asset/menu-sidebar.png';
import './css/Upload.css';

const Upload = ({ toggleSidebar, isSidebarOpen }) => {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTrw, setSelectedTrw] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log("File yang diunggah:", file);
      // Implementasi logika upload file di sini

      // Tampilkan pop-up setelah file berhasil diunggah
      setShowPopup(true);

      // Reset file input
      setFile(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTrwChange = (event) => {
    setSelectedTrw(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <div className="upload-container">
        <div className="upload-navbar">
          <div className="title">
            <img className="k-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
            <h2>UPLOAD / DOWNLOAD</h2>
          </div>

          <div className="filter">
            <div className="filter-bulan">
              <select id="bulan" value={selectedTrw} onChange={handleTrwChange}>
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
                <option value={selectedYear}>{selectedYear}</option>
                <option value={selectedYear - 1}>{selectedYear - 1}</option>
                <option value={selectedYear - 2}>{selectedYear - 2}</option>
                <option value={selectedYear - 3}>{selectedYear - 3}</option>
                <option value={selectedYear - 4}>{selectedYear - 4}</option>
              </select>
            </div>
        </div>
        </div>

        <div className="upload-content">
          <div className="upload-section">
            <h3>Silakan verifikasi identitas Anda</h3>
            <p>Pilih dokumen yang relevan</p>
            <div className="file-upload">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                Pilih file atau seret dan lepas di sini
                <br />
                <span className="file-upload-button">Pilih File</span>
              </label>
            </div>
            <p className="file-info">*xlsx, *xls ukuran file maksimal 10MB</p>
            <div className="upload-buttons">
              <button className="button-cancel">Batal</button>
              <button className="button-upload" onClick={handleUpload} disabled={!file}>Unggah</button>
            </div>
          </div>

          <div className="download-buttons">
            <button className="button-download">Unduh Template</button>
            <button className="button-download">Unduh Data</button>
          </div>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Unggah Berhasil</h3>
              <p>File Anda telah berhasil diunggah.</p>
              <button onClick={handleClosePopup}>Tutup</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
