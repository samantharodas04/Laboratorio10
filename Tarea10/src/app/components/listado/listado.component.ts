import { Component, OnInit } from '@angular/core';
import { PersonajeComponent } from '../personaje/personaje.component';
import { ShareService } from '../../services/share.service';
import { RAMInfo, RAMPersonaje, RAMResponse } from '../../models/response/RAMResponse';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [ PersonajeComponent, HttpClientModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent implements OnInit{
  private baseURL = "https://rickandmortyapi.com/api"
  respuesta: RAMResponse = new RAMResponse(new RAMInfo(), []);
  currentPage: number = 1;
  lastPage: number = 0;
  cp: Array<RAMPersonaje> = [];
  constructor(
    private share: ShareService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.share.personaje.subscribe(p => {
      this.cp = p;
    });
    this.share.currentPage.subscribe(page => {
      this.currentPage = page;
      console.log(`currentPage : ${this.currentPage}`)
      this.getPersonajes(this.currentPage).subscribe (data => {
        this.lastPage = data.info.pages;
        this.respuesta = data;
        console.log(this.respuesta);
      });
    });
  }

  getPersonajes(pagina: number) {
    return this.http.get<RAMResponse>(`${this.baseURL}/character?page=${pagina}`);
  }

  backPage() {
    if (this.currentPage > 1) {
      console.log(`${this.currentPage - 1}`);
     this.share.setNewPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.lastPage) {
      console.log(`${this.currentPage + 1}`);
      this.share.setNewPage(this.currentPage + 1)
    }
  }

  setCurrentPersonaje(p: RAMPersonaje) {
    this.share.setCurrentPersonaje(p);
  }


}
