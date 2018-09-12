import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';

export interface ISurveyService {
    getSurveysDropDown(): SurveyDropDownModel[];
    getSurveyAnswers(id: number): ChartsConfigModel;
}