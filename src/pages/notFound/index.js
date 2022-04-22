import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Result, Button} from 'antd';

class NotFound extends Component{

    render(){
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Desculpe, a página que você visitou não existe"
                    extra={ <Link to="/"> <Button type="primary" >Voltar para o início</Button> </Link>}
                />
            </div>
        );
    }
}

export default NotFound;