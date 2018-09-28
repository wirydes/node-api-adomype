import { AdomypeController } from '../controllers/adomype.controller';
import * as cors from 'cors';
export class Routes {
    private adomypeController: AdomypeController = new AdomypeController();
    private readonly baseUrl = '/api/adomype';

    setRoutes(app) {
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
          });
        app.get(this.baseUrl + '/dropdown/info', (req, res, next) => {
            this.adomypeController.getDropDownInfo(req, res);
        });

        app.route(this.baseUrl + '/chart/config/:id')
            .get(this.adomypeController.getSurveyChartInfo);
    }
}