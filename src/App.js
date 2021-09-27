import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Menu from './components/menuList/menuList';
import Cities from './components/cities/cities';
import Map from './components/map/map';
import Faves from './components/faves/faves';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => {}, []);

    return (
        <>
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
                                case 'Favorites':
                                    iconName = focused ? 'ios-bookmark' : 'ios-bookmark-outline';
                                    break;
                            }

                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'grey',
                    })}
                >
                    <Tab.Screen name={'Menu'} component={Cities} options={{headerShown: false}}/>
                    <Tab.Screen name={'Map'} component={Map} initialParams={{ city: 'lyon' }} options={{headerShown: false}}/>
                    <Tab.Screen name={'Favorites'} component={Faves} options={{headerShown: false}}/>
                </Tab.Navigator>
            </NavigationContainer>
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
