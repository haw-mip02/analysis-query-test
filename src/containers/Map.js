import { connect } from 'react-redux'
import MapView from '../components/MapView'
import {
	handleMapLoaded,
	handleMapOverlaySelection,
	handleMapZoomChanged,
	handleMapCenterChanged,
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
  		onOverlayLinkClick: () => {
  			dispatch(handleMapOverlaySelection())
  		},
  		onCenterChanged: () => {
  			dispatch(handleMapCenterChanged())
  		},
  		onZoomChanged: () => {
  			dispatch(handleMapZoomChanged())
  		},
  	}
}

const Map = connect(
  	mapStateToProps,
  	mapDispatchToProps
)(MapView)

export default Map