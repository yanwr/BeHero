import React, { useState } from 'react';
import {connect} from 'react-redux';
import './css.css';
import SmallLogo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { setNewIncident } from './CreateIncidentsPage.reducer';
import Loading from '../../components/Loading/Loading';

function CreateIncidentsPage(props) {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState(0);

    async function handleSubmit(e){
        e.preventDefault();
        props.setNewIncident(title, description, value);
        resetState();
    };

    function resetState() {
        setTitle('');
        setDescription('');
        setValue(0);
    };

    const { loading } = props;
    return(
        <div className="newIncident-container">
            <div className="main-container">
                <section>
                    <img src={SmallLogo} alt="Be Hero" />
                    <h1>Cadastrar de Caso</h1>
                    <p>Faça cadastro de um novo caso</p>
                    <Link id="linkRegister" className="btnCustom-link" to="/incidents">
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
                    {   
                        !loading 
                            ? <button type="submit" className="btnCustom">Criar novo caso</button>
                            : <Loading />
                    }   
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = ({ createIncidentState }) => ({
    loading: createIncidentState.loading,
});

const mapDispatchToProps = {
    setNewIncident,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateIncidentsPage);