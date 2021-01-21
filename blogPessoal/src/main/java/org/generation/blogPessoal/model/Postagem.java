// serve como uma forma, determina como uma tabela sera no banco de dados
// cada model representa uma tabela diferente no banco de dados

package org.generation.blogPessoal.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import com.sun.istack.NotNull;


@Entity //necessario para se tornar uma tabela com o JPA
@Table(name = "postagem") //sobrescreve o nome da tabela
public class Postagem {
	
	@Id //para se tornar o id da tabela
	@GeneratedValue(strategy = GenerationType.IDENTITY) //funcao de auto-increment
	private long id;
	
	@NotNull //restriçao para coluna nao seja null
	@Size(min=5, max=100) // determinar size minimo e maximo
	private String titulo;
	
	@NotNull
	@Size(min=10, max=500)
	private String texto;
	
	@Temporal(TemporalType.TIMESTAMP) //salva exatamente a data corrente 
	private Date date = new java.sql.Date(System.currentTimeMillis());
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
