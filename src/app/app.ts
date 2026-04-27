import { Component, signal } from '@angular/core';
import { FichaMatriculaComponent } from "./ficha-matricula/ficha-matricula";

@Component({
  selector: 'app-root',
  imports: [FichaMatriculaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ficha-matricula');
}
