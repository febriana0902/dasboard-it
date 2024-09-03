import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ products }) => {
  // Menghitung jumlah brand unik
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  const totalBrands = uniqueBrands.length;

  const data = {
    labels: uniqueBrands,  // Menampilkan brand unik di sumbu X
    datasets: [
      {
        label: 'Stock',  // Label untuk dataset
        data: products.map(product => product.stock),  // Mengambil data stock
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true, 
      },
      title: {
        display: true,
        text: `Data Produk Berdasarkan Merek (Total Brand: ${totalBrands})`,  // Judul grafik dengan total brand
      },
      tooltip: {
        bodyFont: {
          size: 12, 
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,  // Mengatur jarak antar angka di sumbu Y
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%', marginTop: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
