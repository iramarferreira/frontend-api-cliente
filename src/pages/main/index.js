import React, { Component, } from "react";
import { Table, Space  } from "antd";
import api from './../../services/apiCliente';
import 'antd/dist/antd.css';
import {UserAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import './styles.css'
import Cookies from 'js-cookie';

// Definis as colunas da tabela
import qs from 'qs';

const test = (id) => {
  console.log("Test" + id)
}

function handleClick(e) {
  e.preventDefault();
  console.log('The link was clicked.');
}

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    sorter: true,
    render: nome => `${nome}`,
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
  },
  {
    title: 'Endereço',
    dataIndex: 'endereco',
    render: endereco => `${endereco.cidade}, ${endereco.numero}. 
    ${endereco.bairro}. ${endereco.cidade} - ${endereco.uf} `
  },
  {
    title: 'Ação',
    render: record => 
    <>
    <Space size="middle">
      <button  onClick={() =>{
        updateCliente(record.id)
      }} ><EditOutlined /></button>

      <button  href="#" onClick={() => {
       
        removerCliente(record.id)}}> <DeleteOutlined /></button>
    </Space>
    
    </>
     
    

  }
];

const updateCliente = (id) => {
  var dados = JSON.stringify(id);
  sessionStorage.setItem('id', dados );
  window.location.href = '/update';
}

const removerCliente = async (idCliente) => {
  try{
    const response = await api.delete(`/cliente/${idCliente}`, {
      auth:{
        username: process.env.REACT_APP_USER,
        password: process.env.REACT_APP_PASSWORD
      },
      headers:{
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
      }
    })
    document.location.reload(true);
    // console.log("DELETANDO")
    // console.log(document.cookie.split("=")[1])
    // console.log(response)
  }catch(e){
    console.log(e)
  }

}

// const getRandomuserParams = params => ({
//   results: params.pagination.pageSize,
//   page: params.pagination.current,
//   ...params,
// });

class Main extends Component{

  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };
  
  componentDidMount() {
    const { pagination } = this.state;
    this.carregarClientes({ pagination });
    console.log(Cookies.get())
  }


  handleTableChange = (pagination, filters, sorter) => {
    // this.carregarClientes({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // });
  };

  carregarClientes =  async (params = {}) => {
    this.setState({ loading: true });
    try{
        const response = await api.get('/clientes', {
          auth:{
          username: process.env.REACT_APP_USER,
          password: process.env.REACT_APP_PASSWORD
          },
          headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
          },
      })
      const {data} = response;
      console.log(data)
      this.setState({
        loading: false,
        data: data,
        // pagination: {
        //   ...params.pagination,
        //   total: 200,
        //   // 200 is mock data, you should read it from server
        //   // total: data.totalCount,
        // },
      });
    }catch(e){
      console.log(e);
    }
    
  };

  

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <div className="div-main">
      <h1>Para adicionar mais um cliente clique no botão
      <a href="/add"> <UserAddOutlined />   </a>
      </h1> 
      
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          loading={loading}
          onChange={this.handleTableChange}
        />

      </div>
    );
  }

}

export default Main;