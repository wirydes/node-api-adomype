import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';
import * as answersValue from '../shared/models/answer.value.model';
import { KeyProcessChartModel } from '../shared/models/key.process.chart.model';
import { MatureProfileChartModel } from '../shared/models/mature.profile.chart.model';
import { OrganizationalMatureChartModel } from '../shared/models/organizational.mature.chart.model';
import { StrategicProcessChartModel } from '../shared/models/strategic.process.chart.model';
import { SupportProcessChartModel } from '../shared/models/support.process.chart.model';
import { AnswerModel } from '../shared/models/answer.model';
import { ChartFieldModel } from '../shared/models/chart.field.model';

// section 1
const ENVIRONMENTANALYSIS = 'Analysis de entorno';
const ORGANIZATIONALDESICIONS = 'Toma de decisiones a nivel organizacional';
const MONITORINGANDCONTROL = 'Monitoreo y control a nivel organizacional';
// section 2
const PROCESSPLANNING = 'Planeacion de los procesos';
const FORMALIZATIONOFPROCESSES = 'Formalizacion de procesos';
const MONITORINGANDOPERATIONALCONTROL = 'Seguimiento y control operativo';
// section 3
const SHOPPINGRESULTS = 'Resultados de compras';
const SELECTIONOFNEWSUPPLIERS = 'Seleccion de nuevos proveedores';
const ACTUALSUPPLIERSEVALUATION = 'Evaluacion del desempeño de provedores actuales';
// section 4
const PRODUCTIVEPROCESSRESULT = 'Resultados del proceso productivo';
const DELIVERYOFVALUEPROCESS = 'Procesos para la entrega de valor';
// section 5
const DEFINITIONOFVALUE = 'Definicoin de valor';
const CUSTOMERSATISFACTION = 'Medicion de satisfaccion del cliente';
// section 6
const INVENTORYCONTROL = 'Control de inventarios';
const STORAGE = 'Almacenamiento';
// section 7
const PERSONAL = 'Personal';
const EQUIPMENTANDINFRASTRUCTURE = 'Mantenimiento de infraestructura y equipo';
const TECHNOLOGY = 'Tecnologia';
const FINANCIALMANAGEMENT = 'Apoyo a la gestion finnaciera';

export class SurveyService {
    private surveyRepository: SurveyRepository = new SurveyRepository();

    getSurveysDropDown(): Promise<SurveyDropDownModel[]> {
        return this.surveyRepository.getSurveysDropDown();
    }

