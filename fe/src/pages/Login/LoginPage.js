import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import "./css.css";
import BigLogo from '../../assets/heroes.png';
import SmallLogo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { handleDoLogin } from '../../shared/session/Session.reducer';
import Loading from '../../components/Loading/Loading';

function LoginPage(props){
    const[ id, setId ] = useState('');
    const navigation = useHistory();

    useEffect(() => {
        const { id = '' } = props;
        if(id !== ''){
            setId(id);
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        props.handleDoLogin(id, navigation);
        resetState();
    }

    function resetState() {
        setId('');
    }
    
   const { loading } = props;
   return(
    <div className="login-container">
        { 
            !loading
            ? <>
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
                        <button className="btnCustom" type="submit" id="btnSingIn">Entrar</button>
                        <Link className="btnCustom-link" to="/register" id="linkRegister">
                            <FiLogIn size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
                <img src={BigLogo} alt="Heroes" />
                </>
            : <Loading />
        }
    </div>
   );
}

const mapStateToProps = ({ sessionState, registerState }) => ({
    loading: sessionState.loading, 
    id: registerState.id
});

const mapDispathToProps = {
    handleDoLogin,
};

export default connect(mapStateToProps, mapDispathToProps)(LoginPage);