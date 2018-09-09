import { SurveyService } from '../../services/survey.service';

export class AdomypeController {
    private surveyService: SurveyService = new SurveyService();

    getDropDownInfo(req , res) {
        new SurveyService().getSurveysDropDown()
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                throw err;
            });
    }

    getSurveyChartInfo(req , res) {
        new SurveyService().getSurveyAnswers(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            throw err;
        });
    }
}