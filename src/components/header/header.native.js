import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from '../routing/routing';
import MenuDrawer from 'react-native-side-drawer'
import Hamburger from 'react-native-hamburger';

const Header = props => {

    const [state, setState] = React.useState({
      open: false
    })

    var iconHome = require("../../../assets/header/home.png");
    var iconFave = require("../../../assets/header/fave.png")
    var iconSettings = require("../../../assets/header/settings.png");

    
    const toggleOpen = () => {
      if(state.open === false) {
        setState({...state, open: true})
      } else {
        setState({...state, open:false})
      }
    };
  
    //Remplacer les TouchableOpacity par des Links de Router si ils doivent rediriger sur d'autres pages
    // <Link to="/" component={TouchableOpacity}>  *** Text / Image ***  </Link>
    let drawerContent = () => {
      return (
        <View style={styles.animatedBox}>
          <Link to='/' component={TouchableOpacity} style={styles.ButtonStyleTop}>
            <Image style={styles.iconSize} source={iconHome}></Image>
            <Text style={styles.textParam}>Home</Text>
          </Link>
          <Link to='/faves' component={TouchableOpacity} onPress={() => console.log("cliqué ?")} style={styles.ButtonStyleBottom}>
            <Image style={styles.iconSize} source={iconFave}></Image>
            <Text style={styles.textParam}>Faves</Text>
          </Link>
          <Link to='/settings' component={TouchableOpacity} onPress={toggleOpen} style={styles.ButtonStyleBottom}>
            <Image style={styles.iconSize} source={iconSettings}></Image>
            <Text style={styles.textParam}>Settings</Text>
          </Link>
        </View>
      );
    };
    return (
      <>
        <View style={styles.container}>
            <View style={styles.navBarBg}>
              <View style={styles.beginEndNavBar}>
                <Hamburger style="spinCross" 
                           active={state.open}
                           onPress={toggleOpen}
                           underlayColor="transparent"
                           color="#FFF"/>
              </View>
                <Text style={{ flex:4 }}></Text>
                <View style={styles.beginEndNavBar}>
                  <Link to="/" component={TouchableOpacity}>
                    <Text style={styles.textParam}>logo ?</Text>
                  </Link>
                </View>

            </View>
            <MenuDrawer 
                    open={state.open} 
                    drawerContent={drawerContent()}
                    drawerPercentage={45}
                    animationTime={250}
                    overlay={true}
                    opacity={0.4}
                    >
              
            </MenuDrawer>
            {props.children}
            {/* props.children permet de faire en sorte que la balise header puisse englober d'autres composants : <Header>AutreCompo</Header>  */}
        </View>
      </>
    );


}

export default Header;
const textColor = {
  color: "white",
};

const ButtonCSS = {
  height: 75,
  paddingTop: 20,
  paddingBottom: 20,
  alignContent: "center",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  borderStyle: "solid",
  flexDirection:"row"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    zIndex: 0, // fait en sorte que le conteneur du header soit en dessous de tout
  },
  navBarBg: {
    flexDirection: "row",
    backgroundColor: "#383838",
    justifyContent: "space-between",
    height: 70,
    zIndex: 2, // fait en sorte que la navbar soit au-desus du reste
  },
  beginEndNavBar: {
    flex: 1,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textParam: {
    ...textColor,
    fontWeight: "bold",
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#383838",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonStyleTop: {
    ...ButtonCSS,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 70,
  },
  ButtonStyleBottom: {
    ...ButtonCSS,
    borderBottomWidth: 2,
  },
  iconSize: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: "white",
    resizeMode: "contain"

  }


});