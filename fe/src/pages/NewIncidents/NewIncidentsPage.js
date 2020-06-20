import React, { useState } from 'react';
import './css.css';
import SmallLogo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import HttpRequest from '../../shared/httpRequest/HttpRequest';

export default function NewIncidentsPage(props) {
    const ongId = localStorage.getItem('ongId');
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState(0);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const body = {
                title,
                description,
                value
            };
            await HttpRequest.post('/incidents', body, {
                headers: {
                    Authorization: ongId
                }
            });
            alert('Caso cadastrado com sucesso ! Caso deseja cadastrar mais casos fique na page, se não, volte para home');
            resetState();
        } catch(e){
            alert('Caso esta com erros !');
        }
    }

    function resetState() {
        setTitle('');
        setDescription('');
        setValue(0);
    }

    return(
        <div className="newIncident-container">
        <div className="main-container">
            <section>
                <img src={SmallLogo} alt="Be Hero" />
                <h1>Cadastrar de Caso</h1>
                <p>Faça cadastro de um novo caso</p>
                <Link className="btn-link" to="/incidents">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Casos
                </Link>
            </section>
            <form onSubmit={handleSubmit}>
                <input id="newIncidentTitleInpt"
                    placeholder="Título do Caso" 
                    value={title}
                    onChange={ e => setTitle(e.target.value)}
                 />
                <textarea id="newIncidentDescInpt" 
                    placeholder="Descrição" 
                    value={description}
                    onChange={ e => setDescription(e.target.value)}
                />
                <input type="number" id="newIncidentValueInpt"
                    min={0} 
                    placeholder="Valor em R$"
                    value={value}
                    onChange={ e => setValue(e.target.value)}
                />
                <button type="submit" className="btn" id="btnNewIncident">Criar novo caso</button>
            </form>
        </div>
    </div>
    );
}