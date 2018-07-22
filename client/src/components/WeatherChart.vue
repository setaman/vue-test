<script>
    import {Line, mixins} from 'vue-chartjs';
    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        name: "weather-chart",
        mixins: [reactiveProp],

        data() {
            return {
                gradient: null,
                gradient2: null,
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white'
                                },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: 'white'
                                },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                }
                            }
                        ]
                    },
                    legend: {
                        display: true
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
        created() {},
        mounted() {
            this.gradient = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);
            this.gradient2 = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);

            this.gradient.addColorStop(0, "rgba(240,128,128, 2)");
            this.gradient.addColorStop(0.5, "rgba(240,128,128, 0.25)");
            this.gradient.addColorStop(1, "rgba(240,128,128, 0)");

            this.gradient2.addColorStop(0, "rgba(255, 165, 0, 1)");
            this.gradient2.addColorStop(0.5, "rgba(135, 206, 250, 0.25)");
            this.gradient2.addColorStop(1, "rgba(135, 206, 250, 0.5)");

            console.warn(this.chartData);
            //...this.chartData.hours_forecast.map( (i) => i.time)
            this.renderChart(
                {
                    labels: [...this.chartData.hours_forecast.map( (i) => i.time)],
                    datasets: [
                        {
                            label: "Temperature",
                            borderColor: /*"#fc7d7b"*/ this.gradient2,
                            pointBackgroundColor: "white",
                            borderWidth: 5,
                            fontColor: 'white',
                            pointBorderColor: "white",
                            backgroundColor: 'transparent',
                            data: [...this.chartData.hours_forecast.map( (i) => i.temp)]
                        }
                    ]
                }, this.options);
        },
        beforeUpdate() {
            this.gradient = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);
            this.gradient2 = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);

            this.gradient.addColorStop(0, "rgba(240,128,128, 2)");
            this.gradient.addColorStop(0.5, "rgba(240,128,128, 0.25)");
            this.gradient.addColorStop(1, "rgba(240,128,128, 0)");

            this.gradient2.addColorStop(0, "rgba(255, 165, 0, 1)");
            this.gradient2.addColorStop(0.5, "rgba(135, 206, 250, 0.25)");
            this.gradient2.addColorStop(1, "rgba(135, 206, 250, 0.5)");

            console.warn(this.chartData);
            //...this.chartData.hours_forecast.map( (i) => i.time)
            this.renderChart(
                {
                    labels: [...this.chartData.hours_forecast.map( (i) => i.time)],
                    datasets: [
                        {
                            label: "Temperature",
                            borderColor: /*"#fc7d7b"*/ this.gradient2,
                            pointBackgroundColor: "white",
                            borderWidth: 5,
                            fontColor: 'white',
                            pointBorderColor: "white",
                            backgroundColor: 'transparent',
                            data: [...this.chartData.hours_forecast.map( (i) => i.temp)]
                        }
                    ]
                }, this.options);
        }

    }
</script>

<style scoped>

</style>