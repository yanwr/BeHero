import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderComponent from '../../components/Header/Header';
import Constants from 'expo-constants';
import IncidentsList from '../../components/IncidentsList/IncidentsList';
import { useNavigation } from '@react-navigation/native';
import HttpRequest from '../../shared/httpRequest/HttpRequest';


export default function IncidentsScreen(props){
    const [ incidents, setIncidents ] = useState([]);
    const [ totalItens, setTotalItens ] = useState(0);
    const [ page, setPage ] = useState(1); // sempre deve começar com 1
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation();

    async function loadIncidents() {
        try{
            if(loading){
                return;
            }   
            if(totalItens > 0 && incidents.length === totalItens){
                return;
            }
            setLoading(true);
            const result = await HttpRequest.get(`/incidents?page=${page}`);
            setIncidents([...incidents, ...result.data.incidents]);
            setTotalItens(result.headers['x-total-count']);
            setPage(page + 1);
            setLoading(false);
        } catch(e) {
            console.log('Deu ruim');
        }
    }

    useEffect(() => {
        loadIncidents();
    }, []);
    
    return(
        <View style={styles.container}>
            <HeaderComponent returnPage={false} navigation={navigation} totalItens={totalItens} />
            <Text style={styles.txtWelcome}>Bem-vindo !</Text>
            <Text style={styles.txtMain}>Escolha um dos casos abaixo e salve o dia</Text>
            <IncidentsList 
                incidents={incidents}
                onPressItem={(item) => { navigation.navigate('DetailsScreen', { item }) }}
                onLoadMore={() => loadIncidents()}
                loading={loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 15,
    },
    txtWelcome:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 28,
        color: '#13131a',
        fontWeight: 'bold'
    },
    txtMain:{
        fontSize: 16,
        color:'#737380',
        lineHeight: 24
    },
});