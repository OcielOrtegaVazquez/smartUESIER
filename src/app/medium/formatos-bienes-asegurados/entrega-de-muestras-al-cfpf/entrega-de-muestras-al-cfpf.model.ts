export class EntregaDeMuestras {
    ID: number;
    CI: string;
    ID_CI: number;
    FECHA_CI: Date;
    NUMERO_REGISTRO_EN_JN: string;
    ID_CAT_FISCALIA: number;
    ID_CAT_FISCALIA_FEDERAL: number;
    ID_CAT_TIPO_OBJETO: number;
    ID_CAT_EMPLEADO_ENTREGA: number;
    ID_CAT_ROL_ENTREGA: number;
    ID_CAT_EMPLEADO_RECIBE: number;
    ID_CAT_ROL_RECIBE: number;
    FECHA_ENTREGA_MUESTRA: number;
    ID_CAT_TIPO_DE_BIEN: number;
    CARACTERISTICAS: string;
    FOLIO_ENTREGA_RECEPCION: string;
    OFICIO_ENTREGA_RECEPCION: string;
    FECHA_ENTREGA_RECEPCION: Date;
    OBSERVACIONES: string;
    FECHA_REGISTRO_ENTREGA_MUESTRA: Date;

    constructor(entregaDeMuestras: EntregaDeMuestras){
        this.ID = entregaDeMuestras.ID;
        this.CI = entregaDeMuestras.CI;
        this.ID_CI = entregaDeMuestras.ID_CI;
        this.FECHA_CI = entregaDeMuestras.FECHA_CI;
        this.NUMERO_REGISTRO_EN_JN = entregaDeMuestras.NUMERO_REGISTRO_EN_JN;
        this.ID_CAT_FISCALIA = entregaDeMuestras.ID_CAT_FISCALIA;
        this.ID_CAT_FISCALIA_FEDERAL = entregaDeMuestras.ID_CAT_FISCALIA_FEDERAL;
        this.ID_CAT_TIPO_OBJETO = entregaDeMuestras.ID_CAT_TIPO_OBJETO;
        this.ID_CAT_EMPLEADO_ENTREGA = entregaDeMuestras.ID_CAT_EMPLEADO_ENTREGA;
        this.ID_CAT_ROL_ENTREGA = entregaDeMuestras.ID_CAT_ROL_ENTREGA;
        this.ID_CAT_EMPLEADO_RECIBE = entregaDeMuestras.ID_CAT_EMPLEADO_RECIBE;
        this.ID_CAT_ROL_RECIBE = entregaDeMuestras.ID_CAT_ROL_RECIBE;
        this.FECHA_ENTREGA_MUESTRA = entregaDeMuestras.FECHA_ENTREGA_MUESTRA;
        this.ID_CAT_TIPO_DE_BIEN = entregaDeMuestras.ID_CAT_TIPO_DE_BIEN;
        this.CARACTERISTICAS = entregaDeMuestras.CARACTERISTICAS;
        this.FOLIO_ENTREGA_RECEPCION = entregaDeMuestras.FOLIO_ENTREGA_RECEPCION;
        this.OFICIO_ENTREGA_RECEPCION = entregaDeMuestras.OFICIO_ENTREGA_RECEPCION;
        this.FECHA_ENTREGA_RECEPCION = entregaDeMuestras.FECHA_ENTREGA_RECEPCION;
        this.OBSERVACIONES = entregaDeMuestras.OBSERVACIONES;
        this.FECHA_REGISTRO_ENTREGA_MUESTRA = entregaDeMuestras.FECHA_REGISTRO_ENTREGA_MUESTRA;
        
    
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

export class CatTipoObjeto {
    ID: number;
    TIPO_OBJETO: string;

    constructor (catTipoObjeto: CatTipoObjeto){
        this.ID = catTipoObjeto.ID;
        this.TIPO_OBJETO = catTipoObjeto.TIPO_OBJETO; 
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