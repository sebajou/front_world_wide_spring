import { Component, OnInit } from '@angular/core';
import { Spring } from '../spring';
import { SpringService } from '../spring.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  springs: Spring[] = [];

  constructor(private springService: SpringService) { }

  ngOnInit(): void {
    this.getSprings();
  }

  getSprings(): void {
    this.springService.getSprings()
      .subscribe(springs => this.springs = springs.slice(1, 5));
  }
}
