import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { DashboardFormatosBienesAseguradosComponent } from "../dashboard-formatos-bienes-asegurados/dashboard-formatos-bienes-asegurados.component";
import { InicioDeCarpetaComponent } from './inicio-de-carpeta/inicio-de-carpeta.component';
import { AcuerdoAseguramientoBienesComponent } from "./acuerdo-aseguramiento-bienes/acuerdo-aseguramiento-bienes.component";
import { SolicitudPeritajeComponent } from "./solicitud-peritaje/solicitud-peritaje.component";
import { EntregaDeMuestrasAlCfpfComponent } from "./entrega-de-muestras-al-cfpf/entrega-de-muestras-al-cfpf.component";
import { ResultadoDeDictamenPericialComponent } from "./resultado-de-dictamen-pericial/resultado-de-dictamen-pericial.component";
import { TrasladoDelBienComponent } from "./traslado-del-bien/traslado-del-bien.component";
import { EntregaRecepcionDelBienNuevaUbicacionComponent } from "./entrega-recepcion-del-bien-nueva-ubicacion/entrega-recepcion-del-bien-nueva-ubicacion.component";
import { AlmacenamientoCustodiaDelBienComponent } from "./almacenamiento-custodia-del-bien/almacenamiento-custodia-del-bien.component";
import { CambioDeUbicacionDelBienParaResguardoComponent } from "./cambio-de-ubicacion-del-bien-para-resguardo/cambio-de-ubicacion-del-bien-para-resguardo.component";
import { DisposicionFinalPorConclusionComponent } from './disposicion-final-por-conclusion/disposicion-final-por-conclusion.component';
import { DevolucionDelBienComponent } from './devolucion-del-bien/devolucion-del-bien.component';
import { DestruccionDelBienComponent } from './destruccion-del-bien/destruccion-del-bien.component';
import { DisposicionFinalBienesNoAdministrablesComponent } from './disposicion-final-bienes-no-administrables/disposicion-final-bienes-no-administrables.component';
import { SolicitudDeOpinionAFemedComponent } from "./solicitud-de-opinion-a-femed/solicitud-de-opinion-a-femed.component";
import { DemandaDeExtincionDeDominioComponent } from './demanda-de-extincion-de-dominio/demanda-de-extincion-de-dominio.component';
import { CambioDeAmpfComponent } from "./cambio-de-ampf/cambio-de-ampf.component";
import { DeclinacionPorIncompetenciaComponent } from './declinacion-por-incompetencia/declinacion-por-incompetencia.component';
import { SolicitudDeTrasladoDelBienComponent } from './solicitud-de-traslado-del-bien/solicitud-de-traslado-del-bien.component';
import { BienesADisposicionComponent } from './bienes-a-disposicion/bienes-a-disposicion.component';

export const FORMATO_BIENES_ASEGURADOS_ROUTE: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardFormatosBienesAseguradosComponent
    },
    {
        path: 'inicio-de-carpeta',
        component: InicioDeCarpetaComponent
    },
    {   path: 'bienes-a-disposicion',
        component: BienesADisposicionComponent

    },
    {
        path: 'acuerdo-aseguramiento-de-bienes',
        component: AcuerdoAseguramientoBienesComponent
    },
    {
        path: 'solicitud-de-peritaje',
        component: SolicitudPeritajeComponent
    },
    {
        path: 'entrega-de-muestras-al-cfpf',
        component: EntregaDeMuestrasAlCfpfComponent
    },
    {
        path: 'resultado-de-dictamen-pericial',
        component: ResultadoDeDictamenPericialComponent
    },
    {
        path: 'solicitud-de-traslado-del-bien',
        component: SolicitudDeTrasladoDelBienComponent
    },
    {
        path: 'traslado-del-bien',
        component: TrasladoDelBienComponent
    },
    {
        path: 'entrega-recepcion-del-bien-nueva-ubicacion',
        component: EntregaRecepcionDelBienNuevaUbicacionComponent
    },
    {
        path: 'almacenamiento-custodia-del-bien',
        component: AlmacenamientoCustodiaDelBienComponent
    },
    {
        path: 'cambio-de-ubicacion-del-bien-para-resguardo',
        component: CambioDeUbicacionDelBienParaResguardoComponent
    },
    {
        path: 'disposicion-final-por-conclusion',
        component: DisposicionFinalPorConclusionComponent
    },
    {
        path: 'devolucion-del-bien',
        component: DevolucionDelBienComponent
    },
    {
        path: 'destruccion-del-bien',
        component: DestruccionDelBienComponent
    },
    {
        path: 'disposicion-final-bienes-no-administrables',
        component: DisposicionFinalBienesNoAdministrablesComponent
    },
    {
        path: 'solicitud-de-opinion-a-femed',
        component: SolicitudDeOpinionAFemedComponent
    },
    {
        path: 'demanda-de-extincion-de-dominio',
        component: DemandaDeExtincionDeDominioComponent
    },
    {
        path: 'cambio-de-ampf',
        component: CambioDeAmpfComponent
    },
    {
        path: 'declinacion-por-incompetencia',
        component: DeclinacionPorIncompetenciaComponent
    },
    {
        path: '**',
        component: Page404Component
    }
];