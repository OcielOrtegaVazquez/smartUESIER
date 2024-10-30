export class Aeronave {
    ID: number;
    SEDE_SUBSEDE: string;
    CI: string;
    FECHA_CI: Date;
    DELITO: string;
    FECHA_ASEGURAMIENTO: Date;
    MOTIVO_ASEGURAMIENTO:string;
    MARCA: string;
    MODELO: string;
    ANIO: number;
    NUM_SERIE:string;
    MATRICULA: string;
    COLOR: string;
    CARACT_ESPECIALES: string;
    ESTADO_CONSERVACION: string;
    REPORTE_ROBO: string;
    VALOR_DICTAMEN: string;
    TIPO_MONEDA: string;
    UBICACION_ACTUAL: string;
    OBSERVACIONES: string;

    constructor (aeronave: Aeronave){
        this.ID = aeronave.ID
        this.SEDE_SUBSEDE = aeronave.SEDE_SUBSEDE;
        this.CI = aeronave.CI;
        this.FECHA_CI = aeronave.FECHA_CI;
        this.DELITO = aeronave.DELITO;
        this.FECHA_ASEGURAMIENTO = aeronave.FECHA_ASEGURAMIENTO;
        this.MOTIVO_ASEGURAMIENTO = aeronave.MOTIVO_ASEGURAMIENTO;
        this.MARCA = aeronave.MARCA;
        this.MODELO = aeronave.MODELO;
        this.ANIO = aeronave.ANIO;
        this.NUM_SERIE = aeronave.NUM_SERIE;
        this.MATRICULA = aeronave.MATRICULA;
        this.COLOR = aeronave.COLOR;
        this.CARACT_ESPECIALES = aeronave.CARACT_ESPECIALES;
        this.ESTADO_CONSERVACION = aeronave.ESTADO_CONSERVACION;
        this.REPORTE_ROBO = aeronave.REPORTE_ROBO;
        this.VALOR_DICTAMEN = aeronave.VALOR_DICTAMEN;
        this.TIPO_MONEDA = aeronave.TIPO_MONEDA;
        this.UBICACION_ACTUAL = aeronave.UBICACION_ACTUAL;
        this.OBSERVACIONES = aeronave.OBSERVACIONES;

    }

}