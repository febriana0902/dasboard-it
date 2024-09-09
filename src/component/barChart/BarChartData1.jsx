import ReactECharts from 'echarts-for-react';

const BarChart = ({ products }) => {
  // Ambil data produk dan jumlah komentar
  const productNames = products.map(product => product.title);
  const commentCounts = products.map(product => product.reviews.length);

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
      formatter: '{b} : {c}', // Menampilkan jumlah komentar
    },
    legend: {
      show: false, // Legend tidak diperlukan untuk chart ini
    },
    xAxis: {
      type: 'category',
      name: 'Produk',
      splitLine: { show: false },
      data: productNames, 
      axisLabel: {
        margin: 10, 
        align: 'left', 
      },
    },
    grid: {
      left: '3%',
      right: '30%',
      bottom: '10%',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
      name: ' Jumlah Komentar',
      min: 0,
      axisLabel: {
        formatter: '{value}', 
        margin: 14, 
        align: 'left',
      },
    },
    series: [
      {
        name: 'Jumlah Komentar',
        type: 'bar',
        data: commentCounts, // Data jumlah komentar
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: '220px', marginTop: '-20px', marginLeft: '50px'}}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default BarChart;
