export class InicioDeCarpeta {
  ID: number;
  CI: string;
  FECHA_CI: Date;
  ID_CAT_EMPLEADO?: number;
  ID_CAT_ROL?: number;
  ID_CAT_TIPO_DELITO: number;
  ID_CAT_CAUSA_APERTURA_CI: number;
  ID_CAT_FISCALIA: number;
  ID_CAT_FISCALIA_FEDERAL: number;
  ID_CAT_FISCALIA_ESPECIAL: number;
  ID_CAT_UNIDAD: number;
  ID_CAT_TIPO_DE_BIEN: number;
  CARACTERISTICAS: string;
  FOLIO_INVENTARIO_BIEN: number;
  FECHA_FOLIO_INVENTARIO: Date;
  FECHA_DE_ENTREGA_A_AMPF_DE_INV: Date;
  UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: string;
  OBSERVACIONES: string;
  FECHA_REGISTRO: Date;

  constructor(inicioDeCarpeta: InicioDeCarpeta) {
    this.ID = inicioDeCarpeta.ID;
    this.CI = inicioDeCarpeta.CI;
    this.FECHA_CI = inicioDeCarpeta.FECHA_CI;
    this.ID_CAT_EMPLEADO = inicioDeCarpeta.ID_CAT_EMPLEADO;
    this.ID_CAT_ROL = inicioDeCarpeta.ID_CAT_ROL;
    this.ID_CAT_TIPO_DELITO = inicioDeCarpeta.ID_CAT_TIPO_DELITO;
    this.ID_CAT_CAUSA_APERTURA_CI = inicioDeCarpeta.ID_CAT_CAUSA_APERTURA_CI;
    this.ID_CAT_FISCALIA = inicioDeCarpeta.ID_CAT_FISCALIA;
    this.ID_CAT_FISCALIA_FEDERAL = inicioDeCarpeta.ID_CAT_FISCALIA_FEDERAL;
    this.ID_CAT_FISCALIA_ESPECIAL = inicioDeCarpeta.ID_CAT_FISCALIA_ESPECIAL;
    this.ID_CAT_UNIDAD = inicioDeCarpeta.ID_CAT_UNIDAD;
    this.ID_CAT_TIPO_DE_BIEN = inicioDeCarpeta.ID_CAT_TIPO_DE_BIEN;
    this.CARACTERISTICAS = inicioDeCarpeta.CARACTERISTICAS;
    this.FOLIO_INVENTARIO_BIEN = inicioDeCarpeta.FOLIO_INVENTARIO_BIEN;
    this.FECHA_FOLIO_INVENTARIO =
      inicioDeCarpeta.FECHA_FOLIO_INVENTARIO;
    this.FECHA_DE_ENTREGA_A_AMPF_DE_INV =
      inicioDeCarpeta.FECHA_DE_ENTREGA_A_AMPF_DE_INV;
    this.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN =
      inicioDeCarpeta.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN;
    this.OBSERVACIONES = inicioDeCarpeta.OBSERVACIONES;
    this.FECHA_REGISTRO = inicioDeCarpeta.FECHA_REGISTRO;
  }
}

export class CatAMPF {
  ID: number;
  NOMBRE2: string;

  constructor(catAMPF: CatAMPF) {
    this.ID = catAMPF.ID;
    this.NOMBRE2 = catAMPF.NOMBRE2;
  }
}

export class CatCargo {
  ID: number;
  NOMBRE: string;

  constructor(catCargo: CatCargo) {
    this.ID = catCargo.ID;
    this.NOMBRE = catCargo.NOMBRE;
  }
}

export class CatTipoDelito {
  ID: number;
  NOMBRE: string;
  ID_LEY: number;
  ID_ARTICULO: number;

  constructor(catTipoDelito: CatTipoDelito) {
    this.ID = catTipoDelito.ID;
    this.NOMBRE = catTipoDelito.NOMBRE;
    this.ID_LEY = catTipoDelito.ID_LEY;
    this.ID_ARTICULO = catTipoDelito.ID_ARTICULO;
  }
}

export class CatCausaOrigen {
  ID: number;
  ORIGEN_APERTURA: string;

  constructor(catCausaOrigen: CatCausaOrigen) {
    this.ID = catCausaOrigen.ID;
    this.ORIGEN_APERTURA = catCausaOrigen.ORIGEN_APERTURA;
  }
}

export class CatFiscalia {
  ID: number;
  CVE: string;
  NOMBRE: string;
  ORDEN: string;
  ACT: number;
  FISCALIA: string;

  constructor(catFiscalia: CatFiscalia) {
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

  constructor(catFiscalia: CatFiscaliaFederal) {
    this.ID = catFiscalia.ID;
    this.FISCALIA_FEDERAL = catFiscalia.FISCALIA_FEDERAL;
    this.CLAVE = catFiscalia.CLAVE;
    this.FISCALIA_ESPECIALIZADA = catFiscalia.FISCALIA_ESPECIALIZADA;
  }
}

export class CatFiscaliaEspecial {
  ID: number;
  FISCALIA_ESPECIAL: string;
  ID_FISCALIA_ESPECIALIZADA: number;

  constructor(catFiscaliaEspecial: CatFiscaliaEspecial) {
    this.ID = catFiscaliaEspecial.ID;
    this.FISCALIA_ESPECIAL = catFiscaliaEspecial.FISCALIA_ESPECIAL;
    this.ID_FISCALIA_ESPECIALIZADA = catFiscaliaEspecial.ID_FISCALIA_ESPECIALIZADA;
  }
}

export class CatUnidad {
  ID: number;
  UNIDAD: string;
  ID_FISCALIA: string;

  constructor(catUnidad: CatUnidad ){
    this.ID = catUnidad.ID
    this.UNIDAD = catUnidad.UNIDAD
    this.ID_FISCALIA = catUnidad.ID_FISCALIA
  }
}

export class CatTipoBien {
  ID: number;
  TIPOBIEN: string

  constructor(catTipoBien: CatTipoBien){
    this.ID = catTipoBien.ID
    this.TIPOBIEN = catTipoBien.TIPOBIEN
  }
}
