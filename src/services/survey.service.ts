import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';
import * as answersValue from '../shared/models/answer.value.model';

export class SurveyService {
    private surveyRepository: SurveyRepository = new SurveyRepository();

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        return this.surveyRepository.getSurveysDropDown();
    }

    getSurveyAnswers(id: number): Promise<ChartsConfigModel> {
        let model = new ChartsConfigModel();
        let promise = new Promise<ChartsConfigModel>((resolve, rejects) => {
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