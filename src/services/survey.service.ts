import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';
import * as answersValue from '../shared/models/answer.value.model';
import { KeyProcessChartModel } from '../shared/models/key.process.chart.model';
import { MatureProfileChartModel } from '../shared/models/mature.profile.chart.model';
import { OrganizationalMatureChartModel } from '../shared/models/organizational.mature.chart.model';
import { StrategicProcessChartModel } from '../shared/models/strategic.process.chart.model';
import { SupportProcessChartModel } from '../shared/models/support.process.chart.model';
import { AnswerModel } from '../shared/models/answer.model';
import { ChartFieldModel } from '../shared/models/chart.field.model';

export class SurveyService {
    private surveyRepository: SurveyRepository = new SurveyRepository();

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        return this.surveyRepository.getSurveysDropDown();
    }

    getSurveyAnswers(id: number): Promise<ChartsConfigModel> {
        let model = new ChartsConfigModel();
        let promise = new Promise<ChartsConfigModel>((resolve, rejects) => {
            this.surveyRepository.getSurveyAnswers(id)
            .then((surveyAnswers) => {
                // logic of the formula
                // work with multiple sections
                let section2 = this.getSection(surveyAnswers, 2);
                let section3 = this.getSection(surveyAnswers, 3);
                let section4 = this.getSection(surveyAnswers, 4);
                let section5 = this.getSection(surveyAnswers, 5);
                let section6 = this.getSection(surveyAnswers, 6);
                model.keyProcessChart = this.getKeyProcessChart(section2, section3, section4, section5, section6);
                model.matureProfileChart = this.getMatureProfileChart(surveyAnswers);
                model.organizationalMatureChart = this.getOrganizationalMatureChart(surveyAnswers);

                // work with section 1 answers
                let section1 = this.getSection(surveyAnswers, 1);
                model.strategicChart = this.getStrategicChart(section1);

                // work with section 7 answers
                let section7 = this.getSection(surveyAnswers, 7);
                model.supportProcessChart = this.getSupportProcessChart(section7);

                resolve(model);
            })
            .catch((err) => {
                rejects(err);
            });

        });

        return promise;
    }
    private getSectionPercentageLabel(answers: AnswerModel[], label: string): ChartFieldModel {
        return {
            label: label,
            value: this.calculatePercentage(answers)
        };
    }

    private getKeyProcessChart(section2: AnswerModel[], section3: AnswerModel[], section4: AnswerModel[], section5: AnswerModel[],
        section6: AnswerModel[]): KeyProcessChartModel {
            let model = new KeyProcessChartModel();

            model.processPlanning = this.getSectionPercentageLabel(this.getPart(section2, 1), 'Planeacion de los procesos');
            model.formalizationOfProcesses = this.getSectionPercentageLabel(this.getPart(section2, 2), 'Formalizacion de procesos');
            model.monitoringAndOperationalControl = this.getSectionPercentageLabel(this.getPart(section2, 3), 'Seguimiento y control operativo');
            return model;
    }

    private getMatureProfileChart(answers: AnswerModel[]): MatureProfileChartModel {
        let model = new MatureProfileChartModel();

        return model;
    }

    private getOrganizationalMatureChart(answers: AnswerModel[]): OrganizationalMatureChartModel {
        let model = new OrganizationalMatureChartModel();

        return model;
    }

    private getStrategicChart(answers: AnswerModel[]): StrategicProcessChartModel {
        let model = new StrategicProcessChartModel();

        model.environmentAnalysis = this.getSectionPercentageLabel(this.getPart(answers, 1), 'Analysis de entorno');

        model.organizationalDesicions = this.getSectionPercentageLabel(this.getPart(answers, 2), 'Toma de decisiones a nivel organizacional');

        model.monitoringAndControl = this.getSectionPercentageLabel(this.getPart(answers, 3), 'Monitoreo y control a nivel organizacional');


        return model;
    }

    private getSupportProcessChart(answers: AnswerModel[]): SupportProcessChartModel {
        let model = new SupportProcessChartModel();

        model.personal = this.getSectionPercentageLabel(this.getPart(answers, 1), 'Personal');

        model.equipmentAndInfrastructure = this.getSectionPercentageLabel(this.getPart(answers, 2), 'Mantenimiento de infraestructura y equipo');

        model.technology = this.getSectionPercentageLabel(this.getPart(answers, 3), 'Tecnologia');

        model.financialManageMent = this.getSectionPercentageLabel(this.getPart(answers, 4), 'Apoyo a la gestion finnaciera');

        return model;
    }

    private calculatePercentage(answers: AnswerModel[]): number {
        let value = 0;
        let counter = 0;

        answers.forEach(element => {
            if (element.value !== 0) {
                value += element.value;
                counter++;
            }
        });

        value = value / counter;

        return value;
    }

    private getPart(answers: AnswerModel[], part: number): AnswerModel[] {
        let result: AnswerModel[] = [];

        result = answers.filter((item) => {
            item.part === part;
        });

        return result;
    }

    private getSection(answers: AnswerModel[], section: number): AnswerModel[] {
        let result: AnswerModel[] = [];

        result = answers.filter((item) => {
            item.section === section;
        });

        return result;
    }
}