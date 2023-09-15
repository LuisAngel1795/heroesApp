import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroeService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {
  constructor(private service: HeroeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }



  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),

  }
  );

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ]

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getHeroById(id)),
      ).subscribe(
        hero => {
          if (!hero) return this.router.navigateByUrl('/');

          this.heroForm.reset(hero);
          return;
        }
      )

  }


  onSubmit() {

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.service.updateHero(this.currentHero)
        .subscribe(
          hero => {
            //TODO: mostrar snackbar
            this.showSnackBar(`${hero.superhero} Updated!`);
          }
        );
      return;
    }

    this.service.addHero(this.currentHero)
      .subscribe(
        hero => {
          // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
          this.router.navigate(['/heros/edit', hero.id])
          this.showSnackBar(`${hero.superhero} created!`);
        });
  }

  onDeleteHero() {
    if(!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.service.deleteHeroById(this.currentHero.id)
      .subscribe(
        wasDeleted =>{
          if(wasDeleted)
          this.router.navigate(['/heroes'])
        }
      )


    });
  }



  showSnackBar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }

}

