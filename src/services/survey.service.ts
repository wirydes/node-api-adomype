import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';
import * as answersValue from '../shared/models/answer.value.model';
import { KeyProcessChartModel } from '../shared/models/key.process.chart.model';
import { SurveyAnswerModel } from '../shared/models/survey.answer.model';
import { MatureProfileChartModel } from '../shared/models/mature.profile.chart.model';
import { OrganizationalMatureChartModel } from '../shared/models/organizational.mature.chart.model';
import { StrategicProcessChartModel } from '../shared/models/strategic.process.chart.model';
import { SupportProcessChartModel } from '../shared/models/support.process.chart.model';

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
                model.keyProcessChart = this.getKeyProcessChart(surveyAnswers);
                model.matureProfileChart = this.getMatureProfileChart(surveyAnswers);
                model.organizationalMatureChart = this.getOrganizationalMatureChart(surveyAnswers);
                model.strategicChart = this.getStrategicChart(surveyAnswers);
                model.supportProcessChart = this.getSupportProcessChart(surveyAnswers);

                resolve(model);
            })
            .catch((err) => {
                rejects(err);
            });

        });

        return promise;
    }

    private getKeyProcessChart(surveyAnswers: SurveyAnswerModel): KeyProcessChartModel {
        let model = new KeyProcessChartModel();

        return model;
    }

    private getMatureProfileChart(surveyAnswers: SurveyAnswerModel): MatureProfileChartModel {
        let model = new MatureProfileChartModel();

        return model;
    }

    private getOrganizationalMatureChart(surveyAnswers: SurveyAnswerModel): OrganizationalMatureChartModel {
        let model = new OrganizationalMatureChartModel();

        return model;
    }

    private getStrategicChart(surveyAnswers: SurveyAnswerModel): StrategicProcessChartModel {
        let model = new StrategicProcessChartModel();

        return model;
    }

    private getSupportProcessChart(surveyAnswers: SurveyAnswerModel): SupportProcessChartModel {
        let model = new SupportProcessChartModel();

        return model;
    }
}