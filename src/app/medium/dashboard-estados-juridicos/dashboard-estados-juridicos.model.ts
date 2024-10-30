export class EstadoJuridico  {
    FISCALIA: string;
    ULTIMO_MOVIMIENTO: string;
    TOTAL: number

    constructor (estadoJuridico: EstadoJuridico){
        this.FISCALIA = estadoJuridico.FISCALIA,
        this.ULTIMO_MOVIMIENTO = estadoJuridico.ULTIMO_MOVIMIENTO,
        this.TOTAL = estadoJuridico.TOTAL
    }
}