export class Numerario {
    ID: number;
    SEDE_SUBSEDE: string;
    CI: string;
    FECHA_CI: Date;
    DELITO: string;
    FECHA_ASEGURAMIENTO: Date;
    MOTIVO_ASEGURAMIENTO: string;
    EFECTIVO_CTA_BANCARIA: string;
    TIPO_MONEDA: string;
    IMPORTE: number;
    ESTADO_CONSERVACION: string;
    AUT_APO: string;
    CUENTA_BANCARIA_ASEG: string;
    TITULAR_CTA_ASEG: string;
    INSTITUCION_CTA_ASEG: string;
    OBSERVACIONES: string;

    constructor(numerario: Numerario) {
        this.ID = numerario.ID
        this.SEDE_SUBSEDE = numerario.SEDE_SUBSEDE
        this.CI = numerario.CI
        this.FECHA_CI = numerario.FECHA_CI
        this.DELITO = numerario.DELITO
        this.FECHA_ASEGURAMIENTO = numerario.FECHA_ASEGURAMIENTO
        this.MOTIVO_ASEGURAMIENTO = numerario.MOTIVO_ASEGURAMIENTO
        this.EFECTIVO_CTA_BANCARIA = numerario.EFECTIVO_CTA_BANCARIA
        this.TIPO_MONEDA = numerario.TIPO_MONEDA
        this.IMPORTE = numerario.IMPORTE
        this.ESTADO_CONSERVACION = numerario.ESTADO_CONSERVACION
        this.AUT_APO = numerario.AUT_APO
        this.CUENTA_BANCARIA_ASEG = numerario.CUENTA_BANCARIA_ASEG
        this.TITULAR_CTA_ASEG = numerario.TITULAR_CTA_ASEG
        this.INSTITUCION_CTA_ASEG = numerario.INSTITUCION_CTA_ASEG
        this.OBSERVACIONES = numerario.OBSERVACIONES

    }
}