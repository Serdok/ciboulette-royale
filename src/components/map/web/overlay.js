import React from 'react';
import { LayersControl } from "react-leaflet";

export default function Overlay(props) {
    const { name } = props;

    return (
        <>
            <LayersControl.Overlay name={name}>
                { props.children }
            </LayersControl.Overlay>
        </>
    );
}
