import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import fs from 'fs';

// Inisialisasi Express
const app = express();
app.use(cors());

// Untuk mendapatkan __dirname dalam ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pastikan folder uploads dan templates ada
const ensureDirectoriesExist = () => {
  const directories = ['uploads', 'templates'];
  directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  });
};

ensureDirectoriesExist();

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Nama File: ${file.originalname}`); // Debugging
    if (file.originalname.includes('[Template]')) {
      console.log('Menyimpan ke folder templates'); // Debugging
      cb(null, path.join(__dirname, 'templates/'));
    } else {
      console.log('Menyimpan ke folder uploads'); // Debugging
      cb(null, path.join(__dirname, 'uploads/'));
    }
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    let filename = originalName + extension;
    
    let counter = 1;

    const checkFileExists = (filename) => {
      return fs.existsSync(path.join(__dirname, 'uploads', filename)) || fs.existsSync(path.join(__dirname, 'templates', filename));
    };

    while (checkFileExists(filename)) {
      filename = `${originalName}(${counter})${extension}`;
      counter++;
    }

    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk upload file
app.post('/upload', upload.single('file'), (req, res) => {
    console.log("File yang diterima di backend:", req.file); // Debugging

    if (!req.file) {
        return res.status(400).send('Tidak ada file yang diupload.');
    }

    // File berhasil disimpan, kirim respons berhasil
    res.status(200).json({ message: 'File berhasil diupload', file: req.file });
});

// Endpoint untuk mendapatkan daftar file
app.get('/files', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error membaca folder uploads.');
    }
    
    res.json({ files });
  });
});

// Endpoint untuk mendapatkan daftar template
app.get('/templates', (req, res) => {
  const templatesDir = path.join(__dirname, 'templates');
  
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error membaca folder templates.');
    }
    
    res.json({ files });
  });
});

// Endpoint untuk mengunduh file dari folder uploads
app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error saat mengunduh file.');
      }
    });
  } else {
    res.status(404).send('File tidak ditemukan.');
  }
});

// Endpoint untuk mengunduh file dari folder templates
app.get('/templates/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'templates', filename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error saat mengunduh file.');
      }
    });
  } else {
    res.status(404).send('File tidak ditemukan.');
  }
});

// Mulai server di port 5000
app.listen(5000, () => {
  console.log('Server berjalan di http://localhost:5000');
});

