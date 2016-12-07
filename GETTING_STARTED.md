Getting started with Angular 2
====================

TABLE OF CONTENTS
---------------------
* [Setting up Angular 2](#setting-up-angular-2)
* [Introduction](#introduction)
* [Adding more heroes](#adding-more-heroes)
* [Multiple components](#multiple-components)
* [Services](#services)

## SETTING UP ANGULAR 2
---------------------
* [NodeJS](https://nodejs.org/en/)
* npm install -g angular-cli
* ng new Angular2Workshop
* cd Angular2Workshop
* ng serve

## INTRODUCTION
---------------------
Add new Hero class to src/app/app.component.ts file:

    export class Hero {
        id: number;
        name: string;
    }

Change title and add hero property to app.component.ts

    title = 'Tour of Heroes';
    hero: Hero = {
        id: 1,
        name: 'Windstorm'
    };

Open app.component.html and display title in h1, name of hero in h2 and create label and input for changing hero's name. Note that [(ngModel)] is 2-way data binding. When we change input, change is shown immediately.

    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name">
    </div>

## ADDING MORE HEROES
---------------------

We will display more heroes, so we create a Hero array in app.component.ts below Hero class with 10 heroes.

    const HEROES: Hero[] = [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];

Assign HEROES array to heroes object, rename hero to selectedHero and unassign it. Also create onSelect method which takes a Hero parameter and assigns selectedHero.

    heroes = HEROES;
    selectedHero: Hero;
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

Go to .html file and add a ul with li and use *ngFor for iteration on heroes. 
We display hero.id and hero.name in the span. Also the selected hero with receive selected class and we create click handler for onSelect.

    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
        <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
    </ul>

Second part of .html is for display of selected hero (change hero -> selectedHero). We display it only if the selectedHero is assigned (*ngIf).

    <div *ngIf="selectedHero">
        <h2>{{selectedHero.name}} details!</h2>
        <div><label>id: </label>{{selectedHero.id}}</div>
        <div>
        <label>name: </label>
        <input [(ngModel)]="selectedHero.name" placeholder="name"/>
        </div>
    </div>

Styling can be added to app.component.css file.

    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }

## MULTIPLE COMPONENTS
---------------------

Let's first extract Hero class to separate file. Create hero.ts in the /models folder.

    export class Hero {
        id: number;
        name: string;
    }

We will also extract hero details to separate component. You can generate new component by running ng g component hero-detail from CLI.
Add hero input to HeroDetailComponent class. Also, grab the html for displaying separate hero and paste it in the hero-detail.component.html and rename selectedHero -> hero.

    @Input()
    hero: Hero;

Finally, go to app.component.html and add hero-detail directive and bind hero property to selectedHero.

    <app-hero-detail [hero]="selectedHero"></app-hero-detail>

## SERVICES
---------------------

Create new services folder and generate hero service with ng g service services/hero. We must provide this service in app.module.ts

    providers: [HeroService]

Next, let's extract multiple heroes data to models/mock-heroes.ts file.

    import { Hero } from './hero';

    export const HEROES: Hero[] = [
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];

Now go to hero.service.ts and add getHeroes method which returns a promise.

    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

Let's go to app.component.ts and consume this service.

    export class AppComponent implements OnInit{
        title = 'Tour of Heroes';
        heroes = HEROES;
        selectedHero: Hero;

        constructor(private heroService: HeroService) { }

        getHeroes(): void {
            this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        }

        ngOnInit(): void {
            this.getHeroes();
        }

        onSelect(hero: Hero): void {
            this.selectedHero = hero;
        }
    }

## ROUTING
---------------------

Rename app.component.* to heroes.component.* and move these files in /heroes folder. In heroes.component.ts change name HeroesComponent and fix imports (path should be one more folder back). Then navigate to app.module.ts and rename app -> heroes and fix paths.

Create new AppComponent with ng g component app in the /app folder. Move files from /app/app to /app and fix the app.module.ts path for app.component.ts.

Let's create separate module for routing in the app/routing.module.ts. Open app.module.ts and add routing module to imports array and copy content below to routing.module.ts.

    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { DashboardComponent } from './dashboard/dashboard.component';
    import { HeroesComponent } from './heroes/heroes.component';
    import { HeroDetailComponent } from './hero-detail/hero-detail.component';

    const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'detail/:id', component: HeroDetailComponent },
        { path: 'heroes', component: HeroesComponent }
    ];
    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
    export class RoutingModule { }

Move the title of app in the app.component.html and add two links, to dashboard and heroes views.

    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>

Create dashboard folder in /app and generate dashboard component with ng g component dashboard and add a title to dashboard.component.html. We will also display top 5 heroes here.

    <h3>My Dashboard</h3>
    <h3>Top Heroes</h3>
    <div class="grid grid-pad">
        <a *ngFor="let hero of heroes" [routerLink]="['/detail', hero.id]" class="col-1-4">
            <div class="module hero">
                <h4>{{hero.name}}</h4>
            </div>
        </a>
    </div>

We will now implement logic for top heroes. Open dashboard.component.ts and add.

    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

Try to run ng serve and you should be able to navigate between two routes /dashboard, /heroes

We will now set up the navigation to specific hero with passing the hero id as a number in the params. Add this to your hero-detail.component.ts
  
    @Input()
    hero: Hero;

We implement the ngOnInit and get the data from params on the component init.

    import { HeroService } from './../services/hero.service';
    import { Hero } from './../models/hero';
    import { Component, Input, OnInit } from '@angular/core';
    import { ActivatedRoute, Params } from '@angular/router';
    import { Location } from '@angular/common';
    import 'rxjs/add/operator/switchMap';

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        this.route.params.switchMap((params: Params) =>
            this.heroService.getHero(+params['id'])).subscribe(hero => this.hero = hero);
    }

We already have a method in our hero.service.ts to get all the heroes, but we need to add a method to get a specific hero, which we consume here in the ngOnInit. Add this to your hero.service.ts

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }

When we are on the hero.detail view, we want to have an option to get back to the dashboard. Let's add the back method and the button in the hero-detail component.

    <div>
        <button (click)="goBack()">Back</button>
    </div>

    goBack(): void {
        this.location.back();
    }

We will modify heroes component too, so when you click on hero, you will be presented with a link which takes you to the hero detail component. Add this to heroes.component.html
    
    <div *ngIf="selectedHero">
        <h2>
            {{selectedHero.name | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
    </div>

Let's implement gotoDetail method in heroes.component.ts

    constructor(private heroService: HeroService, private router: Router) {}

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

The final thing in this chapter is styling of our app, just add this to hero-detail.component.css

    label {
        display: inline-block;
        width: 3em;
        margin: .5em 0;
        color: #607D8B;
        font-weight: bold;
    }
    input {
        height: 2em;
        font-size: 1em;
        padding-left: .4em;
    }
    button {
        margin-top: 20px;
        font-family: Arial;
        background-color: #eee;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer; cursor: hand;
    }
    button:hover {
        background-color: #cfd8dc;
    }
        button:disabled {
        background-color: #eee;
        color: #ccc; 
        cursor: auto;
    }

Add some dashboard styling too.

    [class*='col-'] {
    float: left;
    padding-right: 20px;
    padding-bottom: 20px;
    }
    [class*='col-']:last-of-type {
    padding-right: 0;
    }
    a {
    text-decoration: none;
    }
    *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    h3 {
    text-align: center; margin-bottom: 0;
    }
    h4 {
    position: relative;
    }
    .grid {
    margin: 0;
    }
    .col-1-4 {
    width: 25%;
    }
    .module {
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #607D8B;
    border-radius: 2px;
    }
    .module:hover {
    background-color: #EEE;
    cursor: pointer;
    color: #607d8b;
    }
    .grid-pad {
    padding: 10px 0;
    }
    .grid-pad > [class*='col-']:last-of-type {
    padding-right: 20px;
    }
    @media (max-width: 600px) {
    .module {
        font-size: 10px;
        max-height: 75px; }
    }
    @media (max-width: 1024px) {
    .grid {
        margin: 0;
    }
    .module {
        min-width: 60px;
    }
    }

And finally, add these to src/styles.css (global styles)

    /* Master Styles */
    h1 {
    color: #369;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 250%;
    }
    h2, h3 {
    color: #444;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: lighter;
    }
    body {
    margin: 2em;
    }
    body, input[text], button {
    color: #888;
    font-family: Cambria, Georgia;
    }
    /* . . . */
    /* everywhere else */
    * {
    font-family: Arial, Helvetica, sans-serif;
    }