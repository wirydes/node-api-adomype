import { SurveyDropDownModel } from "../shared/models/survey.dropdown.model";
import { SurveyAnswerModel } from "../shared/models/survey.answer.model";

export interface ISurveyRepository {
    getSurveysDropDown(): SurveyDropDownModel[];
    getSurveyAnswers(id: number): SurveyAnswerModel;
}