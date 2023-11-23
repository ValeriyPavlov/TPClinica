import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';



@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SharedPipesModule
  ],
  exports: [
    HistoryComponent
  ]
})
export class HistoryModule { }
