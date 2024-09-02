import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const BarChart2 = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([0.001, 0.002, 0.005, 0.007, 0.003, 0.008, 0.004, 0.006, 0.009, 0.005]);
  const [data2, setData2] = useState([0.005, 0.006, 0.008, 0.004, 0.009, 0.003, 0.007, 0.005, 0.006, 0.008]);
  const [categories, setCategories] = useState(['10:00:00', '10:00:02', '10:00:04', '10:00:06', '10:00:08', '10:00:10', '10:00:12', '10:00:14', '10:00:16', '10:00:18']);
  const [categories2, setCategories2] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: '',
        left: 'center',
        top: '0',
        textStyle: {
            fontSize: 15, // Mengatur ukuran font title
            fontWeight: 'normal', // Mengatur ketebalan font title
            color: '#333', // Mengatur warna font (opsional)
          },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      // toolbox: {
      //   show: true,
      //   feature: {
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Percentage',
          max: 0.01, // Maksimum 1%
          min: 0,    // Minimum 0%
          boundaryGap: [0.2, 0.2],
          axisLabel: {
            formatter: '{value}%' // Format persen
          }
        }
      ],
      series: [
        {
          name: 'Total Traffic (Bar)',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 0,
          data: data
        },
        {
          name: 'Total Traffic (Line)',
          type: 'line',
          data: data2
        }
      ]
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    const updateChart = () => {
      const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      
      setData(prevData => {
        const newData = [...prevData.slice(1), +(Math.random() * 0.01).toFixed(3)];
        return newData;
      });

      setData2(prevData2 => {
        const newData2 = [...prevData2.slice(1), +(Math.random() * 0.01).toFixed(3)];
        return newData2;
      });

      setCategories(prevCategories => {
        const newCategories = [...prevCategories.slice(1), axisData];
        return newCategories;
      });

      setCategories2(prevCategories2 => {
        const newCategories2 = [...prevCategories2.slice(1), prevCategories2[prevCategories2.length - 1] + 1];
        return newCategories2;
      });

      chartInstance.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data2
          }
        ]
      });
    };

    const intervalId = setInterval(updateChart, 2100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
      chartInstance.dispose();
    };
  }, [data, data2, categories, categories2]);

  return (
    <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '240px', marginTop: '3px' }}></div>
  );
};

export default BarChart2;
