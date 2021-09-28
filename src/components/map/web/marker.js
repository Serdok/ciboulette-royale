import React from 'react';
import { Marker } from "react-leaflet";
import { THEMES } from "../THEMES";
import { Icon, Point } from 'leaflet';

export default function MapMarker(props) {
    const { id, coordinates, theme } = props;

    function getLeafletIcon(themeName) {
        return new Icon({
            iconUrl: THEMES.find(theme => theme.name === themeName)?.icon,
            iconSize: new Point(30, 30),
            className: 'leaflet-div-icon',
        });
    }

    return (
        <>
            <Marker key={id} position={[coordinates[1], coordinates[0]]} icon={getLeafletIcon(theme)}>
                { props.children }
            </Marker>
        </>
    );
}
