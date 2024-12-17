export class SolicitudDeTrasladoDelBien {
    ID: number;
    CI: string;
    ID_CI: string;
    FECHA_CI: Date;
    NUMERO_REGISTRO_EN_JN: string;
    ID_CAT_FISCALIA: number;
    ID_CAT_FISCALIA_FEDERAL: number;
    ID_CAT_EMPLEADO: number;
    ID_CAT_ROL: number;
    FOLIO_SOLICITUD_TRASLADO: string;
    OFICIO_SOLICITUD_TRASLADO: string;
    FECHA_SOLICITUD_TRASLADO: Date;
    FECHA_PROGRAMADA_TRASLADO: Date;
    ID_CAT_TIPO_DE_BIEN: number;
    CARACTERISTICAS: string;
    ID_CAT_UBICACION_RESGUARDO: number;
    ID_CAT_LUGAR_ENTREGA: number;
    OBSERVACIONES: string;
    FECHA_REGISTRO_SOLICITUD_TRASLADO: Date;

    constructor(solicitudDeTrasladoDelBien: SolicitudDeTrasladoDelBien){
        this.ID = solicitudDeTrasladoDelBien.ID;
        this.CI = solicitudDeTrasladoDelBien.CI;
        this.ID_CI = solicitudDeTrasladoDelBien.ID_CI;
        this.FECHA_CI = solicitudDeTrasladoDelBien.FECHA_CI;
        this.NUMERO_REGISTRO_EN_JN = solicitudDeTrasladoDelBien.NUMERO_REGISTRO_EN_JN;
        this.ID_CAT_FISCALIA = solicitudDeTrasladoDelBien.ID_CAT_FISCALIA;
        this.ID_CAT_FISCALIA_FEDERAL = solicitudDeTrasladoDelBien.ID_CAT_FISCALIA_FEDERAL;
        this.ID_CAT_EMPLEADO = solicitudDeTrasladoDelBien.ID_CAT_EMPLEADO;
        this.ID_CAT_ROL = solicitudDeTrasladoDelBien.ID_CAT_ROL;
        this.FOLIO_SOLICITUD_TRASLADO = solicitudDeTrasladoDelBien.FOLIO_SOLICITUD_TRASLADO;
        this.OFICIO_SOLICITUD_TRASLADO = solicitudDeTrasladoDelBien.OFICIO_SOLICITUD_TRASLADO;
        this.FECHA_SOLICITUD_TRASLADO = solicitudDeTrasladoDelBien.FECHA_REGISTRO_SOLICITUD_TRASLADO;
        this.FECHA_PROGRAMADA_TRASLADO = solicitudDeTrasladoDelBien.FECHA_PROGRAMADA_TRASLADO;
        this.ID_CAT_TIPO_DE_BIEN = solicitudDeTrasladoDelBien.ID_CAT_TIPO_DE_BIEN;
        this.CARACTERISTICAS = solicitudDeTrasladoDelBien.CARACTERISTICAS;
        this.ID_CAT_UBICACION_RESGUARDO = solicitudDeTrasladoDelBien.ID_CAT_UBICACION_RESGUARDO;
        this.ID_CAT_LUGAR_ENTREGA = solicitudDeTrasladoDelBien.ID_CAT_LUGAR_ENTREGA;
        this.OBSERVACIONES = solicitudDeTrasladoDelBien.OBSERVACIONES
        this.FECHA_REGISTRO_SOLICITUD_TRASLADO = solicitudDeTrasladoDelBien.FECHA_REGISTRO_SOLICITUD_TRASLADO;
    }
}

export class CatFiscalia {
    ID: number;
    CVE: string;
    NOMBRE: string;
    ORDEN: string;
    ACT: number;
    FISCALIA: string;

    constructor(catFiscalia: CatFiscalia){
        this.ID = catFiscalia.ID;
        this.CVE = catFiscalia.CVE;
        this.NOMBRE = catFiscalia.NOMBRE;
        this.ORDEN = catFiscalia.ORDEN;
        this.ACT = catFiscalia.ACT;
        this.FISCALIA = catFiscalia.FISCALIA;
    }
}

export class CatFiscaliaFederal {
    ID: number;
    FISCALIA_FEDERAL: string;
    CLAVE: string;
    FISCALIA_ESPECIALIZADA: string;

    constructor(catFiscaliaFederal: CatFiscaliaFederal){
        this.ID = catFiscaliaFederal.ID;
        this.FISCALIA_FEDERAL = catFiscaliaFederal.FISCALIA_FEDERAL;
        this.CLAVE = catFiscaliaFederal.FISCALIA_FEDERAL;
        this.FISCALIA_ESPECIALIZADA = catFiscaliaFederal.FISCALIA_ESPECIALIZADA;
    }
}

export class CatAMPF {
    ID: number;
    NOMBRE2: string;

    constructor(catAMPF: CatAMPF){
        this.ID= catAMPF.ID;
        this.NOMBRE2= catAMPF.NOMBRE2;
    }
}

export class CatCargo {
    ID: number;
    NOMBRE: string;

    constructor(catCargo: CatCargo){
        this.ID= catCargo.ID;
        this.NOMBRE= catCargo.NOMBRE;
    }
}

export class CatTipoBien{
    ID: number;
    TIPOBIEN: string;

    constructor(catTipoBien: CatTipoBien){
        this.ID= catTipoBien.ID;
        this.TIPOBIEN= catTipoBien.TIPOBIEN;
    }
}

export class CatLugarEntrega {
    ID: number;
    LUGAR_ENTREGA: string;

    constructor(catLugarEntrega: CatLugarEntrega){
        this.ID = catLugarEntrega.ID;
        this.LUGAR_ENTREGA = catLugarEntrega.LUGAR_ENTREGA;
    }
}