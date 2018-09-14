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

                    data = this.bindSurveyToSurveyAnswerModel(results[0]);
                    resolve(data);
                });
            });
        });

        return promise;
    }

    bindSurveyToSurveyAnswerModel(result): SurveyAnswerModel {
        let model = new SurveyAnswerModel();
        // section 1 p1
        model.answer1 = result['121356X33X257'];
        model.answer2 = result['121356X33X258'];
        // section 1 p2
        model.answer3 = result['121356X33X259'];
        model.answer4 = result['121356X33X260'];
        // section 1 p3
        model.answer5 = result['121356X33X291'];
        model.answer6 = result['121356X33X261'];
        // section 2 p1
        model.answer7 = result['121356X34X262'];
        model.answer8 = result['121356X34X263'];
        // section 2 p2
        model.answer9 = result['121356X34X264'];
        model.answer10 = result['121356X34X265'];
        // section 2 p3
        model.answer11 = result['121356X34X266'];
        model.answer12 = result['121356X34X267'];
        // section 3 p1
        model.answer13 = result['121356X35X268'];
        // section 3 p2
        model.answer14 = result['121356X35X269'];
        model.answer15 = result['121356X35X270'];
        // section 3 p3
        model.answer16 = result['121356X35X271'];
        model.answer17 = result['121356X35X272'];
        // section 4 p1
        model.answer18 = result['121356X36X273'];
        // section 4 p2
        model.answer19 = result['121356X36X274'];
        model.answer20 = result['121356X36X275'];
        // section 5 p1
        model.answer21 = result['121356X37X276'];
        model.answer22 = result['121356X37X277'];
        // section 5 p2
        model.answer23 = result['121356X37X278'];
        model.answer24 = result['121356X37X279'];
        // section 6 p1
        model.answer25 = result['121356X38X280'];
        model.answer26 = result['121356X38X281'];
       // section 6 p2
        model.answer27 = result['121356X38X282'];
        // section 7 p1
        model.answer28 = result['121356X39X283'];
        model.answer29 = result['121356X39X284'];
        model.answer30 = result['121356X39X285'];
        // section 7 p2
        model.answer31 = result['121356X39X286'];
        model.answer32 = result['121356X39X287'];
        // section 7 p3
        model.answer33 = result['121356X39X288'];
        model.answer34 = result['121356X39X289'];
        model.answer35 = result['121356X39X290'];

        return model;
    }
}