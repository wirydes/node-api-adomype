import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { AnswerModel } from '../shared/models/answer.model';

export interface ISurveyRepository {
    getSurveysDropDown(): SurveyDropDownModel[];
    getSurveyAnswers(id: number): AnswerModel[];
}