import { AdomypeController } from '../controllers/adomype.controller';
import { DownloadController } from '../controllers/download.controller';
export class Routes {
    private adomypeController: AdomypeController = new AdomypeController();
    private downloadController: DownloadController = new DownloadController();
    private readonly baseUrl = '/api/adomype';
    private readonly downloadUrl = '/api/download';

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

        app.route(this.downloadUrl + '/graphics/:id')
            .get(this.downloadController.downloadCharts);
    }
}