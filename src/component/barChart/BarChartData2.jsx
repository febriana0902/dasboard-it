import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const BarChart2 = ({ products }) => {
  const chartRef = useRef(null);

  // Filter produk berdasarkan diskon
  const productsWithDiscount = products.filter(product => product.discountPercentage);

  // Ambil nama produk dan persentase diskon untuk sumbu X dan data
  const productNames = productsWithDiscount.map(product => product.title);
  const discountData = productsWithDiscount.map(product => product.discountPercentage);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      title: {
        text: '',
        left: 'center',
        top: '0',
        textStyle: {
          fontSize: 15,
          fontWeight: 'normal',
          color: '#333',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      // legend: {},
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: productNames, 
        axisLabel: {
          margin: 16, 
          align: 'left', 
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: 'Diskon (%)',
        max: Math.max(...discountData) + 5, 
        min: 0, // Minimum 0%
        axisLabel: {
          formatter: '{value}%', 
        },
      },
      series: [
        {
          name: 'Diskon Produk',
          type: 'bar',
          data: discountData, 
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
  }, [productsWithDiscount]);

  return (
    <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '240px', marginTop: '-20px' }}></div>
  );
};

export default BarChart2;
