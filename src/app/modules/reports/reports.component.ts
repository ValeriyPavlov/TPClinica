import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { Especialidad } from 'src/app/entities/Speciality';
import { Turno } from 'src/app/entities/Appointment';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/entities/Log';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  protected allSpecialitys: Especialidad[] = [];
  protected specialityLabels: string[] = [];
  protected specialityAppointments: number[] = [];
  protected daysBarChart: number[] = [];
  protected lineAppointmentList: Turno[] = [];
  protected showGraph2: boolean;
  protected logs: Log[] = [];
  protected uniqueDates: string[] = [];

  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';
  public scatterChartType: ChartType = 'scatter';
  public bubbleChartType: ChartType = 'bubble';

  public barChartData: ChartData<'bar'> | undefined;
  public lineChartData: ChartData<'line'> | undefined; 
  public lineChartData2: ChartData<'line'> | undefined; 
  public scatterChartData: ChartData<'scatter'> | undefined;
  public bubbleChartData: ChartData<'bubble'> | undefined;

  public barChartPlugins = [DatalabelsPlugin];
  public pieChartPlugins = [DatalabelsPlugin];
  public scatterChartPlugins = [DatalabelsPlugin];

  public scatterChartOptions: ChartConfiguration['options'];

  constructor(public appService: AppointmentService, public specService: SpecialityService , public logService: LogService){
    this.showGraph2 = false;
    this.appService.getAppointments();
    this.getSpecialitys();
    this.getLogs();
  }

  public async getSpecialitys(){
    this.allSpecialitys = await this.specService.getAllSpecialities();
    this.allSpecialitys.forEach(spec => {
      this.specialityLabels.push(spec.description);
      this.specialityAppointments.push(0);
    });
    this.appService.appointments.forEach(app => {
      let index = this.specialityLabels.indexOf(app.speciality!)
      if(index != -1){
        this.specialityAppointments[index] += 1;
      }
    });
    this.showGraph2 = true;
    this.getDaysForBarChart();
    this.lineChartData = this.getLineData();
    this.lineChartData2 = this.getLineData(2);
  }

  protected async getLogs(){
    this.logs = await this.logService.getAllLogs();
    this.logs = this.logs.sort((a, b) => {
      if(b.date !== a.date)
      {
        let aDate = new Date(parseInt(a.date!.substring(6)), parseInt(a.date!.substring(3, 5)), parseInt(a.date!.substring(0, 2)));
        let bDate = new Date(parseInt(b.date!.substring(6)), parseInt(b.date!.substring(3, 5)), parseInt(b.date!.substring(0, 2)));
        if(aDate > bDate){return 1;
        }else{return -1;}
      }else{
        if(parseFloat((a.time).split(":")[0]) != parseFloat((b.time).split(":")[0])){
          if(parseFloat((a.time).split(":")[0]) > parseFloat((b.time).split(":")[0])){return 1;}
          else{return -1;}
        }else{return 0;}}
    });

    this.bubbleChartData = this.getBubbleChartData();
    
  }


  //A
  public bubbleChartOptions: ChartConfiguration['options'] = {
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      x: {
        min: 1,
        max: 30,
        ticks: {},
        title: {
          display: true,
          text: 'Dia',
          font: {size: 12}
        }
      },
      y: {
        min: 0,
        max: 24,
        ticks: {},
        title: {
          display: true,
          text: 'Hora',
          font: {size: 12}
        }
      },
    },
  };

  private getBubbleChartData(){
    let labels: string[] = [];
    let datasets: { data: any[], label: string }[] = [];
    this.logs.forEach(log => {
      if(!labels.some((date) => date === log.date)){
        labels.push(log.date!);}
      if(!datasets.some((data) => data.label === `${log.user.lastName}, ${log.user.name}`)){
        datasets.push({data: [], label: `${log.user.lastName}, ${log.user.name}`});
      }
    });

    this.logs.forEach(log => {
      labels.forEach(label => {
        datasets.forEach(set => {
          if(set.label == `${log.user.lastName}, ${log.user.name}` && label == log.date){
            set.data.push({y: log.time.split(":")[0], x: log.date.split("/")[0], r: 10});
          }
        });
      });
    });
    const data = { labels: labels, datasets: datasets };
    return data;
  }


  //B
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          return value === 0 ? '' : ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.specialityLabels,
    datasets: [{ data: this.specialityAppointments }],
  };



  //C
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 0, max: 10},
    },
    plugins: {
      legend: { display: true},
      datalabels: { anchor: 'end', align: 'end'},
    },
  };

  
  private getDaysForBarChart(){
    const days = [0,0,0,0,0,0];
    this.appService.appointments.forEach(app => {
      switch(app.day.dayOfWeek){
        case "lunes":
          days[0] += 1;
          break;
        case "martes":
          days[1] += 1;
          break;
        case "miércoles":
          days[2] += 1;
          break;
        case "jueves":
          days[3] += 1;
          break;
        case "viernes":
          days[4] += 1;
          break;
        case "sábado":
          days[5] += 1;
          break;
      }
    });

    this.barChartData = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      datasets: [{ data: days, label: 'Cantidad de Turnos' }]
    };
  }

  //D y E
  
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {line: {tension: 0.5}},
    scales: { y: {min: 0, position: 'left'}},
    plugins: {legend: { display: true }}};

  
  private getLineData(chartType: number = 1){
    this.lineAppointmentList = this.appService.appointments.sort((a, b) => {
      if(b.day.date !== a.day.date)
      {
        let aDate = new Date(parseInt(a.day.date!.substring(6)), parseInt(a.day.date!.substring(3, 5)), parseInt(a.day.date!.substring(0, 2)));
        let bDate = new Date(parseInt(b.day.date!.substring(6)), parseInt(b.day.date!.substring(3, 5)), parseInt(b.day.date!.substring(0, 2)));
        if(aDate > bDate){return 1;
        }else{return -1;}
      }else{
        if(parseFloat(a.day.timeStart) != parseFloat(b.day.timeStart)){
          if(parseFloat(a.day.timeStart) > parseFloat(b.day.timeStart)){return 1;}
          else{return -1;}
        }else{return 0;}}
    });
    
    let labels: string[] = [];
    let datasets: { data: any[], label: string}[] = [];
    this.lineAppointmentList.forEach(app => {
      if(!labels.some((date) => date === app.day.date)){
        labels.push(app.day.date!);}
      if(!datasets.some((data) => data.label === `${app.specialist.lastName}, ${app.specialist.name}`)){
        datasets.push({data: [], label: `${app.specialist.lastName}, ${app.specialist.name}`});
      }
    });
    if(chartType == 1){
      labels.forEach(label => {
        datasets.forEach(set => {
          let appointment = this.lineAppointmentList.filter(app => app.day.date == label && `${app.specialist.lastName}, ${app.specialist.name}` == set.label);
          set.data.push(appointment.length);
        });
      });
    }
    else{
      labels.forEach(label => {
        datasets.forEach(set => {
          let appointment = this.lineAppointmentList.filter(app => app.day.date == label && `${app.specialist.lastName}, ${app.specialist.name}` == set.label && app.state == "Realizado");
          set.data.push(appointment.length);
        });
      });
    }
    const data = { labels: labels, datasets: datasets };
    return data;
  }

  protected async downloadChart(id: string, title: string) {
    if (id != "" && title != "") {
      const element = document.getElementById(id) as HTMLElement;
      this.logService.createPdf(element, title);
    }
  }

}
