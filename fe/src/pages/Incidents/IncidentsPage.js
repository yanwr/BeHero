import React, { useEffect, useState } from 'react';
import './css.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import SmallLogo from '../../assets/logo.svg';
import IncidentsList from '../../components/IncidentsList/IncidentsList';
import HttpRequest from '../../shared/httpRequest/HttpRequest';

export default function IncidentsPage(props) {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const navigation = useHistory();
    const [incidents, setIncidents] = useState([]);
    
    useEffect(() => {
        HttpRequest.get('profile', {
          headers: {
            Authorization: ongId,
          }
        }).then(response => {
            console.log('--------------------', response);
          setIncidents(response.data.incidents);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
          await HttpRequest.delete(`/incidents/${id}`, {
            headers: {
              Authorization: ongId,
            }
          });
          setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
          alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigation.push('/');
    }
    
    return(
        <div className="incident-container">
            <header>
                <img src={SmallLogo} alt="Be Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="btn" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos registrados</h1>
            <IncidentsList 
                incidents={incidents} 
                handleDeleteIncident={(itemId) => handleDeleteIncident(itemId)} 
            />
        </div>
    );
}