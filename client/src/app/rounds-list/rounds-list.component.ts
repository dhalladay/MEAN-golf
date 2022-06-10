import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Round } from '../round';
import { RoundService } from '../round.service';

@Component({
  selector: 'app-rounds-list',
  template: `
  <h2 class="text-center m-5">Rounds</h2>
 
  <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Course</th>
              <th>Number of Holes</th>
              <th>Nine</th>
              <th>Hole 1</th>
              <th>Hole 2</th>
              <th>Hole 3</th>
              <th>Hole 4</th>
              <th>Hole 5</th>
              <th>Hole 6</th>
              <th>Hole 7</th>
              <th>Hole 8</th>
              <th>Hole 9</th>
              <th>Hole 10</th>
              <th>Hole 11</th>
              <th>Hole 12</th>
              <th>Hole 13</th>
              <th>Hole 14</th>
              <th>Hole 15</th>
              <th>Hole 16</th>
              <th>Hole 17</th>
              <th>Hole 18</th>
          </tr>
      </thead>

      <tbody>
          <tr *ngFor="let round of rounds$ | async">
              <td>{{round.name}}</td>
              <td>{{round.position}}</td>
              <td>{{round.level}}</td>
              <td>
                  <button class="btn btn-primary me-1" [routerLink]="['edit/', round._id]">Edit</button>
                  <button class="btn btn-danger" (click)="deleteRound(round._id || '')">Delete</button>
              </td>
          </tr>
      </tbody>
  </table>

  <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Round</button>
  `,
  styles: [
  ]
})
export class RoundsListComponent implements OnInit {
  rounds$: Observable<Round[]> = new Observable();

  constructor(private roundsService: RoundService) {}

  ngOnInit(): void {
    this.fetchRounds();
}

deleteRound(id: string): void {
  this.roundsService.deleteRound(id).subscribe({
    next: () => this.fetchRounds()
  });
}

private fetchRounds(): void {
  this.rounds$ = this.roundsService.getRounds();
}

}
