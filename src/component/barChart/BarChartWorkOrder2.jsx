import ReactECharts from 'echarts-for-react';

const BarChartReactions = ({ posts }) => {
  const rawData = posts.map(post => ({
    Post: `Post ${post.id}`,
    Likes: post.reactions.likes,
    Dislikes: post.reactions.dislikes
  }));

  const option = {
    title: {
      text: 'Likes vs Dislikes per Post',
      left: 'center', 
      top: 'top', 
      padding: [20, 0, 10, 0] 
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Likes', 'Dislikes'],
      top: 'bottom',
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
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
};

export default BarChartReactions;
