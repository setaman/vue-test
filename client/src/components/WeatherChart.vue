<script>
    import {Line, mixins} from 'vue-chartjs';
    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        name: "weather-chart",
        mixins: [reactiveProp],
        props: {
            weather_data: {
                type: Object
            }
        },
        data() {
            return {
                gradient: null,
                gradient2: null
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

            this.gradient.addColorStop(0, "rgba(240,128,128, 0.9)");
            this.gradient.addColorStop(0.5, "rgba(240,128,128, 0.25)");
            this.gradient.addColorStop(1, "rgba(240,128,128, 0)");

            this.gradient2.addColorStop(0, "rgba(135, 206, 250, 0.5)");
            this.gradient2.addColorStop(0.5, "rgba(135, 206, 250, 0.25)");
            this.gradient2.addColorStop(1, "rgba(255, 0, 0, 0)");

            this.renderChart(
                {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                    ],
                    datasets: [
                        {
                            label: "Temperature",
                            borderColor: /*"#fc7d7b"*/ this.gradient2,
                            pointBackgroundColor: "white",
                            borderWidth: 5,
                            fontColor: 'white',
                            pointBorderColor: "white",
                            backgroundColor: 'transparent',
                            data: [19, 21, 24, 25, 27, 24, 16, 14]
                        }
                    ]
                },
                {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: false,
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
            );
        }

    }
</script>

<style scoped>

</style>