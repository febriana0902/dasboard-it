import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart3 = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: '',
        left: 'center',
        top: '5%',
        textStyle: {
          fontSize: 15,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {
        data: ['Line Chart', 'Bar Chart'],
        bottom: '0%',
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mar', 'April', 'May'],
        },
      ],
      yAxis: [
        {
          type: 'value',
          max: 60,
          axisLabel: {
            formatter: '{value}%',
          },
        },
      ],
      series: [
        {
          name: 'Line Chart',
          type: 'line',
          smooth: true,
          data: [60, 60, 60],
        },
        {
          name: 'Bar Chart',
          type: 'bar',
          data: [50, 55, 60], // Data for the bar chart
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
    <div className="bar-chart" ref={chartRef} style={{ width: '90%', height: '230px', marginTop: '-30px' }}></div>
  );
};

export default BarChart3;
