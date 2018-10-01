import { DownloadService } from '../../services/download.service';

export class DownloadController {
    private downloadService = new DownloadService();
    downloadCharts(req , res, next) {
        new DownloadService().downloadCharts(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }
}