import { Component, OnInit ,Inject} from '@angular/core';
import {leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
 leaders :leader[];
 errMsg=null;
  constructor(private leaderservice : LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
 this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders ,
   errmsg => this.errMsg =errmsg);
  }

}
