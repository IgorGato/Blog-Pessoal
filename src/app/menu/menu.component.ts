import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logging } from 'selenium-webdriver';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  id = environment.id

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.loging()
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.nome = ''
    environment.foto = ''
    environment.token = ''
    environment.id = 0
  }

  loging(){
    if(this.router.url.includes('entrar')){
      environment.token = ''
    }
  }
}
