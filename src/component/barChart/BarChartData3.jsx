import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart3 = ({ products }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Ambil nama produk dan harga untuk sumbu X dan data batang
    const productId = products.map(product => product.id);
    const productPrices = products.map(product => product.price);

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
      xAxis: {
        type: 'category',
        data: productId,
        axisLabel: {
          interval: 0, 
          rotate: 45, 
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}', 
        },
      },
      series: [
        {
          name: 'Harga Produk',
          type: 'bar',
          data: productPrices, 
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
  }, [products]);

  return (
    <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '250px', marginTop: '-30px' }}></div>
  );
};

export default BarChart3;
