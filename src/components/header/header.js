import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { Link } from '../routing/routing';


const Header = props => {

    const [state,setState] = React.useState ({

    })

    var iconHome = require("../../../assets/header/home.png");
    var iconFave = require("../../../assets/header/fave.png");
    var iconSettings = require("../../../assets/header/settings.png");

    return(
        <>
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <View style={styles.navBarBegin}>
                        <Link to="/" component={TouchableOpacity} style={styles.logoContainer}>
                            <Text style={styles.textParam}>logo ?</Text>
                        </Link> 
                        <Link to="/" component={TouchableOpacity} style={styles.navBarButtonSize}>
                            <Image style={styles.iconSize} source={iconHome}></Image>
                            <Text style={styles.textParam}>Home</Text>
                        </Link>
                        <Link to="/faves" component={TouchableOpacity} style={styles.navBarButtonSize}>
                            <Image style={styles.iconSize} source={iconFave}></Image>
                            <Text style={styles.textParam}>Faves</Text>
                        </Link>
                    </View>
                    <View style={styles.navBarEnd}>
                        <Link to="/settings" component={TouchableOpacity} style={styles.navBarButtonSize}>
                            <Image style={styles.iconSize} source={iconSettings}/>
                            <Text style={styles.textParam}>Settings</Text>
                        </Link>
                    </View>
                </View>
                {props.children}
            </View>
        </>
    );
}

export default Header;
const textColor = { color: "white" };
const styles = StyleSheet.create({
    container:{
        flex:1,
        zIndex: 0,
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: "#383838",
        justifyContent: "space-between",
        height: 70,
        zIndex: 2,
        padding: 5,
        alignItems:"center"
    },
    navBarBegin: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        zIndex: 2,
        alignItems: 'center'
    },
    navBarEnd: {
        flexDirection:"row",
        justifyContent: "flex-end",
        zIndex: 2,
        alignItems: "center"
    },
    textParam: {
        ...textColor,
        fontWeight: "bold"
    },
    logoSize: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        width: 100, //Largeur de l'image
        alignContent:"center",
        textAlign: "center"
    },
    navBarButtonSize: {
        width:100,
        flexDirection: "row"
    },
    iconSize: {
        width: 20,
        height: 20,
        marginRight: 5,
        tintColor:"white",
        resizeMode: "contain"
    }
});
