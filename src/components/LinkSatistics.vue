<script>
import Chart from 'chart.js';

export default {
  name: 'link-statistics',
  render(createElement) {
    return createElement('div', {
      style: {
        width: '100%',
      },
    }, [
      createElement('canvas', {
        attrs: {
          id: 'test',
        },
        ref: 'canvas',
      }),
    ]);
  },
  props: {
    chartData: {
      type: Object,
      default: {},
    },
  },
  methods: {
    renderChart(data) {
      this._chart = new Chart(this.$refs.canvas.getContext('2d'), {
        type: 'line',
        data,
        options: {
          elements: {
            line: {
              tension: 0.00001,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                stepSize: 1,
              },
            }],
          },
        },
      });
    },
  },
  mounted() {
    this.renderChart(this.chartData);
  },
};
</script>
