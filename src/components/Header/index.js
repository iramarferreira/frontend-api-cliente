import React from "react";

import './styles.css';

const Header = () => {
    return (
        <header id="main-header">

            <div className="opcoes_inicio col-3">
                <a href="/"> Home</a>

            </div>

            <div className="opcoes_fim">
                <a href="/sobre">Sobre</a>
                <a href="/contato"> Contato</a>
            </div>

        </header>
    );
}

export default Header;