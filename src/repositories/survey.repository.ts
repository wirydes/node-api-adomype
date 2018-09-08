import { DbContext } from '../connection/db.context';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { SurveyAnswerModel } from '../shared/models/survey.answer.model';
import { ISurveyRepository } from './isurvey.repository';

export class SurveyRepository implements ISurveyRepository {

    private context: DbContext;
    constructor() {
        this.context = new DbContext();
    }

    getSurveysDropDown(): SurveyDropDownModel[] {
        this.context.connect();
        
        const conn = this.context.getConnectionProperty();
        const nameField = '121356X40X292';
        let data: SurveyDropDownModel[];
        
        conn.query('SELECT id,' + nameField + ' from lime_adomypesurvey_121356', (error, results: [], fields) => {
            if (error) throw error;
           
            results.forEach((element: any) => {
                if (element[nameField] !== null) {
                    let model = new SurveyDropDownModel();
                    model.id = element.id;
                    model.name = element[nameField];
                    data.push(model);
                }
            });
        });

        this.context.endConnection();

        return data;
    }

    getSurveyAnswers(id: number): SurveyAnswerModel {
        this.context.connect();
        
        const conn = this.context.getConnectionProperty();
        const nameField = '121356X40X292';
        const tableName = 'lime_adomypesurvey_121356';
        let data: SurveyAnswerModel;
        const query = 'SELECT id,' + nameField + ' from' + tableName + 'WHERE ' + tableName + '.id =' + id;
        
        conn.query(query, (error, results: any, fields) => {
            if (error) throw error;

            data = this.bindSurveyToSurveyAnswerModel(results[0]); 
        });

        this.context.endConnection();

        return data;
    }

    bindSurveyToSurveyAnswerModel(result): SurveyAnswerModel {
        let model = new SurveyAnswerModel();
        
        return model;
    }
}