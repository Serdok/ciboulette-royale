import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "leaflet/dist/leaflet.css";
import {
    LayersControl,
    FeatureGroup,
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Pane,
    Circle,
} from "react-leaflet";
import L from "leaflet";

import Overlay from "./web/overlay";
import Feature from "./web/feature";

import { THEMES } from "./THEMES";
import { getDetailsForLyon } from "../../services/lyon";

// icones
// const museum = new L.Icon({
//     iconUrl: require("../../../assets/icone/museum.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const restau = new L.Icon({
//     iconUrl: require("../../../assets/icone/restaurant.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const activite = new L.Icon({
//     iconUrl: require("../../../assets/icone/activity.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const shop = new L.Icon({
//     iconUrl: require("../../../assets/icone/shop.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const rien = new L.Icon({
//     iconUrl: require("../../../assets/icone/shop.png"),
//     iconSize: new L.Point(0, 0),
//     className: "leaflet-div-icon",
// });
// const pratique = new L.Icon({
//     iconUrl: require("../../../assets/icone/location.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const spectacle = new L.Icon({
//     iconUrl: require("../../../assets/icone/show.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const Nocturne = new L.Icon({
//     iconUrl: require("../../../assets/icone/drinks.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const unesco = new L.Icon({
//     iconUrl: require("../../../assets/icone/statue.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
// const hotel = new L.Icon({
//     iconUrl: require("../../../assets/icone/hotel.png"),
//     iconSize: new L.Point(30, 30),
//     className: "leaflet-div-icon",
// });
//
// // function pour icone
// function j_type(pt_type) {
//     if (pt_type === "Boutiques & Shopping") {
//         return shop;
//     } else if (pt_type === "Activit??s, Loisirs et Bien-??tre") {
//         return activite;
//     } else if (pt_type === "Restaurants & Gastronomie") {
//         return restau;
//     } else if (pt_type === "Lyon Pratique") {
//         return pratique;
//     } else if (pt_type === "Lieux de spectacles") {
//         return spectacle;
//     } else if (pt_type === "Culture & Mus??es") {
//         return museum;
//     } else if (pt_type === "Patrimoine - Unesco") {
//         return unesco;
//     } else if (pt_type === "Nocturne") {
//         return Nocturne;
//     } else if (pt_type === "H??bergements") {
//         return hotel;
//     } else {
//         return rien;
//     }
// }
//
// // data filtr??s par theme
// const d_activite = data.filter((feature) =>
//     feature.properties.theme.includes("Boutiques & Shopping")
// );
// const d_boutique = data.filter((feature) =>
//     feature.properties.theme.includes("Activit??s, Loisirs et Bien-??tre")
// );
// const d_restau = data.filter((feature) =>
//     feature.properties.theme.includes("Restaurants & Gastronomie")
// );
// const d_pratique = data.filter((feature) =>
//     feature.properties.theme.includes("Lyon Pratique")
// );
// const d_spectacle = data.filter((feature) =>
//     feature.properties.theme.includes("Lieux de spectacles")
// );
// const d_culture = data.filter((feature) =>
//     feature.properties.theme.includes("Culture & Mus??es")
// );
// const d_patrimoine = data.filter((feature) =>
//     feature.properties.theme.includes("Patrimoine - Unesco")
// );
// const d_hotel = data.filter((feature) =>
//     feature.properties.theme.includes("H??bergements")
// );
//carte leaflet
/////

const Map = ({ route }) => {
    const [features, setFeatures] = useState(null);

    useEffect(() => {
        (async () => {
            // Get city from routing
            const { city } = route.params;
            switch (city.toLowerCase()) {
                case "lyon":
                    const result = await getDetailsForLyon();
                    setFeatures(result.features);
                    break;
            }
        })();
    }, []);

    function renderOverlays() {
        if (!features) {
            return null;
        }

        return THEMES.map(theme => {
            // Only keep features with the theme
            const filtered = features.filter(feature => feature.properties.theme.includes(theme.name));

            return (
                <>
                    <Overlay name={theme.name}>
                        <Feature features={filtered} theme={theme.name}/>
                    </Overlay>
                </>
            );
        });
    }

    return (
        <>
            <View style={styles.container}>
                <MapContainer
                    center={[45.757777, 4.83223]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "100em" }}
                >
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="Plan">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>
                        <LayersControl.BaseLayer name="satellite">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                        </LayersControl.BaseLayer>

                        {renderOverlays()}

                        {/*<LayersControl.Overlay name="Boutiques & Shopping">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_boutique.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            ></Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Activit??s, Loisirs et Bien-??tre">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_activite.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>*/}
                        {/*                    <img*/}
                        {/*                        src={tourisme.properties.illustrations[0]?.urlFiche}*/}
                        {/*                        width="150" height="150"*/}
                        {/*                    />*/}
                        {/*                    <div*/}
                        {/*                        style={{*/}
                        {/*                            "text-align": "center",*/}
                        {/*                            "align-content": "center",*/}
                        {/*                            color: "black",*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        <a target="_blank" href={tourisme.properties.contact[1]?.siteweb}>*/}
                        {/*                            {tourisme.properties.nom}*/}
                        {/*                        </a>*/}
                        {/*                        <br/> {<p style={{ margin: 0 }}>*/}
                        {/*                        Adresse </p>} <br/>*/}
                        {/*                        {tourisme.properties.address.streetAddress}*/}
                        {/*                        <br/> {tourisme.properties.address.postalCode}*/}
                        {/*                        <br/> {<p style={{ margin: 0 }}> Contacts </p>} <br/>*/}
                        {/*                        {tourisme.properties.contact[0].T??l??phone}*/}
                        {/*                        {console.log(tourisme.properties.contact[1]?.siteweb)}*/}
                        {/*                    </div>*/}
                        {/*                </Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Restaurants & Gastronomie">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_restau.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Lyon Pratique">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_pratique.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Lieux de spectacles">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_spectacle.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Culture & Mus??es">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_culture.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Patrimoine - Unesco">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_patrimoine.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                        {/*<LayersControl.Overlay name="Hotels">*/}
                        {/*    <FeatureGroup>*/}
                        {/*        {d_hotel.map((tourisme) => (*/}
                        {/*            <Marker*/}
                        {/*                key={tourisme.properties.id}*/}
                        {/*                position={[*/}
                        {/*                    tourisme.geometry.coordinates[1],*/}
                        {/*                    tourisme.geometry.coordinates[0],*/}
                        {/*                ]}*/}
                        {/*                icon={j_type(tourisme.properties.theme)}*/}
                        {/*            >*/}
                        {/*                <Popup>{tourisme.properties.nom}</Popup>*/}
                        {/*            </Marker>*/}
                        {/*        ))}*/}
                        {/*    </FeatureGroup>*/}
                        {/*</LayersControl.Overlay>*/}
                    </LayersControl>
                </MapContainer>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    leafletPopupContentWrapper: {
        padding: 1,
        textAlign: "center",
        borderRadius: 12,
    },
});
export default Map;
