import { default as React, PropTypes } from 'react'

import {
    withGoogleMap,
    GoogleMap,
    OverlayView,
    InfoWindow,
} from 'react-google-maps';

import Link from './Link'



const getPixelPositionOffset = (width, height) => {
    return { x: -(width / 2), y: -(height / 2) };
}

const MapView = withGoogleMap(props => {
    let overlays = (props.clusters.length > 0) ?
        props.clusters.map((cluster, index) => (
        <OverlayView
         key={index}
         position={cluster.center}
         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
         getPixelPositionOffset={getPixelPositionOffset}>
            <div className="marker" onClick={() => props.onWordSelection(cluster, cluster.mostPopular[0][0])}>
                <div className="circle"></div>
                <div>{cluster.mostPopular[0][0]}</div>
            </div>
        </OverlayView>
    )) : null;
    return (
    <GoogleMap
     ref={props.onMapLoad}
     center={props.center}
     zoom={props.zoom}
     onCenterChanged={props.onCenterChanged}
     onIdle={props.onIdle}
     onZoomChanged={props.onZoomChanged}>
        {overlays}
    </GoogleMap>)
});

MapView.propTypes = {
    ref: PropTypes.func,
    clusters: PropTypes.array.isRequired,
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    onCenterChanged: PropTypes.func.isRequired,
    onZoomChanged: PropTypes.func.isRequired,
    onWordSelection: PropTypes.func.isRequired,
    onIdle: PropTypes.func.isRequired,
}

export default MapView
