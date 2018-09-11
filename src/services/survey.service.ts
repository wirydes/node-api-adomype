import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartConfigModel } from '../shared/models/chart.config.model';
import { rejects } from 'assert';

export class SurveyService {
    private surveyRepository: SurveyRepository = new SurveyRepository();

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        return this.surveyRepository.getSurveysDropDown();
    }

    getSurveyAnswers(id: number): Promise<ChartConfigModel> {
        let model = new ChartConfigModel();
        let promise = new Promise<ChartConfigModel>((resolve, rejects) => {
            this.surveyRepository.getSurveyAnswers(id)
            .then((survey) => {
                // logic of the formula
                resolve(model);
            })
            .catch((err) => {
                rejects(err);
            });

        });
        return promise;
    }
}