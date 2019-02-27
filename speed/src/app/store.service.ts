import { Injectable } from '@angular/core';
import launchesJson from '../assets/data/launches.json';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private launch;
  private launch$ = new Subject<any[]>();

  constructor() {}


  public dispatch (action: Actions) {
    switch (action.type) {
      case ActionTypes.searchAgencies:
        this.onSearchAgencies(action.payload);
        break;
      case ActionTypes.searchStatus:
        this.onSearchStatus(action.payload);
        break;
      case ActionTypes.searchMissions:
        this.onSearchMissions(action.payload);
        break;
    }
    //this.launch$.next(this.getSnapshot());
  }

  // public onSearchAgencies(textToSearch: string){
  private onSearchAgencies(textToSearch: string){
    this.launch = [];

    if (textToSearch.length) {
      for (let i = 0; i < launchesJson.count; i++) {
        if (launchesJson.launches[i].lsp){
          if (launchesJson.launches[i].lsp.name.toLowerCase().search(textToSearch.toLowerCase()) !== -1) {
            this.launch.push(launchesJson.launches[i]);
          }
        }
      }
    }
    this.launch$.next(this.getSnapshot());
  }

  // public onSearchStatus(id: string){
  private onSearchStatus(id: string){
    this.launch = [];
    let idNum;

    try {
      idNum = parseInt(id, 10);

      for (let i = 0; i < launchesJson.count; i++) {
        if (launchesJson.launches[i].status === idNum) {
          this.launch.push(launchesJson.launches[i]);
        }
      }

    } catch {

    } finally {
       this.launch$.next(this.getSnapshot());
    }

  }

  // public onSearchMissions(textToSearch: string){
  private onSearchMissions(textToSearch: string){
    this.launch = [];

    if (textToSearch.length) {
      for (let i = 0; i < launchesJson.count; i++) {
        if (launchesJson.launches[i].missions){
          for (let x = 0; x < launchesJson.launches[i].missions.length; x++) {
            if ((launchesJson.launches[i].missions[x].name.toLowerCase().search(textToSearch.toLowerCase()) !== -1)
             || (launchesJson.launches[i].missions[x].description.toLowerCase().search(textToSearch.toLowerCase()) !== -1)){
              this.launch.push(launchesJson.launches[i]);
            }
          }
        }
      }
    }

    this.launch$.next(this.getSnapshot());

  }

  public getSnapshot() {
    return this.launch;
  }

  public select$ = () => this.launch$.asObservable();

}


export interface Action {
  readonly type: ActionTypes;
  readonly payload?: any;
}

export class SearchAgencies implements Action {
  public type = ActionTypes.searchAgencies;
  constructor (public readonly payload?: any) {}
}

export class SearchStatus implements Action {
  public type = ActionTypes.searchStatus;
  constructor (public readonly payload?: any) {}
}

export class SearchMissions implements Action {
  public type = ActionTypes.searchMissions;
  constructor (public readonly payload?: any) {}
}

export enum ActionTypes {
  searchAgencies, searchStatus, searchMissions
}

export type Actions = SearchAgencies | SearchStatus | SearchMissions;

