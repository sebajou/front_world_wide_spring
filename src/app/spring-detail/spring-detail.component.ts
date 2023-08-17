import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Spring } from '../spring';
import { SpringService } from '../spring.service';

@Component({
  selector: 'app-spring-detail',
  templateUrl: './spring-detail.component.html',
  styleUrls: [ './spring-detail.component.css' ]
})
export class SpringDetailComponent implements OnInit {
  spring: Spring | undefined;

  constructor(
    private route: ActivatedRoute,
    private springService: SpringService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSpring();
  }

  getSpring(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    // const _id = this.route.
    // this.springService.getSpring(_id? _id:'')
    this.springService.getSpring(_id)
      .subscribe(spring => this.spring = spring);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.spring) {
      this.springService.updateSpring(this.spring)
        .subscribe(() => this.goBack());
    }
  }
}
