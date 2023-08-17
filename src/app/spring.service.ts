import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Spring } from './spring';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class SpringService {

  private springsUrl = 'http://localhost:3000/springs';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET springs from the server */
  getSprings(): Observable<Spring[]> {
    return this.http.get<Spring[]>(this.springsUrl)
      .pipe(
        tap(_ => this.log('fetched springs')),
        catchError(this.handleError<Spring[]>('getSprings', []))
      );
  }

  /** GET spring by _id. Return `undefined` when _id not found */
  getSpringNo404<Data>(_id: string): Observable<Spring> {
    const url = `${this.springsUrl}/?_id=${_id}`;
    return this.http.get<Spring[]>(url)
      .pipe(
        map(springs => springs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} spring _id=${_id}`);
        }),
        catchError(this.handleError<Spring>(`getSpring _id=${_id}`))
      );
  }

  /** GET spring by _id. Will 404 if _id not found */
  getSpring(_id: string): Observable<Spring> {
    const url = `${this.springsUrl}/${_id}`;
    return this.http.get<Spring>(url).pipe(
      tap(_ => this.log(`fetched spring _id=${_id}`)),
      catchError(this.handleError<Spring>(`getSpring _id=${_id}`))
    );
  }

  /* GET springs whose name contains search term */
  searchSprings(term: string): Observable<Spring[]> {
    if (!term.trim()) {
      // if not search term, return empty spring array.
      return of([]);
    }
    return this.http.get<Spring[]>(`${this.springsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found springs matching "${term}"`) :
        this.log(`no springs matching "${term}"`)),
      catchError(this.handleError<Spring[]>('searchSpring', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new spring to the server */
  addSpring(spring: Spring): Observable<Spring> {
    return this.http.post<Spring>(this.springsUrl, spring, this.httpOptions).pipe(
      tap((newSpring: Spring) => this.log(`added spring w/ _id=${newSpring._id}`)),
      catchError(this.handleError<Spring>('addSpring'))
    );
  }

  /** DELETE: delete the spring from the server */
  deleteSpring(_id: string): Observable<Spring> {
    const url = `${this.springsUrl}/${_id}`;

    return this.http.delete<Spring>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted spring _id=${_id}`)),
      catchError(this.handleError<Spring>('deleteSpring'))
    );
  }

  /** PUT: update the spring on the server */
  updateSpring(spring: Spring): Observable<any> {
    return this.http.put(this.springsUrl, spring, this.httpOptions).pipe(
      tap(_ => this.log(`updated spring _id=${spring._id}`)),
      catchError(this.handleError<any>('updateSpring'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SpringService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SpringService: ${message}`);
  }
}
