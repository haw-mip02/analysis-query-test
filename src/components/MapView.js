import { default as React, PropTypes } from 'react'

import {
    withGoogleMap,
    GoogleMap,
    OverlayView,
} from 'react-google-maps';


const getColorBetween = (from, to, pos) => Array(3).fill(1).reduce((acc, _, i) => acc + ('00' + Math.floor((from >> (2 - i) * 8 & 0xff) + pos * ((to >> (2 - i) * 8 & 0xff) - (from >> (2 - i) * 8 & 0xff))).toString(16)).slice(-2), '#')

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
            <div className="marker" onClick={() => props.onWordSelection(cluster, cluster.mostPopular[0])}>
                <div className="circle" style={{'background-color': getColorBetween(0x3ea5f1, 0xf6778b, (cluster.polarities[cluster.mostPopular[0]] + 1) / 2)}}></div>
                <div>{cluster.mostPopular[0]}</div>
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
