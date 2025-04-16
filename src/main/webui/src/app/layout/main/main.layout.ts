import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'main-layout',
  imports: [RouterModule, SpinnerComponent],
  templateUrl: './main.layout.html',
  styles: ``,
  host: { class: 'flex flex-col h-screen w-screen overflow-y-auto' },
})
export class MainLayout {}
