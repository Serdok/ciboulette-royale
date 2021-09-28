import React from 'react';
import { Popup } from 'react-leaflet';

export default function MapPopup({ image, name, address, contact }) {
  return (
      <>
        <Popup>
          <img alt={'image'} src={image} width={150} height={150}/>
          <div style={{'text-align': 'center', 'align-content': 'center'}}>
            <a target={'_blank'} href={contact?.['Site web (URL)']}>{ name }</a>
            <br/>
            <p style={{'margin': 0}}>Adresse</p>
            <p style={{'margin': 0}}>{ address?.streetAddress }</p>
            <p style={{'margin': 0}}>{ address?.postalCode }</p>
            <p style={{'margin': 0}}>Contact</p>
            <p style={{'margin': 0}}>{ contact?.['Téléphone'] }</p>
          </div>
        </Popup>
      </>
  );
}
