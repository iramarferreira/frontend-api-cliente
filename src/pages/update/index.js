import React, {Component} from 'react';
import { Result, Button, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles.css';
import 'antd/dist/antd.css';


import api from './../../services/apiCliente';

class Update extends Component{

    state = {
        cliente: {
            id: 0,
            nome: "",
            email: "",
            telefone: "",
            endereco: {
                id: 0,
                rua: "",
                bairro: "",
                numero: "",
                cidade: "",
                uf: "",
                cep: "",
            }
        }
    };

    constructor(props, context){
        super(props, context)
        
    }

    componentDidMount(){
        // carregar o id do cliente
        let idCliente = JSON.parse(sessionStorage.getItem('id'));
        console.log(idCliente)
        this.carregarCliente(idCliente)
    }

    setCampos = () => {
        const {cliente} = this.state;
        console.log(cliente)
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('email').value = cliente.email;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('rua').value = cliente.endereco.rua;
        document.getElementById('bairro').value = cliente.endereco.bairro;
        document.getElementById('numero').value = cliente.endereco.numero;
        document.getElementById('cidade').value = cliente.endereco.cidade;
        document.getElementById('uf').value = cliente.endereco.uf;
        document.getElementById('cep').value = cliente.endereco.cep;
    }

    carregarCliente =  async (id) => {
        
        let data;
        try{
            const response = await api.get(`/cliente/${id}`, {
              auth:{
              username: process.env.REACT_APP_USER,
              password: process.env.REACT_APP_PASSWORD
              },
              headers:{
              "Accept": "application/json",
              "Content-Type": "application/json"
              },
          })
          data = response.data;
          console.log(data)
          this.setState({
              cliente: data
          })
          console.log(this.state)
          
        }catch(e){
          console.log(e);
        }

        // Setando os campos depois que carregar os clientes
        this.setCampos()

      };

   
    handleSubmit = async (event) => {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const rua = document.getElementById('rua').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const cidade = document.getElementById('cidade').value;
        const uf = document.getElementById('uf').value;
        const cep = document.getElementById('cep').value; 

        const endereco = {
            id: this.state.cliente.endereco.id,
            rua,
            bairro,
            numero,
            cidade,
            uf,
            cep
        }
        const cliente = {
            id:this.state.cliente.id,
            nome,
            email,
            telefone,
            endereco
        }
        console.log(cliente) 
        this.setState({
            cliente: cliente
        })
        console.log(this.state)

        console.log(Cookies.get())

    
        try{
            const response = await api.put(`/cliente`, JSON.stringify(cliente),{
                auth:{
                    username: process.env.REACT_APP_USER,
                    password: process.env.REACT_APP_PASSWORD
                    },
                    headers:{
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
                    },
            
                });
            console.log(response);
            alert('Cliente atualizado');
            document.location.replace("../")
        }catch(err){
            console.log(err);
            alert('Erro ao atualizar o cliente');
        }
       
        
    }

    render(){
        return(
            <div className="form-update col-6">

                <form onSubmit={this.handleSubmit}>
                    <h1>Atualização de Cliente</h1>
                    <label className="col-3">
                        Nome:
                        <Input className="col-9"  type="text" id="nome"  />
                    </label> 
                    <br/>
                    <label className="col-3">
                        E-mail:
                        <Input className="col-9" type="email" id="email"  />
                    </label> 
                    <br/>
                
                    <label className="col-3">
                        Telefone:
                        <Input className="col-3" type="text" id="telefone"  />
                    </label>
                    <br/>
                    <h2>Endereço</h2>
                    <label className="col-3">
                        Rua:
                        <Input className="col-9" type="text" id="rua"  />
                    </label> 
                    <br/>
                    <label className="col-3">
                        Bairro:
                        <Input className="col-9" type="text" id="bairro"  />
                    </label> 
                    <br/>
                    <label className="col-3">
                        Número:
                        <Input className="col-6" type="number" id="numero"  />
                    </label> 
                    <br/>
                    <label className="col-3">
                        Cidade:
                        <Input className="col-6" type="text" id="cidade"/>
                    </label>
                    <br/>
                    <label className="col-3">
                        UF:
                        <Input className="col-5" type="text" id="uf"/>
                    </label>
                    <br/>
                    <label className="col-3">
                        CEP:
                        <Input className="col-6" type="text" id="cep"/>
                    </label>
                    <br/>
                    

                    <button type="submit" >Atualizar</button>
                </form>
            </div>
        );
    }

}

export default Update;