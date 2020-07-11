import React, { useState } from 'react';
import { connect } from 'react-redux';
import './css.css';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import SmallLogo from '../../assets/logo.svg';
import HttpRequest from '../../shared/httpRequest/HttpRequest';
import {setNewOng} from './RegisterPage.reducer';

function RegisterPage(props) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ wpp, setWpp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const navigation = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        props.setNewOng(name, email, wpp, city, uf, navigation);
        resetState();
    }

    function resetState(){
        setName('');
        setEmail('');
        setWpp('');
        setCity('');
        setUf('');
    }

    return(
        <div className="register-container">
            <div className="main-container">
                <section>
                    <img src={SmallLogo} alt="Be Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e faça a diferença sendo um herói</p>
                    <Link className="btnCustom-link" id="linkRegister" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Sing in
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        id="ongNameInpt"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={ e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        id="ongEmailInpt"
                        placeholder="Email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                    <input 
                        id="ongWppInpt" 
                        placeholder="WhatsApp"
                        value={wpp}
                        onChange={ e => setWpp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            id="ongCityInpt" 
                            placeholder="Cidade"
                            value={city}
                            onChange={ e => setCity(e.target.value)}
                        />
                        <input 
                            id="ongUfInpt" 
                            placeholder="UF" 
                            value={uf}
                            onChange={ e => setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btnCustom" id="btnRegister">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = ({ registerState }) => ({
    loading: registerState.loading,
});

const mapDispatchToProps = {
    setNewOng,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);