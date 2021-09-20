import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Router, Route } from './components/routing/routing';
import Header from './components/header/header';
import Menu from './components/menuList/menuList';
import Map from './components/map/map';

function App() {
    useEffect(() => {

    }, []);

    return (
        <>
            <StatusBar backgroundColor="#383838"/>
            <Router>
                <Header>
                    <View style={styles.container}>
                        <Route exact path="/" component={Menu}/>
                        <Route path="/map/:city" component={Map}/>
                    </View>
                </Header>
            </Router>
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
