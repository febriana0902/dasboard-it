import ReactECharts from 'echarts-for-react';

const BarChartReactions = ({ posts }) => {
  const rawData = posts.map(post => ({
    Post: `Post ${post.id}`,
    Likes: post.reactions.likes,
    Dislikes: post.reactions.dislikes,
    Views: post.views
  }));

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Likes', 'Dislikes', 'Views'],
      top: 'top',
      padding: [10, 0, 10, 0]
    },
    xAxis: {
      type: 'category',
      data: rawData.map(item => item.Post)
    },
    yAxis: {
      type: 'value',
      name: 'Count'
    },
    series: [
      {
        name: 'Likes',
        type: 'bar',
        data: rawData.map(item => item.Likes),
        itemStyle: {
          color: '#5470C6'
        }
      },
      {
        name: 'Dislikes',
        type: 'bar',
        data: rawData.map(item => item.Dislikes),
        itemStyle: {
          color: '#EE6666'
        }
      },
      {
        name: 'Views',
        type: 'bar',
        data: rawData.map(item => item.Views),
        itemStyle: {
          color: '#F3C96B'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 260 , width: 410}} />;
};

export default BarChartReactions;
