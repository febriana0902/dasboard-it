import ReactECharts from 'echarts-for-react';

const BarChartCogs = ({ recipes }) => {
  // Menghitung jumlah resep berdasarkan meal type
  const mealTypeCounts = recipes.reduce((acc, recipe) => {
    recipe.mealType.forEach(type => {
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
    });
    return acc;
  }, {});

  // Mengubah data menjadi format yang sesuai untuk chart
  const rawData = Object.keys(mealTypeCounts).map(type => ({
    Category: type,
    Value: mealTypeCounts[type]
  }));

  const option = {
    title: {
      text: 'Jumlah Meal Type'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: rawData.map(item => item.Category), 
      name: 'Kategori'
    },
    yAxis: {
      type: 'value',
      name: 'Jumlah'
    },
    series: [
      {
        type: 'bar',
        data: rawData.map(item => item.Value), 
        name: 'Jumlah Makanan',
        label: {
          show: false,
          position: 'top'
        },
        barGap: '20%',
        itemStyle: {
          color: (params) => {
            // Ubah warna berdasarkan kategori
            const colors = ['#5470C6'];
            return colors[params.dataIndex % colors.length]; 
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
};

export default BarChartCogs;
