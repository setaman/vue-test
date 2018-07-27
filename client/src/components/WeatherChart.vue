<script>
    import {Line} from 'vue-chartjs';

    export default {
        extends: Line,
        name: "weather-chart",
        props: ['weather'],
        data() {
            return {
                gradient: null,
                gradient2: null,
                options: {
                    onClick: (evt, elements) => {
                        console.log(elements);
                        this.$store.commit('CHANGE_CURRENT_CONDITION', this.weather.hours_forecast[elements[0]._index].condition)
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    tooltips: {
                        intersect: false,
                        titleFontFamily: 'Montserrat',
                        titleFontSize: 13,
                        titleSpacing: 30,
                        titleMarginBottom: 15,
                        bodyFontSize: 18,
                        bodyFontFamily: 'Montserrat',
                        displayColors: false,
                        callbacks: {
                            label: function (tooltipItem, data) {
                                let label = Math.round(tooltipItem.yLabel * 100) / 100;
                                return label + '°';
                            }
                        }
                    },
                    elements: {
                      point: {
                          pointStyle: 'circle',
                          radius: 5,
                          hitRadius: 60,
                          hoverRadius: 7
                      },
                        line: {
                       }
                    },
                    hover: {
                        animationDuration: 300, // duration of animations when hovering an item
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontFamily: 'Montserrat',
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
                                    fontFamily: 'Montserrat',
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
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
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

            this.renderChart(
                {
                    labels: [...this.weather.hours_forecast.map( (i) => i.time)],
                    datasets: [
                        {
                            label: "Temperature",
                            borderColor: /*"#fc7d7b"*/ this.gradient2,
                            pointBackgroundColor: "white",
                            borderWidth: 5,
                            fontColor: 'white',
                            pointBorderColor: "white",
                            backgroundColor: 'transparent',
                            data: [...this.weather.hours_forecast.map( (i) => i.temp)]
                        }
                    ]
                }, this.options);
            this.$data._chart.update();

        },
    }
</script>

<style scoped>

</style>