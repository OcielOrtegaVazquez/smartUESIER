export class ResultadoDictamenPericial {
    ID: number;
    CI: string;
    ID_CI: number;
    FECHA_CI: string;
    NUMERO_REGISTRO_EN_JN: string;
    ID_CAT_FISCALIA: number;
    ID_CAT_FISCALIA_FEDERAL: number;
    ID_CAT_EMPLEADO_REALIZA_PERITAJE: number;
    ID_CAT_ROL_REALIZA_PERITAJE: number;
    ID_CAT_EMPLEADO_FIRMA_DICTAMEN: number;
    ID_CAT_ROL_FIRMA_DICTAMEN: number;
    ID_CAT_TIPO_DE_BIEN: number;
    CARACTERISTICAS: string;
    FOLIO_DICTAMEN_PERICIAL: string;
    OFICIO_DICTAMEN_PERICIAL: string;
    FECHA_DICTAMEN_PERICIAL: string;
    FOLIO_ENTREGA_DICTAMEN_PERICIAL: string;
    OFICIO_ENTREGA_DICTAMEN_PERICIAL: string;
    FECHA_ENTREGA_DICTAMEN_PERICIAL: string;
    OBSERVACIONES: string;
    FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL: string;

    constructor(resultadoDictamenPericial: ResultadoDictamenPericial){
        this.ID = resultadoDictamenPericial.ID;
        this.CI = resultadoDictamenPericial.CI;
        this.ID_CI = resultadoDictamenPericial.ID_CI;
        this.FECHA_CI = resultadoDictamenPericial.FECHA_CI;
        this.NUMERO_REGISTRO_EN_JN = resultadoDictamenPericial.NUMERO_REGISTRO_EN_JN;
        this.ID_CAT_FISCALIA = resultadoDictamenPericial.ID_CAT_FISCALIA;
        this.ID_CAT_FISCALIA_FEDERAL = resultadoDictamenPericial.ID_CAT_FISCALIA_FEDERAL;
        this.ID_CAT_EMPLEADO_REALIZA_PERITAJE = resultadoDictamenPericial.ID_CAT_EMPLEADO_REALIZA_PERITAJE;
        this.ID_CAT_ROL_REALIZA_PERITAJE = resultadoDictamenPericial.ID_CAT_ROL_REALIZA_PERITAJE;
        this.ID_CAT_EMPLEADO_FIRMA_DICTAMEN = resultadoDictamenPericial.ID_CAT_EMPLEADO_FIRMA_DICTAMEN;
        this.ID_CAT_ROL_FIRMA_DICTAMEN = resultadoDictamenPericial.ID_CAT_ROL_FIRMA_DICTAMEN;
        this.ID_CAT_TIPO_DE_BIEN = resultadoDictamenPericial.ID_CAT_TIPO_DE_BIEN;
        this.CARACTERISTICAS = resultadoDictamenPericial.CARACTERISTICAS;
        this.FOLIO_DICTAMEN_PERICIAL = resultadoDictamenPericial.FOLIO_DICTAMEN_PERICIAL;
        this.OFICIO_DICTAMEN_PERICIAL = resultadoDictamenPericial.OFICIO_DICTAMEN_PERICIAL;
        this.FECHA_DICTAMEN_PERICIAL = resultadoDictamenPericial.FECHA_DICTAMEN_PERICIAL;
        this.FOLIO_ENTREGA_DICTAMEN_PERICIAL = resultadoDictamenPericial.FOLIO_ENTREGA_DICTAMEN_PERICIAL;
        this.OFICIO_ENTREGA_DICTAMEN_PERICIAL = resultadoDictamenPericial.OFICIO_ENTREGA_DICTAMEN_PERICIAL;
        this.FECHA_ENTREGA_DICTAMEN_PERICIAL = resultadoDictamenPericial.FECHA_ENTREGA_DICTAMEN_PERICIAL;
        this.OBSERVACIONES = resultadoDictamenPericial.OBSERVACIONES;
        this.FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL = resultadoDictamenPericial.FECHA_REGISTRO_RESULTADO_DICTAMEN_PERICIAL;

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

    export class CatTipoBien{
        ID: number;
        TIPOBIEN: string;
    
        constructor(catTipoBien: CatTipoBien){
            this.ID= catTipoBien.ID;
            this.TIPOBIEN= catTipoBien.TIPOBIEN;
        }

}