import moment from 'moment'
import {
	DATE_RANGE_EVENT,
	RECEIVE_CLUSTERS,
	MAP_LOADED,
	MAP_ZOOM_CHANGED,
	MAP_CENTER_CHANGED,
    WORD_SELECTION,
} from './actions'
import { INITIAL_CENTER, INITIAL_ZOOM } from './constants'

const initialState = {
	map: {
		node: undefined,
 		center: INITIAL_CENTER,
    	zoom: INITIAL_ZOOM,
    },
    search: {
	    ranges: {
	        'Today': [moment(), moment()],
	        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	        'This Month': [moment().startOf('month'), moment().endOf('month')],
	        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	    },
	    startDate: moment().subtract(1, 'days'),
	    endDate: moment(),
	},
    selection: {
        cluster: undefined,
        word: undefined,
    },
    clusters: [],
}

export default function reducers(state = initialState, action) {
  	switch (action.type) {
    	case DATE_RANGE_EVENT:
      		return Object.assign({}, state, {
        		search: Object.assign({}, state.search, {
        			startDate: action.startDate,
        			endDate: action.endDate,
        		})
      		})
      	case MAP_ZOOM_CHANGED:
    		const node = state.map.node;
    		const nextZoom = node.getZoom();
    		if (nextZoom !== state.map.zoom) { // TODO: in general check how assigns of sub-objects are handled in redux (idiomatic way?)
    			return Object.assign({}, state, { map: Object.assign({}, state.map, {
    				zoom: nextZoom,
    			}) })
    		}
    		return state
    	case MAP_CENTER_CHANGED:
    		const map = state.map.node;
        	const nextCenter = map.getCenter();
        	if (nextCenter.equals(new window.google.maps.LatLng(INITIAL_CENTER))) {
            	return state;
        	}
        	return Object.assign({}, state, { map: Object.assign({}, state.map, {
        		center: nextCenter,
        	}) })
        case RECEIVE_CLUSTERS:
        	return Object.assign({}, state, {
        		clusters: action.clusters,
        	})
        case MAP_LOADED:
        	return Object.assign({}, state, { map: Object.assign({}, state.map, {
        		node: action.node,
        	}) })
        case WORD_SELECTION:
            return Object.assign({}, state, { selection: Object.assign({}, state.selection, {
                cluster: action.cluster,
                word: action.word,
            }) })
    	default:
    	  	return state
  	}
}
