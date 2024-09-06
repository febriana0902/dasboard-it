// import { useState } from "react";
// import menu from './asset/menu-sidebar.png';
// import './css/Upload.css';

// const Upload = ({ toggleSidebar, isSidebarOpen }) => {
//   const [file, setFile] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const currentYear = new Date().getFullYear();
//   const monthIndex = new Date().getMonth(); // 0-based index for month
//   const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
//   const currentMonth = monthNames[monthIndex];

//   const [selectedYear, setSelectedYear] = useState(currentYear.toString());
//   const [selectedMonth, setSelectedMonth] = useState(currentMonth);

//   const handleYearChange = (e) => {
//     setSelectedYear(e.target.value);
//   };

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (file) {
//       console.log("File yang diunggah:", file);
//       setShowPopup(true);
//       setFile(null);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setFile(e.dataTransfer.files[0]);
//     setIsDragging(false);
//   };

//   return (
//     <>
//       <div className="upload-container">
//         <div className="upload-navbar">
//           <div className="title">
//             <img className="k-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
//             <h2>UPLOAD / DOWNLOAD</h2>
//           </div>

//           <div className="filter">
//             <div className="filter-bulan">
//               <select id="bulan" value={selectedMonth} onChange={handleMonthChange}>
//                 <option value="Januari">Januari</option>
//                 <option value="Februari">Februari</option>
//                 <option value="Maret">Maret</option>
//                 <option value="April">April</option>
//                 <option value="Mei">Mei</option>
//                 <option value="Juni">Juni</option>
//                 <option value="Juli">Juli</option>
//                 <option value="Agustus">Agustus</option>
//                 <option value="September">September</option>
//                 <option value="Oktober">Oktober</option>
//                 <option value="November">November</option>
//                 <option value="Desember">Desember</option>
//               </select>
//             </div>

//             <div className="filter-year">
//               <select id="year" value={selectedYear} onChange={handleYearChange}>
//                 <option value={selectedYear}>{selectedYear}</option>
//                 <option value={selectedYear - 1}>{selectedYear - 1}</option>
//                 <option value={selectedYear - 2}>{selectedYear - 2}</option>
//                 <option value={selectedYear - 3}>{selectedYear - 3}</option>
//                 <option value={selectedYear - 4}>{selectedYear - 4}</option>
//               </select>
//             </div>
//         </div>
//         </div>

//         <div className="upload-content">
//           <div className="upload-section">
//             <h3>Silakan Upload atau Download Dokumen</h3>
//             <p>Pilih dokumen yang relevan</p>
//             <div
//               className={`file-upload ${isDragging ? 'dragging' : ''}`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               <input
//                 type="file"
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 accept=".xlsx, .xls"
//               />
//               <label htmlFor="file-upload" className="file-upload-label">
//                 Pilih file atau seret dan lepas di sini
//                 <br />
//                 <span className="file-upload-button">Pilih File</span>
//               </label>
//             </div>
//             <p className="file-info">*xlsx, *xls ukuran file maksimal 10MB</p>
//             <div className="upload-buttons">
//               <button className="button-cancel">Batal</button>
//               <button className="button-upload" onClick={handleUpload} disabled={!file}>Unggah</button>
//             </div>
//           </div>

//           <div className="download-buttons">
//             <button className="button-download">Unduh Template</button>
//             <button className="button-download">Unduh Data</button>
//           </div>
//         </div>

//         {showPopup && (
//           <div className="popup-overlay">
//             <div className="popup-content">
//               <h3>Unggah Berhasil</h3>
//               <p>File Anda telah berhasil diunggah.</p>
//               <button onClick={handleClosePopup}>Tutup</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Upload;



import { useState } from "react";
import menu from './asset/menu-sidebar.png';
import excelIcon from './asset/sheets.png'; // Add an Excel icon image
import './css/Upload.css';

const Upload = ({ toggleSidebar, isSidebarOpen }) => {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false); // State for upload progress
  const [error, setError] = useState(''); // State for error message
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = ['xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB in bytes

    // Check file type and size
    if (!validExtensions.includes(fileExtension)) {
      setError('Hanya file dengan ekstensi .xlsx atau .xls yang diperbolehkan.');
      setFile(null);
      return;
    }

    if (file.size > maxSizeInBytes) {
      setError('Ukuran file maksimal adalah 10MB.');
      setFile(null);
      return;
    }

    setFile(file);
    setError(''); // Clear any previous error
    setUploading(true); // Start uploading when file is selected
    simulateUpload();
  };

  const simulateUpload = () => {
    // Simulate upload time with a loading indicator
    setTimeout(() => {
      setUploading(false);
      setShowPopup(true);
    }, 2000); // Simulate upload time
  };

  const handleCancelUpload = () => {
    setFile(null);
    setUploading(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Reset state to return the form to its initial state
    setFile(null);
    setUploading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const validExtensions = ['xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB in bytes

    // Check file type and size
    if (!validExtensions.includes(fileExtension)) {
      setError('Hanya file dengan ekstensi .xlsx atau .xls yang diperbolehkan.');
      setFile(null);
      return;
    }

    if (file.size > maxSizeInBytes) {
      setError('Ukuran file maksimal adalah 10MB.');
      setFile(null);
      return;
    }

    setFile(file);
    setError(''); // Clear any previous error
    setIsDragging(false);
    setUploading(true); // Start uploading when file is dropped
    simulateUpload();
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
              <select id="bulan" value={selectedMonth} onChange={handleMonthChange}>
                {monthNames.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="filter-year">
              <select id="year" value={selectedYear} onChange={handleYearChange}>
                {[...Array(5)].map((_, index) => (
                  <option key={index} value={currentYear - index}>{currentYear - index}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="upload-content">
          <div className="upload-section">
            <h3>Silakan Upload atau Download Dokumen</h3>
            <p>Pilih dokumen yang relevan</p>
            <div
              className={`file-upload ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                disabled={uploading}
              />
              {file ? (
                <div className="file-selected">
                  <img src={excelIcon} alt="Excel Icon" className="excel-icon" style={{ width: '20px', height: '20px' }} />
                  <span>{file.name}</span>
                  <span className="cancel-upload" onClick={handleCancelUpload}>✖</span>
                </div>
              ) : (
                <label htmlFor="file-upload" className="file-upload-label">
                  {uploading ? (
                    <div className="upload-progress">Mengunggah...</div>
                  ) : (
                    <>
                      Pilih file atau seret dan lepas di sini
                      <br />
                      <span className="file-upload-button">Pilih File</span>
                    </>
                  )}
                </label>
              )}
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="file-info">*xlsx, *xls ukuran file maksimal 10MB</p>
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
