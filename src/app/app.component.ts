import { ParticipantsService } from './participants.service';
import { browser } from 'protractor';
import { VoteState } from './../store/vote.reducer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as voteActions from '../store/vote.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  votes$: Observable<number>;
  votes: number;
  // participants: any;

  constructor(private store: Store<any>) {}

  ngOnInit() {

    // THE SELECTORS DEFINED
    const voteCountQuery = (state) => state.vote.count;
    // const participantsQuery = (state) => state.vote.participants;

    // SUBSCRIBE TO THE STORE
    this.store
      .select(voteCountQuery)
      .subscribe(votes => this.votes = votes);

    // this.store.dispatch(new voteActions.GetParticipantsAction);

    // this.store
    //   .select(participantsQuery)
    //   .subscribe(participants => {
    //     this.participants = participants;
    //   });
  }

  increment() {
    this.store.dispatch(new voteActions.VoteForAction);
  }

  decrement() {
    this.store.dispatch(new voteActions.VoteAgainstAction);

  }

  reset() {
    this.store.dispatch(new voteActions.VoteResetAction(0));
  }

}
