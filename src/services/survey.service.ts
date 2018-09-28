import { SurveyRepository } from '../repositories/survey.repository';
import { SurveyDropDownModel } from '../shared/models/survey.dropdown.model';
import { ChartsConfigModel } from '../shared/models/charts.config.model';
import * as answersValue from '../shared/models/answer.value.model';
import { RadarChartModel } from '../shared/models/radar.chart.model';
import { MatureProfileChartModel } from '../shared/models/mature.profile.chart.model';
import { OrganizationalMatureChartModel } from '../shared/models/organizational.mature.chart.model';
import { AnswerModel } from '../shared/models/answer.model';
import { ChartFieldModel } from '../shared/models/chart.field.model';
import { SectionModel } from '../shared/models/section.model';

// section 1
const NAMES1 = 'Gestionar la organizacion';
const ENVIRONMENTANALYSIS = 'Analysis de entorno';
const ORGANIZATIONALDESICIONS = 'Toma de decisiones a nivel organizacional';
const MONITORINGANDCONTROL = 'Monitoreo y control a nivel organizacional';
// section 2
const NAMES2 = 'Planear la prestacion y mejorar el servicio';
const PROCESSPLANNING = 'Planeacion de los procesos';
const FORMALIZATIONOFPROCESSES = 'Formalizacion de procesos';
const MONITORINGANDOPERATIONALCONTROL = 'Seguimiento y control operativo';
// section 3
const NAMES3 = 'Abastecer';
const SHOPPINGRESULTS = 'Resultados de compras';
const SELECTIONOFNEWSUPPLIERS = 'Seleccion de nuevos proveedores';
const ACTUALSUPPLIERSEVALUATION = 'Evaluacion del desempeño de provedores actuales';
// section 4
const NAMES4 = 'Producir y entregar el servicio';
const PRODUCTIVEPROCESSRESULT = 'Resultados del proceso productivo';
const DELIVERYOFVALUEPROCESS = 'Procesos para la entrega de valor';
// section 5
const NAMES5 = 'Gestionar mercadotecnia y servicio a cliente';
const DEFINITIONOFVALUE = 'Definicoin de valor';
const CUSTOMERSATISFACTION = 'Medicion de satisfaccion del cliente';
// section 6
const NAMES6 = 'Gestionar inventarios';
const INVENTORYCONTROL = 'Control de inventarios';
const STORAGE = 'Almacenamiento';
// section 7
const NAMES7 = 'Gestionar recursos';
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

        model.keyProcessChart = new RadarChartModel();
        // section 2
        model.keyProcessChart.parts.push(processPlanning);
        model.keyProcessChart.parts.push(formalizationOfProcesses);
        model.keyProcessChart.parts.push(monitoringAndOperationalControl);
        // section 3
        model.keyProcessChart.parts.push(shoppingResults);
        model.keyProcessChart.parts.push(selectionOfNewSuppliers);
        model.keyProcessChart.parts.push(actualSuppliersEvaluation);
        // section 4
        model.keyProcessChart.parts.push(productiveProcessResult);
        model.keyProcessChart.parts.push(deliveryOfValueProcess);
        // section 5
        model.keyProcessChart.parts.push(definitionOfValue);
        model.keyProcessChart.parts.push(customerSatisfaction);
        // section 6
        model.keyProcessChart.parts.push(inventoryControl);
        model.keyProcessChart.parts.push(storage);

        model.matureProfileChart = new MatureProfileChartModel();
        model.matureProfileChart.section1 = new SectionModel();
        model.matureProfileChart.section1.name = NAMES1;
        model.matureProfileChart.section1.parts.push(environmentAnalysis);
        model.matureProfileChart.section1.parts.push(organizationalDesicions);
        model.matureProfileChart.section1.parts.push(monitoringAndControl);

        model.matureProfileChart.section2 = new SectionModel();
        model.matureProfileChart.section2.name = NAMES2;
        model.matureProfileChart.section2.parts.push(processPlanning);
        model.matureProfileChart.section2.parts.push(formalizationOfProcesses);
        model.matureProfileChart.section2.parts.push(monitoringAndOperationalControl);

        model.matureProfileChart.section3 = new SectionModel();
        model.matureProfileChart.section3.name = NAMES3;
        model.matureProfileChart.section3.parts.push(shoppingResults);
        model.matureProfileChart.section3.parts.push(selectionOfNewSuppliers);
        model.matureProfileChart.section3.parts.push(actualSuppliersEvaluation);

        model.matureProfileChart.section4 = new SectionModel();
        model.matureProfileChart.section4.name = NAMES4;
        model.matureProfileChart.section4.parts.push(productiveProcessResult);
        model.matureProfileChart.section4.parts.push(deliveryOfValueProcess);

        model.matureProfileChart.section5 = new SectionModel();
        model.matureProfileChart.section5.name = NAMES5;
        model.matureProfileChart.section5.parts.push(definitionOfValue);
        model.matureProfileChart.section5.parts.push(customerSatisfaction);

        model.matureProfileChart.section6 = new SectionModel();
        model.matureProfileChart.section6.name = NAMES6;
        model.matureProfileChart.section6.parts.push(inventoryControl);
        model.matureProfileChart.section6.parts.push(storage);

        model.matureProfileChart.section7 = new SectionModel();
        model.matureProfileChart.section7.name = NAMES7;
        model.matureProfileChart.section7.parts.push(personal);
        model.matureProfileChart.section7.parts.push(equipmentAndInfrastructure);
        model.matureProfileChart.section7.parts.push(technology);
        model.matureProfileChart.section7.parts.push(financialManageMent);


        // work with section 1 answers
        model.strategicChart = new RadarChartModel();
        model.strategicChart.parts.push(environmentAnalysis);
        model.strategicChart.parts.push(organizationalDesicions);
        model.strategicChart.parts.push(monitoringAndControl);

        // work with section 7 answers
        model.supportProcessChart = new RadarChartModel();
        model.supportProcessChart.parts.push(personal);
        model.supportProcessChart.parts.push(equipmentAndInfrastructure);
        model.supportProcessChart.parts.push(technology);
        model.supportProcessChart.parts.push(financialManageMent);

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
            return item.part === part;
        });

        return result;
    }

    private getSection(answers: AnswerModel[], section: number): AnswerModel[] {
        let result: AnswerModel[] = [];
        result = answers.filter((item) => {
            return item.section === section;
        });

        return result;
    }
}