import { DbContext } from '../connection/db.context';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import * as mysql from 'mysql';
import { AnswerModel } from '../shared/models/answer.model';
import * as _ from 'underscore';

// const nameField = '121356X40X292';
// const tableName = 'lime_adomypesurvey_121356';
const nameField = '118169X58X400';
const tableName = 'lime_adomypesurvey_118169';
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

    getSurveyAnswersByToken(token: string): Promise<AnswerModel[]> {
        const pool = this.context.getPool();
        let data: AnswerModel[] = [];

        let tokenString = `'${token}'`;
        let sql = 'SELECT * FROM ' + tableName + ' WHERE ' + tableName + '.token = ' +  tokenString;
        let promise = new Promise<AnswerModel[]>((resolve, rejects) => {
            pool.getConnection((error, conn) => {
                if (error) {
                    rejects(error);
                }
                conn.query(sql, (er, results: any[]) => {
                    conn.release();
                    if (er || _.size(results) === 0) {
                        rejects(er);
                    } else {
                        data = this.bindSurveyToSurveyAnswerModel(results[0]);
                        resolve(data);
                    }
                });
            });
        });

        return promise;
    }

    bindSurveyToSurveyAnswerModel(result) {
        let array = [];
        // section 1 p1
        array.push(this.getAnswer(result['118169X51X365'], 1, 1, 1));
        array.push(this.getAnswer(result['118169X51X366'], 1, 1, 2));
        // section 1 p2
        array.push(this.getAnswer(result['118169X51X367'], 1, 2, 3));
        array.push(this.getAnswer(result['118169X51X368'], 1, 2, 4));
        // section 1 p3
        array.push(this.getAnswer(result['118169X51X399'], 1, 3, 5));
        array.push(this.getAnswer(result['118169X51X369'], 1, 3, 6));
        // section 2 p1
        array.push(this.getAnswer(result['118169X52X370'], 2, 1, 7));
        array.push(this.getAnswer(result['118169X52X371'], 2, 1, 8));
        // section 2 p2
        array.push(this.getAnswer(result['118169X52X372'], 2, 2, 9));
        array.push(this.getAnswer(result['118169X52X373'], 2, 2, 10));
        // section 2 p3
        array.push(this.getAnswer(result['118169X52X374'], 2, 3, 11));
        array.push(this.getAnswer(result['118169X52X375'], 2, 3, 12));
        // section 3 p1
        array.push(this.getAnswer(result['118169X53X376'], 3, 1, 13));
        // section 3 p2
        array.push(this.getAnswer(result['118169X53X377'], 3, 2, 14));
        array.push(this.getAnswer(result['118169X53X378'], 3, 2, 15));
        // section 3 p3
        array.push(this.getAnswer(result['118169X53X379'], 3, 3, 16));
        array.push(this.getAnswer(result['118169X53X380'], 3, 3, 17));
        // section 4 p1
        array.push(this.getAnswer(result['118169X54X381'], 4, 1, 18));
        // section 4 p2
        array.push(this.getAnswer(result['118169X54X382'], 4, 2, 19));
        array.push(this.getAnswer(result['118169X54X383'], 4, 2, 20));
        // section 5 p1
        array.push(this.getAnswer(result['118169X55X384'], 5, 1, 21));
        array.push(this.getAnswer(result['118169X55X385'], 5, 1, 22));
        // section 5 p2
        array.push(this.getAnswer(result['118169X55X386'], 5, 2, 23));
        array.push(this.getAnswer(result['118169X55X387'], 5, 2, 24));
        // section 6 p1
        array.push(this.getAnswer(result['118169X56X388'], 6, 1, 25));
        array.push(this.getAnswer(result['118169X56X389'], 6, 1, 26));
        // section 6 p2
        array.push(this.getAnswer(result['118169X56X390'], 6, 2, 27));
        // section 7 p1
        array.push(this.getAnswer(result['118169X57X391'], 7, 1, 28));
        array.push(this.getAnswer(result['118169X57X392'], 7, 1, 29));
        array.push(this.getAnswer(result['118169X57X393'], 7, 1, 30));
        // section 7 p2
        array.push(this.getAnswer(result['118169X57X394'], 7, 2, 31));
        array.push(this.getAnswer(result['118169X57X395'], 7, 2, 32));
        // section 7 p3
        array.push(this.getAnswer(result['118169X57X396'], 7, 3, 33));
        array.push(this.getAnswer(result['118169X57X397'], 7, 3, 34));
        array.push(this.getAnswer(result['118169X57X398'], 7, 4, 35));

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
            case 21:
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
            case 18:
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
            case 20:
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
                        return;
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