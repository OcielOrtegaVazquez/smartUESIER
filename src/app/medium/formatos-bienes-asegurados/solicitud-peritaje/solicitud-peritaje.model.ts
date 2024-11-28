export class SolicitudPeritaje {
    ID: number;
    CI: string;
    ID_CI: number;
    FECHA_CI: string;
    NUMERO_REGISTRO_EN_JN: string;
    ID_CAT_FISCALIA: number;
    ID_CAT_FISCALIA_FEDERAL: number;
    ID_CAT_EMPLEADO: number;
    ID_CAT_ROL: number;
    ID_CAT_TIPO_PERITAJE: number;
    FOLIO_SOLICITUD_PERITAJE: string;
    OFICIO_SOLICITUD_PERITAJE: string;
    FECHA_SOLICITUD_PERITAJE: Date;
    ID_CAT_TIPO_DE_BIEN: number;
    CARACTERISTICAS: string;
    OBSERVACIONES: string;
    FECHA_REGISTRO_SOLICITUD_PERITAJE: Date;

    constructor(solicitudPeritaje: SolicitudPeritaje) {
        this.ID = solicitudPeritaje.ID;
        this.CI = solicitudPeritaje.CI;
        this.ID_CI = solicitudPeritaje.ID_CI;
        this.FECHA_CI = solicitudPeritaje.FECHA_CI;
        this.NUMERO_REGISTRO_EN_JN= solicitudPeritaje.NUMERO_REGISTRO_EN_JN;
        this.ID_CAT_FISCALIA= solicitudPeritaje.ID_CAT_FISCALIA;
        this.ID_CAT_FISCALIA_FEDERAL= solicitudPeritaje.ID_CAT_FISCALIA_FEDERAL;
        this.ID_CAT_EMPLEADO= solicitudPeritaje.ID_CAT_EMPLEADO;
        this.ID_CAT_ROL= solicitudPeritaje.ID_CAT_ROL;
        this.ID_CAT_TIPO_PERITAJE= solicitudPeritaje.ID_CAT_TIPO_PERITAJE;
        this.FOLIO_SOLICITUD_PERITAJE= solicitudPeritaje.FOLIO_SOLICITUD_PERITAJE;
        this.OFICIO_SOLICITUD_PERITAJE= solicitudPeritaje.OFICIO_SOLICITUD_PERITAJE;
        this.FECHA_SOLICITUD_PERITAJE= solicitudPeritaje.FECHA_SOLICITUD_PERITAJE;
        this.ID_CAT_TIPO_DE_BIEN= solicitudPeritaje.ID_CAT_TIPO_DE_BIEN;
        this.CARACTERISTICAS= solicitudPeritaje.CARACTERISTICAS;
        this.OBSERVACIONES= solicitudPeritaje.OBSERVACIONES;
        this.FECHA_REGISTRO_SOLICITUD_PERITAJE= solicitudPeritaje.FECHA_REGISTRO_SOLICITUD_PERITAJE;
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
        this.ID= catFiscalia.ID;
        this.CVE= catFiscalia.CVE;
        this.NOMBRE= catFiscalia.NOMBRE;
        this.ORDEN= catFiscalia.ORDEN;
        this.ACT= catFiscalia.ACT;
        this.FISCALIA= catFiscalia.FISCALIA;
    }
}

export class CatFiscaliaFederal {
    ID: number;
    FISCALIA_FEDERAL: string;
    CLAVE: string;
    FISCALIA_ESPECIALIZADA: string;

    constructor(catFiscaliaFederal: CatFiscaliaFederal){
        this.ID= catFiscaliaFederal.ID;
        this.FISCALIA_FEDERAL= catFiscaliaFederal.FISCALIA_FEDERAL;
        this.CLAVE= catFiscaliaFederal.FISCALIA_FEDERAL;
        this.FISCALIA_ESPECIALIZADA= catFiscaliaFederal.FISCALIA_ESPECIALIZADA;
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

export class CatTipoPeritaje {
    ID: number;
    TIPO_PERITAJE: string;

    constructor(catTipoPeritaje: CatTipoPeritaje){
        this.ID= catTipoPeritaje.ID;
        this.TIPO_PERITAJE= catTipoPeritaje.TIPO_PERITAJE;
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