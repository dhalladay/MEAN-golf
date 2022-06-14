import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Round } from '../round';

@Component({
  selector: 'app-round-form',
  template: `
    <p>
      round-form works!
    </p>
  `,
  styles: [
  ]
})
export class RoundFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
