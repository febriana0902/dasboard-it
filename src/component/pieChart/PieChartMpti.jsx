import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMpti = ({ products }) => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [inStockCount, setInStockCount] = useState(0);

  useEffect(() => {
    // Hitung jumlah stok berdasarkan status
    const lowStock = products.filter(product => product.availabilityStatus === 'Low Stock').length;
    const inStock = products.filter(product => product.availabilityStatus === 'In Stock').length;

    // Simpan nilai ke dalam state
    setLowStockCount(lowStock);
    setInStockCount(inStock);
  }, [products]);

  const data = {
    labels: ['Low Stock', 'In Stock'], // Sesuaikan label dengan data stok
    datasets: [
      {
        data: [lowStockCount, inStockCount],  // Gunakan nilai dari state
        backgroundColor: ['#9EC97F', '#5971C0'],
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 10,
          },
          padding: 2,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: '#000',
        bodyColor: '#fff',
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return (
    <div style={{ width: '98%', height: '80px', marginTop: '-2px', marginBottom: '3px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartMpti;
