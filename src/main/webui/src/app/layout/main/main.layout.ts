import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'main-layout',
  imports: [RouterModule],
  templateUrl: './main.layout.html',
  styles: ``,
  host: { class: 'flex flex-col h-screen w-screen overflow-y-auto' },
})
export class MainLayout {}
