import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private url = 'http://localhost:5200';
  private rounds$: Subject<Round[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Round[]>(`${this.url}/rounds`)
      .subscribe(rounds => {
        this.rounds$.next(rounds);
      });
  }

  getRounds(): Subject<Round[]> {
    this.refreshEmployees();
    return this.rounds$;
  }

  getRound(id: string): Observable<Round> {
    return this.httpClient.get<Round>(`${this.url}/rounds/${id}`);
  }

  createRound(round: Round): Observable<string> {
    return this.httpClient.post(`${this.url}/rounds/`, round, { responseType: 'text' });
  }

  updateRound(id: string, round: Round): Observable<string> {
    return this.httpClient.put(`${this.url}/rounds/${id}`, round, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/rounds/${id}`, { responseType: 'text' });
  }
}
