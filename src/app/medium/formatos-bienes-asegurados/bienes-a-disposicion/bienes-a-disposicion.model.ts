export class BienesDisposicion {
  ID: number;
  ID_CI: number;
  CI: string;
  ID_CAT_TIPO_DE_BIEN	: number;
  CARACTERISTICAS: string;
  FOLIO_INVENTARIO_BIEN: string;
  FECHA_FOLIO_INVENTARIO_BIEN: Date;
  FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO: Date;
  UBICACION_DONDE_SE_ENCONTRO_EL_BIEN: string;

  constructor(bienesDisposicion: BienesDisposicion) {
    this.ID = bienesDisposicion.ID;
    this.ID_CI = bienesDisposicion.ID_CI;
    this.CI = bienesDisposicion.CI;
    this.ID_CAT_TIPO_DE_BIEN	 = bienesDisposicion.ID_CAT_TIPO_DE_BIEN	;
    this.CARACTERISTICAS = bienesDisposicion.CARACTERISTICAS;
    this.FOLIO_INVENTARIO_BIEN = bienesDisposicion.FOLIO_INVENTARIO_BIEN;
    this.FECHA_FOLIO_INVENTARIO_BIEN =
      bienesDisposicion.FECHA_FOLIO_INVENTARIO_BIEN;
    this.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO =
      bienesDisposicion.FECHA_DE_ENTREGA_A_AMPF_DEL_INVENTARIO;
    this.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN =
      bienesDisposicion.UBICACION_DONDE_SE_ENCONTRO_EL_BIEN;
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

