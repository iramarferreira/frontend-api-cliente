import React, {Component} from 'react';
import { Result, Button, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './styles.css';
import 'antd/dist/antd.css';


import api from './../../services/apiCliente';

class Add extends Component{

    

    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

   
    handleSubmit = async (event) => {
        event.preventDefault();
        
        const inputNome = document.getElementById('nome');
        const inputEmail = document.getElementById('email');
        const inputTelefone = document.getElementById('telefone');
        const inputRua = document.getElementById('rua');
        const inputBairro = document.getElementById('bairro');
        const inputNumero = document.getElementById('numero');
        const inputCidade = document.getElementById('cidade');
        const inputUf = document.getElementById('uf');
        const inputCep = document.getElementById('cep');
        
    
         
        if(inputNome.value === '' || inputEmail===''){
            alert("Preecha pelo menos o nome e e-mail.");
        }else{

            const endereco = {
                'rua': inputRua.value,
                'bairro': inputBairro.value,
                'numero': inputNumero.value,
                'cidade': inputCidade.value,
                'uf': inputUf.value,
                'cep': inputCep.value
            }
        

            const cliente = {
                'nome': inputNome.value,
                'email': inputEmail.value,
                'telerone': inputTelefone.value,
                'endereco': endereco
            }
        
            console.log(cliente);

            console.log(Cookies.get())
    
            // preencher em branco os campos
            inputNome.value = '';
            inputEmail.value = '';
            inputTelefone.value = '';
            inputRua.value = '';
            inputBairro.value = '';
            inputCidade.value = '';
            inputNumero.value = '';
            inputCep.value = '';
            inputUf.value = '';
            
            const headers = {
                'Content-Type': 'multipart/form-data',
            }

            
    
            try{
                const response = await api.post(`/cliente`, JSON.stringify(cliente),{
                    auth:{
                        username:process.env.REACT_APP_USER,
                        password:process.env.REACT_APP_PASSWORD
                        },
                        headers:{
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
                        },
                
                    });
                console.log(response);
                alert('Cliente cadastrado');
                // document.location.reload()
            }catch(err){
                console.log(err);
                alert('Erro ao cadastrar o cliente');
            }
        }
        
    }

    render(){
        return(
            <div className="form-add col-6">

                <form onSubmit={this.handleSubmit}>
                    <h1>Cadastro de Cliente</h1>
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
                    

                    <button type="submit" >Adicionar</button>
                </form>
            </div>
        );
    }

}

export default Add;