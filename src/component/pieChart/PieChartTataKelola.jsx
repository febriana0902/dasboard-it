import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartTataKelola = () => {
  const data= {
    labels: ['A', 'B'],  // Label untuk setiap bagian pie chart
    datasets: [
      {
        data: [44.00,56.00],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#9EC97F', '#5971C0'],  // Warna untuk setiap bagian
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
        position: 'right',  
        labels: {
          color: '#333',  
          font: {
            size: 13,  
          },
        padding: 10,  
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

  const data2= {
    labels: ['C', 'D'],  // Label untuk setiap bagian pie chart
    datasets: [
      {
        data: [47.00,53.00],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#9EC97F', '#5971C0'],  // Warna untuk setiap bagian
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options2= {
    responsive: true,  
    maintainAspectRatio: false,  
    plugins: {
      legend: {
        display: true,
        position: 'right',  
        labels: {
          color: '#333',  
          font: {
            size: 13,  
          },
        padding: 10,  
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

  const data3= {
    labels: ['E', 'F'],  // Label untuk setiap bagian pie chart
    datasets: [
      {
        data: [5.00,95.00],  // Nilai untuk setiap bagian pie chart
        backgroundColor: ['#9EC97F', '#5971C0'],  // Warna untuk setiap bagian
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options3= {
    responsive: true,  
    maintainAspectRatio: false,  
    plugins: {
      legend: {
        display: true,
        position: 'right',  
        labels: {
          color: '#333',  
          font: {
            size: 13,  
          },
        padding: 10,  
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
    <div className='pie-tk'>
        <div style={{ width: '100%', height: '80px'}}>  {/* Sesuaikan ukuran chart */}
            <Pie data={data} options={options} />
        </div>
        <div style={{ width: '100%', height: '80px'}}>  {/* Sesuaikan ukuran chart */}
            <Pie data={data2} options={options2} />
        </div>    
        <div style={{ width: '100%', height: '80px'}}>  {/* Sesuaikan ukuran chart */}
            <Pie data={data3} options={options3} />
        </div>
    </div>
  )
};

export default PieChartTataKelola;
