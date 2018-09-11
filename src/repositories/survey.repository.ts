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
                conn.query(sql, (er, rows: any[]) => {
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

        let sql = 'SELECT * FROM ' + tableName + ' WHERE ' + tableName + '.id = ' + id;

        let promise = new Promise<SurveyAnswerModel>((resolve, rejects) => {
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                 }
                conn.query(sql, (er, results: any) => {
                    conn.release();
                    if (er) throw rejects(er);
                    console.log(results[0]);
                    data = this.bindSurveyToSurveyAnswerModel(results[0]);
                    console.log(data);
                    resolve(data);
                });
            });
        });

        return promise;
    }

    bindSurveyToSurveyAnswerModel(result): SurveyAnswerModel {
        let model = new SurveyAnswerModel();

        model.answer1 = result['121356X40X296'];
        model.answer2 = result['121356X40X296other'];
        model.answer3 = result['121356X40X297'];
        model.answer4 = result['121356X40X298'];
        model.answer5 = result['121356X40X303'];
        model.answer6 = result['121356X40X303other'];
        model.answer7 = result['121356X41X300'];
        model.answer8 = result['121356X41X304'];
        model.answer9 = result['121356X41X305'];
        model.answer10 = result['121356X41X299'];
        model.answer11 = result['121356X41X307'];
        model.answer12 = result['121356X41X306'];
        model.answer13 = result['121356X41X309'];
        model.answer14 = result['121356X33X258'];
        model.answer15 = result['121356X33X259'];
        model.answer16 = result['121356X33X260'];
        model.answer17 = result['121356X33X261'];
        model.answer18 = result['121356X34X262'];
        model.answer19 = result['121356X34X263'];
        model.answer20 = result['121356X34X264'];
        model.answer21 = result['121356X34X265'];
        model.answer22 = result['121356X34X266'];
        model.answer23 = result['121356X34X267'];
        model.answer24 = result['121356X35X268'];
        model.answer25 = result['121356X35X269'];
        model.answer26 = result['121356X35X270'];
        model.answer27 = result['121356X35X271'];
        model.answer28 = result['121356X35X272'];
        model.answer29 = result['121356X36X273'];
        model.answer30 = result['121356X36X274'];
        model.answer31 = result['121356X36X275'];
        model.answer32 = result['121356X37X276'];
        model.answer33 = result['121356X37X277'];
        model.answer34 = result['121356X37X278'];
        model.answer35 = result['121356X37X279'];
        model.answer36 = result['121356X38X280'];
        model.answer37 = result['121356X38X281'];
        model.answer38 = result['121356X38X282'];
        model.answer39 = result['121356X39X283'];
        model.answer40 = result['121356X39X284'];
        model.answer41 = result['121356X39X285'];
        model.answer42 = result['121356X39X286'];
        model.answer43 = result['121356X39X287'];
        model.answer44 = result['121356X39X288'];
        model.answer45 = result['121356X39X289'];
        model.answer46 = result['121356X39X290'];

        return model;
    }
}