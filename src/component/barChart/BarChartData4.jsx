// import { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';

// const BarChart4 = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const chartInstance = echarts.init(chartRef.current);

//     const option = {
//       title: {
//         text: '',
//         left: 'center',
//         top: '5%',
//         textStyle: {
//           fontSize: 15,
//           fontWeight: 'normal',
//           color: '#333',
//         },
//       },
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'shadow',
//         },
//       },
//       legend: {},
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '35%',
//         containLabel: true,
//       },
//       xAxis: {
//         type: 'value',
//       },
//       yAxis: {
//         type: 'category',
//         data: ['0.2 Bulan', '0.4 Bulan', '0.6 Bulan', '0.8 Bulan', '1 Bulan'],
//       },
//       series: [
//         {
//           name: 'Total',
//           type: 'bar',
//           label: {
//             show: true,
//           },
//           emphasis: {
//             focus: 'series',
//           },
//           data: [10, 20, 30, 40, 50], // Contoh data, sesuaikan dengan data yang Anda miliki
//         },
//       ],
//     };

//     chartInstance.setOption(option);

//     const handleResize = () => {
//       chartInstance.resize();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       chartInstance.dispose();
//     };
//   }, []);

//   return (
//     <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '270px', marginTop: '5px'}}></div>
//   );
// };

// export default BarChart4;



import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart4 = ({ products }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    // Ambil data warranty dan ubah menjadi array nilai
    const warrantyData = products.map(product => {
      const warranty = product.warrantyInformation.split(' ')[0]; // Mengambil nilai bulan
      return parseFloat(warranty);
    });

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
          type: 'shadow',
        },
      },
      // legend: {},
      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   bottom: '35%',
      //   containLabel: true,
      // },
      xAxis: {
        type: 'value',
        name: 'Warranty (Months)', // Label untuk sumbu X
      },
      yAxis: {
        type: 'category',
        data: products.map(product => product.id), // Nama produk sebagai label Y axis
      },
      series: [
        {
          name: 'Warranty (Months)',
          type: 'bar',
          label: {
            show: false,
          },
          emphasis: {
            focus: 'series',
          },
          data: warrantyData, // Data warranty dalam bulan
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
    <div className="bar-chart" ref={chartRef} style={{ width: '100%', height: '270px', marginTop: '-35px', marginRight: '-10px' }}></div>
  );
};

export default BarChart4;
