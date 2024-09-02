import ReactECharts from 'echarts-for-react';

const BarChartOp = () => {
  const rawData = [
    { Month: 'January', Condition: 'Lembur', Value: 300 },
    { Month: 'February', Condition: 'Lembur', Value: 250 },
    { Month: 'March', Condition: 'Lembur', Value: 200 },
    { Month: 'April', Condition: 'Lembur', Value: 150 },
    { Month: 'May', Condition: 'Lembur', Value: 100 },
    { Month: 'June', Condition: 'Lembur', Value: 50 },
    { Month: 'July', Condition: 'Lembur', Value: 75 },
    { Month: 'August', Condition: 'Lembur', Value: 125 },
    { Month: 'September', Condition: 'Lembur', Value: 175 },
    { Month: 'October', Condition: 'Lembur', Value: 225 },
    { Month: 'November', Condition: 'Lembur', Value: 275 },
    { Month: 'December', Condition: 'Lembur', Value: 300 },

    { Month: 'January', Condition: 'Dinas', Value: 150 },
    { Month: 'February', Condition: 'Dinas', Value: 200 },
    { Month: 'March', Condition: 'Dinas', Value: 250 },
    { Month: 'April', Condition: 'Dinas', Value: 300 },
    { Month: 'May', Condition: 'Dinas', Value: 275 },
    { Month: 'June', Condition: 'Dinas', Value: 225 },
    { Month: 'July', Condition: 'Dinas', Value: 175 },
    { Month: 'August', Condition: 'Dinas', Value: 125 },
    { Month: 'September', Condition: 'Dinas', Value: 100 },
    { Month: 'October', Condition: 'Dinas', Value: 150 },
    { Month: 'November', Condition: 'Dinas', Value: 200 },
    { Month: 'December', Condition: 'Dinas', Value: 250 }
  ];

  const option = {
    dataset: [
      {
        id: 'dataset_raw',
        source: rawData
      },
      {
        id: 'dataset_lembur',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Condition', '=': 'Lembur' }]
          }
        }
      },
      {
        id: 'dataset_dinas',
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [{ dimension: 'Condition', '=': 'Dinas' }]
          }
        }
      }
    ],
    title: {
      text: 'Realisasi Biaya Operasional'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
        data: ['Lembur', 'Dinas'],  // Tambahkan legend untuk setiap kondisi
        top: 'bottom'  // Letakkan legend di bawah chart (atau sesuaikan posisi)
      },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: rawData.map(item => item.Month).filter((v, i, a) => a.indexOf(v) === i)
    },
    yAxis: {
      type: 'value',
      name: 'Dalam Jutaan rupiah / million [M]',
      max: 300,
      min: 0
    },
    series: [
      {
        type: 'bar',
        datasetId: 'dataset_lembur',
        name: 'Lembur',
        encode: {
          x: 'Month',
          y: 'Value',
          tooltip: ['Value']
        },
        barGap: '30%'
      },
      {
        type: 'bar',
        datasetId: 'dataset_dinas',
        name: 'Dinas',
        encode: {
          x: 'Month',
          y: 'Value',
          tooltip: ['Value']
        },
        barGap: '30%'
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 300}} />;
};

export default BarChartOp;
