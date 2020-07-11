import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './css.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import SmallLogo from '../../assets/logo.svg';
import IncidentsList from '../../components/IncidentsList/IncidentsList';
import { handleDoLogout } from '../../shared/session/Session.reducer';
import Loading from '../../components/Loading/Loading';
import { getIncidentsList, deleteAnItem } from './IncidentsPage.reducer';

function IncidentsPage(props) {
    const navigation = useHistory();
    
    useEffect(() => {
      props.getIncidentsList();
    }, []);

    const { handleDoLogout, loading, ong, incidents, deleteAnItem, loadingIncidents } = props;
    if(loading){
      return <Loading />
    }
    return(
        <div className="incident-container">
          <header>
              <img src={SmallLogo} alt="Be Hero" />
              <span>Bem vindo, {ong.name}</span>
              <Link className="btnCustom" to="/incidents/store">Cadastrar novo caso</Link>
              <button type="button" onClick={() => handleDoLogout(ong.id, navigation)}>
                  <FiPower size={18} color="#E02041"/>
              </button>
          </header>
            <h1>Casos registrados</h1>
         { 
            !loadingIncidents
             ? <IncidentsList 
                incidents={incidents} 
                handleDeleteIncident={(itemId) => deleteAnItem(itemId)} 
               />
             : <Loading />
          }
        </div>
    );
}

const mapStateToProps = ({ sessionState, incidentState }) => ({
  loading: sessionState.loading,
  
  ong: incidentState.ong,
  loadingIncidents: incidentState.loadingIncidents,
  incidents: incidentState.incidents
});

const mapDispatchToProps = {
  handleDoLogout,
  getIncidentsList,
  deleteAnItem
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentsPage);
