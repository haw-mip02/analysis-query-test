import { connect } from 'react-redux'
import MapView from '../components/MapView'
import {
    handleMapLoaded,
    handleWordSelection,
    handleMapZoomChanged,
    handleMapCenterChanged,
    handleSearchRequest,
} from '../actions'
import {
    IDLE_UPDATE,
    REFRESH_INTERVAL,
} from '../constants'
 
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
            if(!IDLE_UPDATE){
                setTimeout(function(){dispatch(handleSearchRequest())},50)
            }
            setInterval(function(){dispatch(handleSearchRequest())}, REFRESH_INTERVAL)
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
            if(IDLE_UPDATE){
                dispatch(handleSearchRequest())
            }
        },
    }
}

const Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapView)

export default Map
