export class Inmueble {
    ID: number
    SEDE_SUBSEDE: string
    CI: string
    FECHA_CI: Date
    DELITO: string
    FECHA_ASEGURAMIENTO: Date
    MOTIVO_ASEGURAMIENTO: string
    TIPO: string
    CALLE: string
    NUM_EXT: string
    NUM_INT: string
    COLONIA: string
    CODIGO_POSTAL: number
    MUN_ALC: string
    ENTIDAD_FED: string
    SUPERFICIE_TERR: string
    SUPERFICIE_CONST: string
    EDO_CONSERVACION: string
    VALOR_DICTAMEN: string
    TIPO_MONEDA: string
    OBSERVACIONES: string

    constructor(inmueble: Inmueble) {
        this.ID = inmueble.ID
        this.SEDE_SUBSEDE = inmueble.SEDE_SUBSEDE
        this.CI = inmueble.CI
        this.FECHA_CI = inmueble.FECHA_CI
        this.DELITO = inmueble.DELITO
        this.FECHA_ASEGURAMIENTO = inmueble.FECHA_ASEGURAMIENTO
        this.MOTIVO_ASEGURAMIENTO = inmueble.MOTIVO_ASEGURAMIENTO
        this.TIPO = inmueble.TIPO
        this.CALLE = inmueble.CALLE
        this.NUM_EXT = inmueble.NUM_EXT
        this.NUM_INT = inmueble.NUM_INT
        this.COLONIA = inmueble.COLONIA
        this.CODIGO_POSTAL = inmueble.CODIGO_POSTAL
        this.MUN_ALC = inmueble.MUN_ALC
        this.ENTIDAD_FED = inmueble.ENTIDAD_FED
        this.SUPERFICIE_TERR = inmueble.SUPERFICIE_TERR
        this.SUPERFICIE_CONST = inmueble.SUPERFICIE_CONST
        this.EDO_CONSERVACION = inmueble.EDO_CONSERVACION
        this.VALOR_DICTAMEN = inmueble.VALOR_DICTAMEN
        this.TIPO_MONEDA = inmueble.TIPO_MONEDA
        this.OBSERVACIONES = inmueble.OBSERVACIONES

    }
}