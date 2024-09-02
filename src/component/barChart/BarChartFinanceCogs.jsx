import ReactECharts from 'echarts-for-react';

const BarChartCogs = () => {
  const rawData = [
    { Month: 'January', Condition: 'Produksi', Value: 0.8 },
    { Month: 'February', Condition: 'Produksi', Value: 0.7 },
    { Month: 'March', Condition: 'Produksi', Value: 0.9 },
    { Month: 'April', Condition: 'Produksi', Value: 0.6 },
    { Month: 'May', Condition: 'Produksi', Value: 0.75 },
    { Month: 'June', Condition: 'Produksi', Value: 0.65 },
    { Month: 'July', Condition: 'Produksi', Value: 0.85 },
    { Month: 'August', Condition: 'Produksi', Value: 0.7 },
    { Month: 'September', Condition: 'Produksi', Value: 0.8 },
    { Month: 'October', Condition: 'Produksi', Value: 0.9 },
    { Month: 'November', Condition: 'Produksi', Value: 0.6 },
    { Month: 'December', Condition: 'Produksi', Value: 0.7 },

    { Month: 'January', Condition: 'Distribusi', Value: 0.7 },
    { Month: 'February', Condition: 'Distribusi', Value: 0.65 },
    { Month: 'March', Condition: 'Distribusi', Value: 0.85 },
    { Month: 'April', Condition: 'Distribusi', Value: 0.6 },
    { Month: 'May', Condition: 'Distribusi', Value: 0.7 },
    { Month: 'June', Condition: 'Distribusi', Value: 0.75 },
    { Month: 'July', Condition: 'Distribusi', Value: 0.7 },
    { Month: 'August', Condition: 'Distribusi', Value: 0.8 },
    { Month: 'September', Condition: 'Distribusi', Value: 0.85 },
    { Month: 'October', Condition: 'Distribusi', Value: 0.6 },
    { Month: 'November', Condition: 'Distribusi', Value: 0.7 },
    { Month: 'December', Condition: 'Distribusi', Value: 0.75 }
  ];

  const option = {
    dataset: [
      {
        id: 'dataset_raw',
        source: rawData
      },
      {
        id: 'dataset_produksi',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Condition', '=': 'Produksi' }]
          }
        }
      },
      {
        id: 'dataset_distribusi',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Condition', '=': 'Distribusi' }]
          }
        }
      }
    ],
    title: {
      text: 'Realisasi Biaya COGS'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Produksi', 'Distribusi'],
      top: 'bottom'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: rawData.map(item => item.Month).filter((v, i, a) => a.indexOf(v) === i)
    },
    yAxis: {
      type: 'value',
      name: 'Dalam Jutaan rupiah / million [M]',
      max: 1,  // Nilai maksimum di Y-Axis adalah 1
      min: 0   // Nilai minimum di Y-Axis adalah 0
    },
    series: [
      {
        type: 'bar',
        datasetId: 'dataset_produksi',
        name: 'Produksi',
        encode: {
          x: 'Month',
          y: 'Value',
          tooltip: ['Value']
        },
        barGap: '30%'
      },
      {
        type: 'bar',
        datasetId: 'dataset_distribusi',
        name: 'Distribusi',
        encode: {
          x: 'Month',
          y: 'Value',
          tooltip: ['Value']
        },
        barGap: '30%'
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
};

export default BarChartCogs;
