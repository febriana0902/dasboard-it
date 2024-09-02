import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartMpti = () => {
  const data= {
    labels: ['Belum Terealisasi', 'Realisasi'], 
    datasets: [
      {
        data: [10.00,90.00],  
        backgroundColor: ['#9EC97F', '#5971C0'], 
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options= {
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
    <div style={{ width: '98%', height: '80px', marginTop:'-2px', marginBottom:'3px'}}>  {/* Sesuaikan ukuran chart */}
        <Pie data={data} options={options} />
    </div>
  )
};

export default PieChartMpti;
