import { DbContext } from '../connection/db.context';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
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

    getSurveyAnswers(id: number): Promise<AnswerModel[]> {
        const pool = this.context.getPool();
        let data: AnswerModel[] = [];

        let sql = 'SELECT * FROM ' + tableName + ' WHERE ' + tableName + '.id = ' + id;
        let promise = new Promise<AnswerModel[]>((resolve, rejects) => {
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, results: any) => {
                    conn.release();
                    if (er) {
                        rejects(er);
                    }

                    data = this.bindSurveyToSurveyAnswerModel(results[0]);
                    resolve(data);
                });
            });
        });

        return promise;
    }

    bindSurveyToSurveyAnswerModel(result): AnswerModel[] {
        let array: AnswerModel[] = [];
        // section 1 p1
        array.push(this.getAnswer(result['121356X33X257'], 1, 1, 1));
        array.push(this.getAnswer(result['121356X33X258'], 1, 1, 2));
        // section 1 p2
        array.push(this.getAnswer(result['121356X33X259'], 1, 2, 3));
        array.push(this.getAnswer(result['121356X33X260'], 1, 2, 4));
        // section 1 p3
        array.push(this.getAnswer(result['121356X33X291'], 1, 3, 5));
        array.push(this.getAnswer(result['121356X33X261'], 1, 3, 6));
        // section 2 p1
        array.push(this.getAnswer(result['121356X34X262'], 2, 1, 7));
        array.push(this.getAnswer(result['121356X34X263'], 2, 1, 8));
        // section 2 p2
        array.push(this.getAnswer(result['121356X34X264'], 2, 2, 9));
        array.push(this.getAnswer(result['121356X34X265'], 2, 2, 10));
        // section 2 p3
        array.push(this.getAnswer(result['121356X34X266'], 2, 3, 11));
        array.push(this.getAnswer(result['121356X34X267'], 2, 3, 12));
        // section 3 p1
        array.push(this.getAnswer(result['121356X35X268'], 3, 1, 13));
        // section 3 p2
        array.push(this.getAnswer(result['121356X35X269'], 3, 2, 14));
        array.push(this.getAnswer(result['121356X35X270'], 3, 2, 15));
        // section 3 p3
        array.push(this.getAnswer(result['121356X35X271'], 3, 3, 16));
        array.push(this.getAnswer(result['121356X35X272'], 3, 3, 17));
        // section 4 p1
        array.push(this.getAnswer(result['121356X36X273'], 4, 1, 18));
        // section 4 p2
        array.push(this.getAnswer(result['121356X36X274'], 4, 2, 19));
        array.push(this.getAnswer(result['121356X36X275'], 4, 2, 20));
        // section 5 p1
        array.push(this.getAnswer(result['121356X37X276'], 5, 1, 21));
        array.push(this.getAnswer(result['121356X37X277'], 5, 1, 22));
        // section 5 p2
        array.push(this.getAnswer(result['121356X37X278'], 5, 2, 23));
        array.push(this.getAnswer(result['121356X37X279'], 5, 2, 24));
        // section 6 p1
        array.push(this.getAnswer(result['121356X38X280'], 6, 1, 25));
        array.push(this.getAnswer(result['121356X38X281'], 6, 1, 26));
        // section 6 p2
        array.push(this.getAnswer(result['121356X38X282'], 6, 2, 27));
        // section 7 p1
        array.push(this.getAnswer(result['121356X39X283'], 7, 1, 28));
        array.push(this.getAnswer(result['121356X39X284'], 7, 1, 29));
        array.push(this.getAnswer(result['121356X39X285'], 7, 1, 30));
        // section 7 p2
        array.push(this.getAnswer(result['121356X39X286'], 7, 2, 31));
        array.push(this.getAnswer(result['121356X39X287'], 7, 2, 32));
        // section 7 p3
        array.push(this.getAnswer(result['121356X39X288'], 7, 3, 33));
        array.push(this.getAnswer(result['121356X39X289'], 7, 3, 34));
        array.push(this.getAnswer(result['121356X39X290'], 7, 4, 35));

        return array;
    }

    private getAnswer(key: string, section: number, part: number, order: number): AnswerModel {
        let model = new AnswerModel();

        model.key = key;
        model.section = section;
        model.part = part;
        model.value = this.getAnswerValue(key, order);

        return model;
    }

    private orangeGreenYellowRed(key: string): number {
        switch (key) {
            case 'A2':
                return 61;
            case 'A3':
                return 45;
            case 'A4':
                return 100;
            case 'A5':
                return 90;
            case 'A6':
                return 84;
            case 'A7':
                return 70;
            case 'A8':
                return 32;
            case 'A9':
                return 15;
        }
    }
    // todo find another way to do this.....
    private getAnswerValue(key: string, order: number): number {
        switch (order) {
            case 1:
                switch (key) {
                    case 'A2':
                        return 32;
                    case 'A3':
                        return 15;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 61;
                    case 'A7':
                        return 45;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            // orange green yellow red
            case 2:
            case 22:
                return this.orangeGreenYellowRed(key);
            case 3:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return 70;
                }
            // orange yellow green red
            case 4:
            case 6:
            case 19:
            case 20:
                switch (key) {
                    case 'A2':
                        return 61;
                    case 'A3':
                        return 45;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 100;
                    case 'A7':
                        return 90;
                    case 'A8':
                        return 32;
                    case 'A9':
                        return 15;
                }
            // orange red green yellow
            case 5:
            case 12:
            case 35:
                switch (key) {
                    case 'A2':
                        return 61;
                    case 'A3':
                        return 45;
                    case 'A4':
                        return 32;
                    case 'A5':
                        return 15;
                    case 'A6':
                        return 100;
                    case 'A7':
                        return 90;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return 70;
                }
            // orange green red yellow
            case 7:
            case 21:
                switch (key) {
                    case 'A2':
                        return 61;
                    case 'A3':
                        return 45;
                    case 'A4':
                        return 100;
                    case 'A5':
                        return 90;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return 70;
                }
                // green yellow orange red
            case 8:
            case 9:
            case 11:
            case 23:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 61;
                    case 'A7':
                        return 45;
                    case 'A8':
                        return 32;
                    case 'A9':
                        return 15;
                }
            case 10:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            // red orange green yellow
            case 13:
            case 16:
            case 24:
            case 26:
                switch (key) {
                    case 'A2':
                        return 32;
                    case 'A3':
                        return 15;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 100;
                    case 'A7':
                        return 90;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return 70;
                }
            case 14:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            case 15:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 32;
                    case 'A5':
                        return 15;
                    case 'A6':
                        return 61;
                    case 'A7':
                        return 45;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            case 17:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 84;
                    case 'A7':
                        return 70;
                    case 'A8':
                        return 32;
                    case 'A9':
                        return 15;
                }
            case 18:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return 70;
                }
            case 25:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 32;
                    case 'A5':
                        return 15;
                    case 'A6':
                        return 84;
                    case 'A7':
                        return 70;
                    case 'A8':
                        return 61;
                    case 'A9':
                        return 45;
                }
            case 27:
                switch (key) {
                    case 'A2':
                        return 32;
                    case 'A3':
                        return 15;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 100;
                    case 'A7':
                        return 90;
                    case 'A8':
                        return 61;
                    case 'A9':
                        return 45;
                }
            case 28:
                switch (key) {
                    case 'A2':
                        return 100;
                    case 'A3':
                        return 90;
                    case 'A4':
                        return 61;
                    case 'A5':
                        return 45;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 84;
                    case 'A9':
                        return ;
                }
            case 29:
                switch (key) {
                    case 'A2':
                        return 32;
                    case 'A3':
                        return 15;
                    case 'A4':
                        return 100;
                    case 'A5':
                        return 90;
                    case 'A6':
                        return 84;
                    case 'A7':
                        return 70;
                    case 'A8':
                        return 61;
                    case 'A9':
                        return 45;
                }
            case 30:
                switch (key) {
                    case 'A2':
                        return 61;
                    case 'A3':
                        return 45;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            case 31:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 32;
                    case 'A5':
                        return 15;
                    case 'A6':
                        return 61;
                    case 'A7':
                        return 45;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            case 32:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 100;
                    case 'A5':
                        return 90;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 61;
                    case 'A9':
                        return 45;
                }
            case 33:
                switch (key) {
                    case 'A2':
                        return 61;
                    case 'A3':
                        return 45;
                    case 'A4':
                        return 84;
                    case 'A5':
                        return 70;
                    case 'A6':
                        return 32;
                    case 'A7':
                        return 15;
                    case 'A8':
                        return 100;
                    case 'A9':
                        return 90;
                }
            case 34:
                switch (key) {
                    case 'A2':
                        return 84;
                    case 'A3':
                        return 70;
                    case 'A4':
                        return 32;
                    case 'A5':
                        return 15;
                    case 'A6':
                        return 100;
                    case 'A7':
                        return 90;
                    case 'A8':
                        return 61;
                    case 'A9':
                        return 45;
                }
        }

        return 0;
    }
}