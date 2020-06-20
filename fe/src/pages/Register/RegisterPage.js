import React, { useState } from 'react';
import './css.css';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import SmallLogo from '../../assets/logo.svg';
import HttpRequest from '../../shared/httpRequest/HttpRequest';

export default function RegisterPage(props) {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ wpp, setWpp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const navigation = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const body = {
                "name": name,
                "email": email,
                "whatsapp": wpp,
                "city": city,
                "uf": uf
            };
            const result = await HttpRequest.post('/ongs', body);
            alert('Deu boa', result.data.id);
            resetState();
            navigation.push('/');
        } catch(e) {
            alert('Deu ruim', e);
        }
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
                    <Link className="btn-link" to="/">
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
                    <button type="submit" className="btn" id="btnRegister">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}