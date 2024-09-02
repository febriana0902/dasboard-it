import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: '',
        left: 'center',
        top: '10',
        textStyle: {
            fontSize: 15, // Mengatur ukuran font title
            fontWeight: 'normal', // Mengatur ketebalan font title
            color: '#333', // Mengatur warna font (opsional)
          },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      legend: {
        bottom: -5, // Mengatur jarak legend dari bagian bawah chart
        data: ['Data Center', 'Core App', 'Internet & VPN'],
        textStyle: {
            fontSize: 8, // Mengatur ukuran font legend (opsional)
        },
      },
      xAxis: {
        type: 'category',
        name: 'Month',
        splitLine: { show: false },
        data: ['March'], // Hanya bulan Maret
      },
      grid: {
        left: '3%',
        right: '30%',
        bottom: '10%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        name: 'Percentage',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%', // Format untuk menampilkan persen
        },
      },
      series: [
        {
          name: 'Data Center',
          type: 'bar',
          data: [80], // Nilai untuk Data Center dalam persen
        },
        {
          name: 'Core App',
          type: 'bar',
          data: [95], // Nilai untuk Core App dalam persen
        },
        {
          name: 'Internet & VPN',
          type: 'bar',
          data: [110], // Nilai untuk Internet & VPN dalam persen
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);


  return (
    <div className="bar" ref={chartRef} style={{ width: '100%', height: '200px', marginTop: '-20px'}}></div>
  )

};

export default BarChart;
