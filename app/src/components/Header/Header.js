import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../assets/logo.png';

export default function HeaderComponent(props){
    const { returnPage, navigation, totalItens = 0 } = props;
    return(
        <View style={styles.container}>
            { returnPage 
                ? <TouchableOpacity 
                    onPress={() => navigation.goBack() }
                >
                        <Feather name={'arrow-left'} size={28} color={'#E04041'} />
                </TouchableOpacity>
                : <Text style={styles.txt}>
                    Total de <Text style={{ fontWeight: 'bold'}}> {totalItens} {totalItens != 1 ? 'casos' : 'caso' }</Text>
                </Text>
            }
             <Image source={Logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txt:{
        fontSize: 15,
        color: "#737380"
    }
});