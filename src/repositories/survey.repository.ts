import { DbContext } from '../connection/db.context';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { SurveyAnswerModel } from '../shared/models/survey.answer.model';
import * as mysql from 'mysql';
import { AnswerModel } from '../shared/models/answer.model';

const nameField = '121356X40X292';
const tableName = 'lime_adomypesurvey_121356';
export class SurveyRepository {

    private context: DbContext;
    constructor() {
        this.context = new DbContext();
    }

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        const pool = this.context.getPool();
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
        model.answer1 = this.getAnswer(result['121356X33X257'], 1, 1, 1);
        model.answer2 = this.getAnswer(result['121356X33X258'], 1, 1, 2);
        // section 1 p2
        model.answer3 = this.getAnswer(result['121356X33X259'], 1, 2, 3);
        model.answer4 = this.getAnswer(result['121356X33X260'], 1, 2, 4);
        // section 1 p3
        model.answer5 = this.getAnswer(result['121356X33X291'], 1, 3, 5);
        model.answer6 = this.getAnswer(result['121356X33X261'], 1, 3, 6);
        // section 2 p1
        model.answer7 = this.getAnswer(result['121356X34X262'], 2, 1, 7);
        model.answer8 = this.getAnswer(result['121356X34X263'], 2, 1, 8);
        // section 2 p2
        model.answer9 = this.getAnswer(result['121356X34X264'], 2, 2, 9);
        model.answer10 = this.getAnswer(result['121356X34X265'], 2, 2, 10);
        // section 2 p3
        model.answer11 = this.getAnswer(result['121356X34X266'], 2, 3, 11);
        model.answer12 = this.getAnswer(result['121356X34X267'], 2, 3, 12);
        // section 3 p1
        model.answer13 = this.getAnswer(result['121356X35X268'], 3, 1, 13);
        // section 3 p2
        model.answer14 = this.getAnswer(result['121356X35X269'], 3, 2, 14);
        model.answer15 = this.getAnswer(result['121356X35X270'], 3, 2, 15);
        // section 3 p3
        model.answer16 = this.getAnswer(result['121356X35X271'], 3, 3, 16);
        model.answer17 = this.getAnswer(result['121356X35X272'], 3, 3, 17);
        // section 4 p1
        model.answer18 = this.getAnswer(result['121356X36X273'], 4, 1, 18);
        // section 4 p2
        model.answer19 = this.getAnswer(result['121356X36X274'], 4, 2, 19);
        model.answer20 = this.getAnswer(result['121356X36X275'], 4, 2, 20);
        // section 5 p1
        model.answer21 = this.getAnswer(result['121356X37X276'], 5, 1, 21);
        model.answer22 = this.getAnswer(result['121356X37X277'], 5, 1, 22);
        // section 5 p2
        model.answer23 = this.getAnswer(result['121356X37X278'], 5, 2, 23);
        model.answer24 = this.getAnswer(result['121356X37X279'], 5, 2, 24);
        // section 6 p1
        model.answer25 = this.getAnswer(result['121356X38X280'], 6, 1, 25);
        model.answer26 = this.getAnswer(result['121356X38X281'], 6, 1, 26);
       // section 6 p2
        model.answer27 = this.getAnswer(result['121356X38X282'], 6, 2, 27);
        // section 7 p1
        model.answer28 = this.getAnswer(result['121356X39X283'], 7, 1, 28);
        model.answer29 = this.getAnswer(result['121356X39X284'], 7, 1, 29);
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

    private getAnswer(key: string, section: number, part: number, order: number): AnswerModel {
        let model = new AnswerModel();

        model.key = key;
        model.section = section;
        model.part = part;
        model.value = this.getAnswerValue(key, order);

        return model;
    }

    private getAnswerValue(key: string, order: number): number {
        switch (order) {
            case 1:
                break;
            case 1:
                break;
        }

        return 0;
    }
}