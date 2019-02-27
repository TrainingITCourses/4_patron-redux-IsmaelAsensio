import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoreService } from '../store.service';
import { SearchAgencies, SearchStatus, SearchMissions } from '../store.service';

@Component({
  selector: 'app-search-container',
  template: `
    <app-search-presenter
      (eventSearchAgencies)="onSearchAgencies($event)"
      (eventSearchStatus)="onSearchStatus($event)"
      (eventSearchMissions)="onSearchMissions($event)"
    >
    </app-search-presenter>
    <app-launches-display [launches]="launchesResult"> </app-launches-display>
  `
  ,
  styles: []
})

export class ContainerComponent implements OnInit {

  public launchesResult: any[];

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.select$().subscribe(value => (this.launchesResult = value));
  }

  onSearchAgencies(textToSearch: string) {
    //this.store.onSearchAgencies(textToSearch);
    this.store.dispatch(new SearchAgencies(textToSearch));
  }

  onSearchStatus(id: string) {
    //this.store.onSearchStatus(id);
    this.store.dispatch(new SearchStatus(id));
  }

  onSearchMissions(textToSearch: string) {
    //this.store.onSearchMissions(textToSearch);
    this.store.dispatch(new SearchMissions(textToSearch));
  }

}
