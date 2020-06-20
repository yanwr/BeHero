import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import IncidentsScreen from './screens/Incidents/IncidentsScreen';
import DetailsScreen from './screens/Details/DetailsScreen';

export default function Routes() {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={"IncidentsScreen"}
                screenOptions={
                    {
                        headerShown: false,
                    }
                }
            >
                <Stack.Screen component={IncidentsScreen} name={"IncidentsScreen"} />
                <Stack.Screen component={DetailsScreen} name={"DetailsScreen"} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}