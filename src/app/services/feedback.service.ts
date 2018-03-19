import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import {Restangular, RestangularModule} from 'ngx-restangular';


@Injectable()
export class FeedbackService {

  constructor(private restangular :Restangular) { }


  submitFeedback(feedback :Feedback): Observable <Feedback[]> {
    return this.restangular.all('feedback').post(feedback);
  }

}
