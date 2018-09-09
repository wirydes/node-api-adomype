import { AdomypeController } from '../controllers/adomype.controller';

export class Routes {
    private adomypeController: AdomypeController = new AdomypeController();
    private readonly baseUrl = '/api/adomype';

    setRoutes(app) {
        app.get(this.baseUrl + '/dropdown/info', (req, res) => {
            this.adomypeController.getDropDownInfo(req, res);
        });

        app.route(this.baseUrl + '/chart/config/:id')
            .get(this.adomypeController.getSurveyChartInfo);
    }
}