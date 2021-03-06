import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font'
import { Provider as PaperProvider } from 'react-native-paper';

import Cities from './components/menuList/menuList';
import Map from './components/map/map';
import Faves from './components/faves/faves';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => {}, []);

    const [loaded] = useFonts({
        Coolvetica: require("../assets/fonts/coolvetica.ttf")
    });

    if(!loaded) {
        return null;
    }

    return (
        <>
           <PaperProvider>
               <StatusBar style="auto" />
               <NavigationContainer>
                   <Tab.Navigator
                       screenOptions={({ route }) => ({
                           tabBarIcon: ({ focused, color, size }) => {
                               let iconName;
                               switch (route.name) {
                                   case 'Menu':
                                       iconName = focused ? 'ios-funnel' : 'ios-funnel-outline';
                                       break;
                                   case 'Map':
                                       iconName = focused ? 'ios-compass' : 'ios-compass-outline';
                                       break;
                                   // case 'Favorites':
                                   //     iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
                                   //     break;
                               }

                               return <Ionicons name={iconName} size={size} color={color}/>;
                           },
                           tabBarActiveTintColor: 'tomato',
                           tabBarInactiveTintColor: 'grey',
                       })}
                   >
                       <Tab.Screen name={'Menu'} component={Cities} options={{headerShown: false}}/>
                       <Tab.Screen name={'Map'} component={Map} initialParams={{ city: 'lyon' }} options={{headerShown: false}}/>
                       {/*<Tab.Screen name={'Favorites'} component={Faves} options={{headerShown: false}}/>*/}
                   </Tab.Navigator>
               </NavigationContainer>
           </PaperProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#606060',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
    animatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F04812',
    }
});

export default App;
