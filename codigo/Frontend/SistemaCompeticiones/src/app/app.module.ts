import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EquiposComponent } from './pages/equipos/equipos.component';
import { HomeComponent } from './pages/home/home.component';
import { JugadoresComponent } from './pages/jugadores/jugadores.component';
import { TorneosComponent } from './pages/torneos/torneos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { TorneosDetalleComponent } from './pages/torneos-detalle/torneos-detalle.component';
import { BalonOroComponent } from './pages/balon-oro/balon-oro.component';
import { AuthGuard } from './services/auth-guard.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EquiposComponent,
    HomeComponent,
    JugadoresComponent,
    TorneosComponent,
    LoginComponent,
    RegistroComponent,
    TorneosDetalleComponent,
    BalonOroComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthGuard, provideClientHydration(withEventReplay())],  // Agrega el AuthGuard aquí
  bootstrap: [AppComponent]
})
export class AppModule { }