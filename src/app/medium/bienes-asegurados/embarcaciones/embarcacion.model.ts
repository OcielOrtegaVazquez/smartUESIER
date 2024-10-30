export class Embarcacion {
    ID: number;
    SEDE_SUBSEDE: string;
    CI: string;
    FECHA_CI: Date;
    DELITO: string;
    FECHA_ASEGURAMIENTO: Date;
    MOTIVO_ASEGURAMIENTO: string;
    TIPO_EMBARCACION: string;
    MARCA: string;
    MODELO: string;
    DIMENSIONES: string;
    COLOR: string;
    NUM_SERIE: string;
    MATRICULA: string;
    MOTOR: string;
    NOMBRE_EMBARCACION: string;
    CARACT_ESPECIALES: string;
    ESTADO_CONSERVACION: string;
    REPORTE_ROBO: string;
    VALOR_DICTAMEN: number;
    TIPO_MONEDA: string;
    UBICACION_ACTUAL: string;
    OBSERVACIONES: string;

    constructor (embarcacion: Embarcacion){
        this.ID= embarcacion.ID
        this.SEDE_SUBSEDE= embarcacion.SEDE_SUBSEDE
        this.CI= embarcacion.CI
        this.FECHA_CI= embarcacion.FECHA_CI
        this.DELITO= embarcacion.DELITO
        this.FECHA_ASEGURAMIENTO= embarcacion.FECHA_ASEGURAMIENTO
        this.MOTIVO_ASEGURAMIENTO= embarcacion.MOTIVO_ASEGURAMIENTO
        this.TIPO_EMBARCACION= embarcacion.TIPO_EMBARCACION
        this.MARCA= embarcacion.MARCA
        this.MODELO= embarcacion.MODELO
        this.DIMENSIONES= embarcacion.DIMENSIONES
        this.COLOR= embarcacion.COLOR
        this.NUM_SERIE= embarcacion.NUM_SERIE
        this.MATRICULA= embarcacion.MATRICULA
        this.MOTOR= embarcacion.MOTOR
        this.NOMBRE_EMBARCACION= embarcacion.NOMBRE_EMBARCACION
        this.CARACT_ESPECIALES= embarcacion.CARACT_ESPECIALES
        this.ESTADO_CONSERVACION= embarcacion.ESTADO_CONSERVACION
        this.REPORTE_ROBO= embarcacion.REPORTE_ROBO
        this.VALOR_DICTAMEN= embarcacion.VALOR_DICTAMEN
        this.TIPO_MONEDA= embarcacion.TIPO_MONEDA
        this.UBICACION_ACTUAL= embarcacion.UBICACION_ACTUAL
        this.OBSERVACIONES= embarcacion.OBSERVACIONES

    }

}