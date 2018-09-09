import { DbContext } from '../connection/db.context';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { SurveyAnswerModel } from '../shared/models/survey.answer.model';
import * as mysql from 'mysql';
export class SurveyRepository {

    private context: DbContext;
    constructor() {
        this.context = new DbContext();
    }

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        const pool = this.context.getPool();
        const nameField = '121356X40X292';
        const tableName = 'lime_adomypesurvey_121356';
        let sql = 'SELECT ??, ?? FROM ??';
        const inserts = ['id', nameField, tableName];
        sql = mysql.format(sql, inserts);

        let promise = new Promise<SurveyDropDownModel[]>((resolve, rejects) => {
            let data: SurveyDropDownModel[] = [];
            pool.getConnection((error, conn) => {
                if (error) {
                   rejects(error);
                }
                let query = conn.query(sql, (er, rows: any[]) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    rows.forEach((row) => {
                        if (row[nameField] !== null) {
                            let model = new SurveyDropDownModel();
                            model.id = row.id;
                            model.name = row[nameField];
                            data.push(model);
                        }
                    });
                    resolve(data);

                });
            });
        });

        return promise;
    }

    getSurveyAnswers(id: number): Promise<SurveyAnswerModel> {
        const pool = this.context.getPool();
        const nameField = '121356X40X292';
        const tableName = 'lime_adomypesurvey_121356';
        let data: SurveyAnswerModel;

        let sql = 'SELECT ??, ?? FROM ?? WHERE ??.id = ??';
        const inserts = ['id', nameField, tableName, tableName, id];
        sql = mysql.format(sql, inserts);

        let promise = new Promise<SurveyAnswerModel>((resolve, rejects) => {
            pool.getConnection((error, conn) => {
                conn.query(sql, (error, results: any, fields) => {
                    conn.release();
                    if (error) throw error;

                    data = this.bindSurveyToSurveyAnswerModel(results[0]);
                    resolve(data);
                });
            });
        });

        return promise;
    }

    bindSurveyToSurveyAnswerModel(result): SurveyAnswerModel {
        let model = new SurveyAnswerModel();

        return model;
    }
}