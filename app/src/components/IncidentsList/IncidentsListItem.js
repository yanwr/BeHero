import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function IncidentsListItem(props) {
     const { item, onPressItem } = props;
    return(
        <View style={styles.container}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{item.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL'
                     }).format(item.value)}
            </Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => onPressItem(item) }
            >
                <Text style={styles.btnText}>Ver mais detalhes</Text>
                <Feather name={'arrow-right'} size={16} color={'#E02041'}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    incidentProperty:{
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    incidentValue:{
        marginTop: 8,
        fontSize: 16,
        marginBottom: 24,
        color: '#737380'
    },
    btn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnText:{
        color:'#E02041',
        fontSize: 15,
        fontWeight:'bold'
    },
});