    getSurveyAnswers(id: number): Promise<ChartsConfigModel> {
        let model = new ChartsConfigModel();
        let promise = new Promise<ChartsConfigModel>((resolve, rejects) => {
            this.surveyRepository.getSurveyAnswers(id)
                .then((surveyAnswers) => {
                    // logic of the formula
                    this.sectionsLogicProcesor(surveyAnswers, model);

                    resolve(model);
                })
                .catch((err) => {
                    rejects(err);
                });

        });

        return promise;
    }
    sectionsLogicProcesor(surveyAnswers: AnswerModel[], model: ChartsConfigModel): void {
        let section1 = this.getSection(surveyAnswers, 1);
        let section2 = this.getSection(surveyAnswers, 2);
        let section3 = this.getSection(surveyAnswers, 3);
        let section4 = this.getSection(surveyAnswers, 4);
        let section5 = this.getSection(surveyAnswers, 5);
        let section6 = this.getSection(surveyAnswers, 6);
        let section7 = this.getSection(surveyAnswers, 7);
        // section 1
        let environmentAnalysis = this.getSectionPercentageLabel(this.getPart(section1, 1), ENVIRONMENTANALYSIS);
        let organizationalDesicions = this.getSectionPercentageLabel(this.getPart(section1, 2), ORGANIZATIONALDESICIONS);
        let monitoringAndControl = this.getSectionPercentageLabel(this.getPart(section1, 3), MONITORINGANDCONTROL);
        // section 2
        let processPlanning = this.getSectionPercentageLabel(this.getPart(section2, 1), PROCESSPLANNING);
        let formalizationOfProcesses = this.getSectionPercentageLabel(this.getPart(section2, 2), FORMALIZATIONOFPROCESSES);
        let monitoringAndOperationalControl = this.getSectionPercentageLabel(this.getPart(section2, 3), MONITORINGANDOPERATIONALCONTROL);
        // section 3
        let shoppingResults = this.getSectionPercentageLabel(this.getPart(section3, 1), SHOPPINGRESULTS);
        let selectionOfNewSuppliers = this.getSectionPercentageLabel(this.getPart(section3, 2), SELECTIONOFNEWSUPPLIERS);
        let actualSuppliersEvaluation = this.getSectionPercentageLabel(this.getPart(section3, 3), ACTUALSUPPLIERSEVALUATION);
        // section 4
        let productiveProcessResult = this.getSectionPercentageLabel(this.getPart(section4, 1), PRODUCTIVEPROCESSRESULT);
        let deliveryOfValueProcess = this.getSectionPercentageLabel(this.getPart(section4, 2), DELIVERYOFVALUEPROCESS);
        // section 5
        let definitionOfValue = this.getSectionPercentageLabel(this.getPart(section5, 1), DEFINITIONOFVALUE);
        let customerSatisfaction = this.getSectionPercentageLabel(this.getPart(section5, 2), CUSTOMERSATISFACTION);
        // section 6
        let inventoryControl = this.getSectionPercentageLabel(this.getPart(section6, 1), INVENTORYCONTROL);
        let storage = this.getSectionPercentageLabel(this.getPart(section6, 2), STORAGE);
        // section 7
        let personal = this.getSectionPercentageLabel(this.getPart(section7, 1), PERSONAL);
        let equipmentAndInfrastructure = this.getSectionPercentageLabel(this.getPart(section7, 2), EQUIPMENTANDINFRASTRUCTURE);
        let technology = this.getSectionPercentageLabel(this.getPart(section7, 3), TECHNOLOGY);
        let financialManageMent = this.getSectionPercentageLabel(this.getPart(section7, 4), FINANCIALMANAGEMENT);

        model.keyProcessChart = new KeyProcessChartModel();
        // section 2
        model.keyProcessChart.processPlanning = processPlanning;
        model.keyProcessChart.formalizationOfProcesses = formalizationOfProcesses;
        model.keyProcessChart.monitoringAndOperationalControl = monitoringAndOperationalControl;
        // section 3
        model.keyProcessChart.shoppingResults = shoppingResults;
        model.keyProcessChart.selectionOfNewSuppliers = selectionOfNewSuppliers;
        model.keyProcessChart.actualSuppliersEvaluation = actualSuppliersEvaluation;
        // section 4
        model.keyProcessChart.productiveProcessResult = productiveProcessResult;
        model.keyProcessChart.deliveryOfValueProcess = deliveryOfValueProcess;
        // section 5
        model.keyProcessChart.definitionOfValue = definitionOfValue;
        model.keyProcessChart.customerSatisfaction = customerSatisfaction;
        // section 6
        model.keyProcessChart.inventoryControl = inventoryControl;
        model.keyProcessChart.storage = storage;

        model.matureProfileChart = new MatureProfileChartModel();
        model.matureProfileChart.section1.part1 = environmentAnalysis;
        model.matureProfileChart.section1.part2 = organizationalDesicions;
        model.matureProfileChart.section1.part3 = monitoringAndControl;

        model.matureProfileChart.section2.part1 = processPlanning;
        model.matureProfileChart.section2.part2 = formalizationOfProcesses;
        model.matureProfileChart.section2.part3 = monitoringAndOperationalControl;

        model.matureProfileChart.section3.part1 = shoppingResults;
        model.matureProfileChart.section3.part2 = selectionOfNewSuppliers;
        model.matureProfileChart.section3.part3 = actualSuppliersEvaluation;

        model.matureProfileChart.section4.part1 = productiveProcessResult;
        model.matureProfileChart.section4.part2 = deliveryOfValueProcess;

        model.matureProfileChart.section5.part1 = definitionOfValue;
        model.matureProfileChart.section5.part2 = customerSatisfaction;

        model.matureProfileChart.section6.part1 = inventoryControl;
        model.matureProfileChart.section6.part2 = storage;

        model.matureProfileChart.section7.part1 = personal;
        model.matureProfileChart.section7.part2 = equipmentAndInfrastructure;
        model.matureProfileChart.section7.part3 = technology;
        model.matureProfileChart.section7.part4 = financialManageMent;


        // work with section 1 answers
        model.strategicChart = new StrategicProcessChartModel();
        model.strategicChart.environmentAnalysis = environmentAnalysis;
        model.strategicChart.organizationalDesicions = organizationalDesicions;
        model.strategicChart.monitoringAndControl = monitoringAndControl;

        // work with section 7 answers
        model.supportProcessChart = new SupportProcessChartModel();
        model.supportProcessChart.personal = personal;
        model.supportProcessChart.equipmentAndInfrastructure = equipmentAndInfrastructure;
        model.supportProcessChart.technology = technology;
        model.supportProcessChart.financialManageMent = financialManageMent;

        // use all answers
        model.organizationalMatureChart = this.getOrganizationalMatureChart(surveyAnswers);

    }
    private getSectionPercentageLabel(answers: AnswerModel[], label: string): ChartFieldModel {
        return {
            label: label,
            value: this.calculatePercentage(answers)
        };
    }

    private getOrganizationalMatureChart(answers: AnswerModel[]): OrganizationalMatureChartModel {
        let model = new OrganizationalMatureChartModel();

        model.fullFinishPercentage = this.calculatePercentage(answers);
        model.unFinishPercentage = 100 - model.fullFinishPercentage;
        model.matureLv = this.getMatureLvLabel(model.fullFinishPercentage);

        return model;
    }

    private getMatureLvLabel(percentage: number): string {
        if (percentage >= 85) {
            return 'Maduro';
        }

        if (percentage >= 62) {
            return 'En desarrollo';
        }

        if (percentage >= 33) {
            return 'Artesanal';
        }

        return 'Incipiente';
    }

    private calculatePercentage(answers: AnswerModel[]): number {
        let value = 0;
        let counter = 0;

        answers.forEach(element => {
            if (element.value !== 0) {
                value += element.value;
                counter++;
            }
        });

        value = value / counter;

        return value;
    }

    private getPart(answers: AnswerModel[], part: number): AnswerModel[] {
        let result: AnswerModel[] = [];

        result = answers.filter((item) => {
            item.part === part;
        });

        return result;
    }

    private getSection(answers: AnswerModel[], section: number): AnswerModel[] {
        let result: AnswerModel[] = [];

        result = answers.filter((item) => {
            item.section === section;
        });

        return result;
    }
}