import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    LoaderModule,
    NgxSpinnerModule,
  ]
})
export class WelcomeModule { }
