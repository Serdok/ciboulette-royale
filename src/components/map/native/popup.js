import React from 'react';
import { Callout } from "react-native-maps";
import { Image, View, Text, StyleSheet } from "react-native";

export default function MapPopup({ image, name, address, contact }) {
    return (
        <>
            <Callout key={name} tooltip={false} style={styles.container}>
                <>
                    <View style={styles.image}>
                        {image ? <Image source={{ uri: image }}/> : <Text>~ Image non trouvée ~</Text>}
                    </View>
                    <View>
                        <Text style={styles.name}>{ name }</Text>
                        <Text style={styles.text}>Adresse</Text>
                        <Text style={styles.text}>{ address?.streetAddress}</Text>
                        <Text style={styles.text}>{ address?.postalCode}</Text>
                        <Text style={styles.text}>Contact</Text>
                        <Text style={styles.text}>{ contact?.['Téléphone']}</Text>
                    </View>
                </>
            </Callout>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        paddingHorizontal: 2,
    },
    name: {
        fontWeight: 'bold',
    }
})
