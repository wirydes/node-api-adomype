import { SurveyService } from './survey.service';
import * as fs from 'fs';
import * as ChartjsNode from 'chartjs-node';
import { Chart } from 'chart.js';
import { RadarChartModel } from '../shared/models/radar.chart.model';
import { MatureProfileChartModel } from '../shared/models/mature.profile.chart.model';
import { OrganizationalMatureChartModel } from '../shared/models/organizational.mature.chart.model';
import { ChartFieldModel } from '../shared/models/chart.field.model';

const filesDirectory = '';
export class DownloadService {
    private adomipeService = new SurveyService();

    downloadCharts(id): Promise<any> {
        let promise = new Promise<any>((resolve, rejects) => {
            this.adomipeService.getSurveyAnswers(id)
                .then((data) => {
                   // this.createRadarChart(data.keyProcessChart, 'test');
                    // fs.writeFile('fileName.png', data, 'binary', function (err) {
                    //     if (err) {
                    //         rejects(err);
                    //     }
                    //     console.log('The sheel file was written');
                    // });

                }).catch((error) => {
                    rejects(error);
                });
        });

        return promise;
    }

    private createRadarChart(chartData: RadarChartModel, name: string): string {
        let filePath = '';
        const labels = this.getRadarLabels(chartData.parts);
        const values = this.getRadarValues(chartData.parts);
        const options = this.getRadarOptions();
        let chartJsOptions = {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    borderColor: 'rgb(30,144,255)',
                    backgroundColor: 'rgb(160, 142, 248, 0.2)',
                    pointBorderColor: 'blue',
                    pointBackgroundColor: 'red',
                    fill: true
                }],
            },
            options: options
        };
        let chartNode = new ChartjsNode(600, 600);
        return chartNode.drawChart(chartJsOptions)
            .then(() => {
                // chart is created

                // get image as png buffer
                return chartNode.getImageBuffer('image/png');
            })
            .then(buffer => {
                // Array.isArray(buffer)// => true
                // as a stream
                return chartNode.getImageStream('image/png');
            })
            .then(streamResult => {
                // using the length property you can do things like
                // directly upload the image to s3 by using the
                // stream and length properties
                // streamResult.stream // => Stream object
                // streamResult.length // => Integer length of stream
                // write to a file
                return chartNode.writeImageToFile('image/png', './src/files/testimage.png');
            })
            .then(() => {
                // chart is now written to the file path
                // ./testimage.png
            });

        return filePath;
    }

    private createHorizontalBarChart(chart: OrganizationalMatureChartModel): string {
        let filePath = '';

        return filePath;
    }

    private createBarChart(chart: MatureProfileChartModel): string {
        let filePath = '';

        return filePath;
    }

    private getRadarLabels(parts: ChartFieldModel[]): string[] {
        return parts.map((element: ChartFieldModel) => {
            return element.label;
        });
    }

    private getRadarValues(parts: ChartFieldModel[]): number[] {
        return parts.map((element: ChartFieldModel) => {
            return element.value;
        });
    }

    private getRadarOptions() {
        return {
            legend: {
                display: false
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: this.getPluginsOptionsConfig()
        };
    }

    private getPluginsOptionsConfig() {
        return {
            onComplete: function (chart, easing) {
                const self = chart.config;    /* Configuration object containing type, data, options */
                const ctx = chart.chart.ctx;  /* Canvas context used to draw with */
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                if (!!this.data) {
                  this.data.datasets.forEach((dataset, i) => {
                    ctx.fillStyle = 'black';
                    self.getDatasetMeta(i).data.forEach((p, j) => {
                      const value = this.data.datasets[i].data[j];
                      if (value !== 0 && value !== null) {
                        const precision = value === 100 ? 3 : 2;
                        ctx.fillText(value.toPrecision(precision) + '%', p._model.x, p._model.y + 20);
                      }
                    });
                  });
                }
            }
        };
    }

}