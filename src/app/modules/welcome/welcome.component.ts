import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  
  protected loading: boolean;

  constructor(public sService: NgxSpinnerService) {
    this.loading = true;
  }

  ngOnInit(): void {
    // this.sService.show();
    // setTimeout(() => {
    //   this.sService.hide();
    this.loading = false;
    // }, 2000);
  }
}
