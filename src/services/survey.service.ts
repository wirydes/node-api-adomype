import { ISurveyService } from "./isurvey.service";
import { ISurveyRepository } from "../repositories/isurvey.repository";
import { SurveyRepository } from "../repositories/survey.repository";
import { SurveyDropDownModel } from "../shared/models/survey.dropdown.model";
import { ChartConfigModel } from "../shared/models/chart.config.model";

export class SurveyService implements ISurveyService {
    private surveyRepository: ISurveyRepository
    
    constructor() {
        this.surveyRepository = new SurveyRepository();
    }
    
    getSurveysDropDown(): SurveyDropDownModel[] {
        return this.surveyRepository.getSurveysDropDown();
    }

    getSurveyAnswers(id: number): ChartConfigModel {
        const surveyAnswers = this.surveyRepository.getSurveyAnswers(id);
        let model = new ChartConfigModel();

        return model;
    }
}