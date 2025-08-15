import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;
  private loadingUsername: boolean = false;

  constructor() { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    if(!this.loadingUsername){
      return this.loading;
    }else{
      return false;
    }
  }

  setLoadingUsername(loading: boolean){
    this.loadingUsername = loading;
  }




}