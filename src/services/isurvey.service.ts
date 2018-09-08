import { SurveyDropDownModel } from "../shared/models/survey.dropdown.model";
import { ChartConfigModel } from "../shared/models/chart.config.model";

export interface ISurveyService {
    getSurveysDropDown(): SurveyDropDownModel[];
    getSurveyAnswers(id: number): ChartConfigModel;
}