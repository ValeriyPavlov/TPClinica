import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Log } from '../entities/Log';
import { firstValueFrom } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private readonly provider: FirebaseStoreProvider){}

  public async getAllLogs() {
    const history = (await firstValueFrom(this.provider.getCollection('logs'))) as Log[];
    return history;
  }

  public saveLogWithIdInStore(id: string, log: Log) {
    return this.provider.setDocWithId('logs', id, JSON.parse(JSON.stringify(log)));
  }

  public saveLogInStore(log: Log) {
    const document = this.provider.createDoc('logs');
    log.id = document.id;
    return this.provider.saveDoc(document, JSON.parse(JSON.stringify(log)));
  }

  public createPdf(element: HTMLElement, title: string) {
    if (element) {
      html2canvas(element).then((canvas: HTMLCanvasElement) => {
        const pdfFile = new jsPDF('l', 'px');
        const imgData = canvas.toDataURL('image/jpeg');
        const image = new Image();
        const image2 = new Image();
        const date = new Date().toLocaleString();
        image2.src = '../../assets/img/icono.png';
        image.src = imgData;
        pdfFile.text("Clinica Online, " + title, 180, 70);
        pdfFile.text('Fecha Emisión: ' + date, 400, 20);
        pdfFile.addImage(image2, 'PNG', 10, 10, 75, 75);
        pdfFile.addImage(image, 'PNG', 150, 120, 300, 300);
        pdfFile.save(`${title}.pdf`);
      });
    }
  }
}
