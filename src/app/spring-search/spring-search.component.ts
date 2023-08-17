import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Spring } from '../spring';
import { SpringService } from '../spring.service';

@Component({
  selector: 'app-spring-search',
  templateUrl: './spring-search.component.html',
  styleUrls: [ './spring-search.component.css' ]
})
export class SpringSearchComponent implements OnInit {
  springs$!: Observable<Spring[]>;
  private searchTerms = new Subject<string>();

  constructor(private springService: SpringService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.springs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.springService.searchSprings(term)),
    );
  }
}
