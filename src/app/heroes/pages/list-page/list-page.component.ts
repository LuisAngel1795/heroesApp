import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
  public heroes: Hero[] = [];
  constructor(private service: HeroeService){}


  ngOnInit(): void {
    this.service.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }



}
