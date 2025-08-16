import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private url: string =  "http://localhost:8101/";
  private urlPortal: string = "http://localhost:4200/";

  constructor() { }

  getUrl(): string {
    return this.url;
  }

  getUrlPortal(): string {
    return this.urlPortal;
  }


}