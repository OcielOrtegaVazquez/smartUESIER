export class HistorialEstadoJuridico {
    id_CI: number;
    CI: string;
    FECHA_REGISTRO: Date;
    id_FiscaliaAct: number;
    FISCALIA: string;
    SEDES_ACTUAL: string;
    id_EdoJur: number;
    ESTADO_JURIDICO: string;
    FECHA_EDOJURIDICO: Date;
    ETAPA_PROCESAL: string;
    id_Movimiento: number;
    ULTIMO_MOVIMIENTO: string;

    constructor(historialEstadoJuridico: HistorialEstadoJuridico) {
        this.id_CI = historialEstadoJuridico.id_CI;
        this.CI = historialEstadoJuridico.CI
        this.FECHA_REGISTRO = historialEstadoJuridico.FECHA_REGISTRO;
        this.id_FiscaliaAct = historialEstadoJuridico.id_FiscaliaAct;
        this.FISCALIA = historialEstadoJuridico.FISCALIA;
        this.SEDES_ACTUAL = historialEstadoJuridico.SEDES_ACTUAL;
        this.id_EdoJur = historialEstadoJuridico.id_EdoJur;
        this.ESTADO_JURIDICO = historialEstadoJuridico.ESTADO_JURIDICO;
        this.FECHA_EDOJURIDICO = historialEstadoJuridico.FECHA_EDOJURIDICO;
        this.ETAPA_PROCESAL = historialEstadoJuridico.ETAPA_PROCESAL;
        this.id_Movimiento = historialEstadoJuridico.id_Movimiento;
        this.ULTIMO_MOVIMIENTO = historialEstadoJuridico.ULTIMO_MOVIMIENTO;
    }

}