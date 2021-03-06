import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  altPostagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  item: any

  user: User = new User()
  idUser = environment.id

  idPostagem: number

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    
    if(environment.token == ''){
      
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
    
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      
      this.user = resp
      console.log(this.user)
    })
  }

  publicar(){
    
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    console.log(this.postagem)
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.getAllTemas()
      this.findByIdUser()
      this.postagem = new Postagem()
      this.idTema = 0
    })

  }

  getIdPostagem(id: number){
    this.idPostagem = id;
  }

  findPostagemById(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.altPostagem = resp;
      console.log(this.postagem)
    });
  }

  atualizarPostagem(){

    console.log(this.altPostagem)

    this.postagemService.putPostagem(this.altPostagem).subscribe((resp: Postagem) => {
      this.altPostagem = resp
      this.findByIdUser();
      this.alerta.showAlertSuccess('Postagem atualizada com sucesso!');
      console.log(this.altPostagem)
      this.altPostagem = new Postagem()
    })
  }

  excluirPostagem(){  
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.findByIdUser();
      this.alerta.showAlertSuccess('Postagem excluída com sucesso!');
    })
  }

}
