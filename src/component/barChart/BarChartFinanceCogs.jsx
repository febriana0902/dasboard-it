import ReactECharts from 'echarts-for-react';

const BarChartCogs = ({ recipes }) => {
  // Menghitung jumlah resep berdasarkan tingkat kesulitan
  const mediumCount = recipes.filter(recipe => recipe.difficulty === 'Medium').length;
  const easyCount = recipes.filter(recipe => recipe.difficulty === 'Easy').length;

  // Mengubah data menjadi format yang sesuai untuk chart
  const rawData = [
    { Category: 'Medium', Value: mediumCount },
    { Category: 'Easy', Value: easyCount }
  ];

  const option = {
    title: {
      text: 'Jumlah Makanan Berdasarkan Kesulitan'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: rawData.map(item => item.Category), // Nama kategori (Medium, Easy)
      name: 'Kategori'
    },
    yAxis: {
      type: 'value',
      name: 'Jumlah'
    },
    series: [
      {
        type: 'bar',
        data: rawData.map(item => item.Value), // Jumlah resep
        name: 'Jumlah Resep',
        label: {
          show: false,
          position: 'top'
        },
        barGap: '20%',
        itemStyle: {
          color: (params) => {
            const colors = ['#5470C6', '#91CC75'];
            return colors[params.dataIndex % colors.length];
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
};

export default BarChartCogs;
