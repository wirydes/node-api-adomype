import { SurveyService } from '../../services/survey.service';

export class AdomypeController {
    private surveyService = new SurveyService();

    getDropDownInfo(req , res) {
        new SurveyService().getSurveysDropDown()
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    getSurveyChartInfo(req , res, next) {
        new SurveyService().getSurveyAnswers(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }

    getSurveyChartByTokenInfo(req , res, next) {
        new SurveyService().getSurveyAnswersByToken(req.params.token)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send('Token invalido');
        });
    }
}