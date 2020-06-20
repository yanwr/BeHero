import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import HeaderComponent from '../../components/Header/Header';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function DetailsScreen() {
    const navigation = useNavigation();
    const getParamsNavigation = useRoute();
    
    const incident = getParamsNavigation.params.item;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso '${incident.title}' com o valor de: ${Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL'
    }).format(incident.value)}.`;

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: `,
            recipients: [incident.email],
            body: message,
        });
    }
    function sendWpp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <HeaderComponent returnPage={true} navigation={navigation}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.incidentContainer}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}, de {incident.city} - {incident.uf}</Text>

                <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                            style: 'currency', 
                            currency: 'BRL'
                        }).format(incident.value)}
                </Text>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.txtTitle}>Salve o dia !</Text>
                <Text style={styles.txtTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.txtContact}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={sendWpp}
                    >
                        <Text style={styles.btnTxt}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={sendEmail}
                    >
                        <Text style={styles.btnTxt}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View> 
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 15,
    },
    incidentContainer:{
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 8,
        marginTop: 20
    },
    incidentProperty:{
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 20
    },
    incidentValue:{
        marginTop: 8,
        fontSize: 16,
        color: '#737380'
    },
    contactContainer:{
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    txtTitle:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#13131a',
        lineHeight: 25
    },
    txtContact:{
        fontSize: 15,
        color: '#737380',
        marginTop: 10
    },
    actions:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn:{
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width:'48%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt:{
        color: '#FFF',
        fontSize: 15,
        fontWeight:'bold'
    }
});