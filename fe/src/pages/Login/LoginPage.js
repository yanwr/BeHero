import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./css.css";
import BigLogo from '../../assets/heroes.png';
import SmallLogo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import HttpRequest from '../../shared/httpRequest/HttpRequest';

export default function LoginPage(props){
    const[ id, setId ] = useState('');

    const navigation = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const result = await HttpRequest.post('/login', { id });
            console.log('OK', result.data);
            saveOngInLocalStorage(result.data.name);
            resetState();
        }catch(e){
            alert('Deu ruim', e);
        }
    }

    function saveOngInLocalStorage(name) {
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', name);
        navigation.push('/incidents');
    }

    function resetState() {
        setId('');
    }

   return(
    <div className="login-container">
        <section className="form-container">
            <img src={SmallLogo} alt="Be Hero" />
            <form onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>
                <input 
                    placeholder="Sua ID" 
                    id="ongIdInpt"
                    value={id}
                    onChange={ e => setId(e.target.value)}
                />
                <button className="btn" type="submit" id="btnSingIn">Entrar</button>

                <Link className="btn-link" to="/register" id="linkRegister">
                  <FiLogIn size={16} color="#E02041" />
                  Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={BigLogo} alt="Heroes" />
    </div>
   );
}