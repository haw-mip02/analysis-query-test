import { connect } from 'react-redux'
import MapView from '../components/MapView'
import {
    handleMapLoaded,
    handleWordSelection,
    handleMapZoomChanged,
    handleMapCenterChanged,
    handleSearchRequest,
} from '../actions'


const mapStateToProps = (state) => {
    return {
        center: state.map.center,
        zoom: state.map.zoom,
        clusters: state.clusters,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMapLoad: (map) => {
            dispatch(handleMapLoaded(map))
        },
        onWordSelection: (cluster, word) => {
            dispatch(handleWordSelection(cluster, word))
        },
        onCenterChanged: () => {
            dispatch(handleMapCenterChanged())
        },
        onZoomChanged: () => {
            dispatch(handleMapZoomChanged())
        },
        onIdle: () => {
            dispatch(handleSearchRequest())
        },
    }
}

const Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapView)

export default Map
