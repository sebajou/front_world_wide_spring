import { Component, OnInit } from '@angular/core';

import { Spring } from '../spring';
import { SpringService } from '../spring.service';

@Component({
  selector: 'app-springs',
  templateUrl: './springs.component.html',
  styleUrls: ['./springs.component.css']
})
export class SpringsComponent implements OnInit {
  springs: Spring[] = [];

  constructor(private springService: SpringService) { }

  ngOnInit(): void {
    this.getSprings();
  }

  getSprings(): void {
    this.springService.getSprings()
      .subscribe(springs => this.springs = springs);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.springService.addSpring({ name } as Spring)
      .subscribe(spring => {
        this.springs.push(spring);
      });
  }

  delete(spring: Spring): void {
    this.springs = this.springs.filter(h => h !== spring);
    this.springService.deleteSpring(spring._id).subscribe();
  }

}
