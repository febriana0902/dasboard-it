import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

// Registrasi komponen Chart.js yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartTataKelola = ({recipes}) => {
  
  const [maxPrepTime, setMaxPrepTime] = useState(0);
  const [minPrepTime, setMinPrepTime] = useState(0);
  const [maxCookTime, setMaxCookTime] = useState(0);
  const [minCookTime, setMinCookTime] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [minCalories, setMinCalories] = useState(0);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      // Menentukan nilai prepTime terbesar dan terkecil
      const prepTimes = recipes.map(recipe => recipe.prepTimeMinutes);
      setMaxPrepTime(Math.max(...prepTimes));
      setMinPrepTime(Math.min(...prepTimes));

      // Menentukan nilai cookTime terbesar dan terkecil
      const cookTimes = recipes.map(recipe => recipe.cookTimeMinutes);
      setMaxCookTime(Math.max(...cookTimes));
      setMinCookTime(Math.min(...cookTimes));

      // Menentukan nilai calories terbesar dan terkecil
      const calories = recipes.map(recipe => recipe.caloriesPerServing);
      setMaxCalories(Math.max(...calories));
      setMinCalories(Math.min(...calories));
    }
  }, [recipes]);

  const data1 = {
    labels: ['Min Prep Time', 'Max Prep Time'],
    datasets: [
      {
        data: [minPrepTime, maxPrepTime],
        backgroundColor: ['#9EC97F', '#5971C0'],
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options1 = {
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

  const data2 = {
    labels: ['Min Cook Time', 'Max Cook Time'],
    datasets: [
      {
        data: [minCookTime, maxCookTime],
        backgroundColor: ['#9EC97F', '#5971C0'],
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options2 = {
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

  const data3 = {
    labels: ['Min Calories', 'Max Calories'],
    datasets: [
      {
        data: [minCalories, maxCalories],
        backgroundColor: ['#9EC97F', '#5971C0'],
        hoverBackgroundColor: ['#9EC97F', '#5971C0'],
      },
    ],
  };

  const options3 = {
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
      <div style={{ width: '100%', height: '80px' }}>
        <Pie data={data1} options={options1} />
      </div>
      <div style={{ width: '100%', height: '80px' }}>
        <Pie data={data2} options={options2} />
      </div>
      <div style={{ width: '100%', height: '80px' }}>
        <Pie data={data3} options={options3} />
      </div>
    </div>
  );
};

export default PieChartTataKelola;