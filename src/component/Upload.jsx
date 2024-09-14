import { useState, useEffect } from "react";
import menu from './asset/menu-sidebar.png';
import excelIcon from './asset/sheets.png';
import download from './asset/download.png';
import * as XLSX from 'xlsx';
import './css/Upload.css';

const Upload = ({ toggleSidebar, isSidebarOpen }) => {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [filesList, setFilesList] = useState([]);
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [templatesList, setTemplatesList] = useState([]);
  const [showTemplatesPopup, setShowTemplatesPopup] = useState(false);

  useEffect(() => {
    fetchFiles();
    fetchTemplates(); // Fetch templates list on component mount
  }, []);

  const fetchFiles = () => {
    fetch('http://localhost:5000/files')
      .then(response => response.json())
      .then(data => {
        setFilesList(data.files);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  };

  const fetchTemplates = () => {
    fetch('http://localhost:5000/templates')
      .then(response => response.json())
      .then(data => {
        setTemplatesList(data.files);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = ['xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB in bytes

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
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('File berhasil diupload:', data);
        readFile(file);
      })
      .catch(error => {
        console.error('Error dalam mengupload file:', error);
        setError('Terjadi kesalahan dalam mengupload file.');
        setUploading(false);
      });
  };

  const readFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const ab = e.target.result;
        const workbook = XLSX.read(ab, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log("Data JSON:", json);

        setUploading(false);
        setShowPopup(true);
      } catch (error) {
        console.error("Error dalam membaca atau mengkonversi file:", error);
        setError('Terjadi kesalahan dalam membaca file.');
        setUploading(false);
      }
    };

    reader.onerror = (error) => {
      console.error("Error dalam pembacaan file:", error);
      setError('Terjadi kesalahan dalam pembacaan file.');
      setUploading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCancelUpload = () => {
    setFile(null);
    setUploading(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
    setError('');
    setIsDragging(false);
    setUploading(true);
    readFile(file);
  };

  const handleShowFiles = () => {
    fetchFiles();
    setShowFilesPopup(true);
  };

  const handleShowTemplates = () => {
    fetchTemplates();
    setShowTemplatesPopup(true);
  };

  const handleDownloadFile = (filename) => {
    fetch(`http://localhost:5000/files/${filename}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading file:', error));
  };

  const handleDownloadTemplate = (filename) => {
    console.log(`Mengunduh template dari: http://localhost:5000/templates/${filename}`); // Debugging
    fetch(`http://localhost:5000/templates/${filename}`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Gagal mengunduh template');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading template:', error));
  };
  
  

  return (
    <>
      <div className="upload-container">
        <div className="upload-navbar">
          <div className="title">
            <img className="k-menu-sidebar" src={menu} alt="menu" onClick={toggleSidebar} />
            <h2>UPLOAD / DOWNLOAD</h2>
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
            <button className="button-download" onClick={handleShowTemplates}>Unduh Template</button>
            <button className="button-download" onClick={handleShowFiles}>Unduh Data</button>
          </div>
        </div>

        {/* popup untuk template */}
        {showTemplatesPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Daftar Template</h3>
              <p style={{marginTop: '-20px', fontSize: '12px'}}>Klik file / icon untuk unduh</p>
              <ul>
                {templatesList.map((template, index) => (
                  <li key={index}>
                    <img src={excelIcon} alt="Excel Icon" className="excel-icon" style={{ width: '20px', height: '20px' }} />
                    <a href="#" onClick={() => handleDownloadTemplate(template)}>{template}</a>
                    <img className="download-icon" src={download} alt="download-icon" onClick={() => handleDownloadTemplate(template)} />
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowTemplatesPopup(false)}>Tutup</button>
            </div>
          </div>
        )}

        {/* popup untuk file */}
        {showFilesPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Daftar File</h3>
              <p style={{marginTop: '-20px', fontSize: '12px'}}>Klik file / icon untuk unduh</p>
              <ul>
                {filesList.map((file, index) => (
                  <li key={index}>
                    <img src={excelIcon} alt="Excel Icon" className="excel-icon" style={{ width: '20px', height: '20px' }} />
                    <a href="#" onClick={() => handleDownloadFile(file)}>{file}</a>
                    <img className="download-icon" src={download} alt="download-icon"  onClick={() => handleDownloadFile(file)} />
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowFilesPopup(false)}>Tutup</button>
            </div>
          </div>
        )}

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
