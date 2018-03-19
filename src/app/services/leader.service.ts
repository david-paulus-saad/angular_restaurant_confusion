import { Injectable } from '@angular/core';
import {leader} from '../shared/leader';
import {LEADERS}from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import {Restangular ,RestangularModule} from 'ngx-restangular';
import 'rxjs/add/observable/of';
@Injectable()
export class LeaderService {

  constructor(private restangular:Restangular) { }
  getLeaders(): Observable<leader[]> {
    return this.restangular.all('leaders').getList();
  }
  getLeader(id: number): Observable<leader> {
    return this.restangular.one('leaders',id).get();
  }
  getFeaturedLeader(): Observable<leader> {
    return this.restangular.all('leaders').getList({featured:true}).map(leaders => leaders[0]);
  }

}
