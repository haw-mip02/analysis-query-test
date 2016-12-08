import fetch from 'isomorphic-fetch'

import { POLLING_INTERVAL } from './constants'

export const RECEIVE_CLUSTERS = 'RECEIVE_CLUSTERS'
export function receiveClusters(clusters) {
	return {
		type: RECEIVE_CLUSTERS,
		clusters: clusters,
	}
}

export const MAP_LOADED = 'MAP_LOADED'
export function handleMapLoaded(node) {
    return {
    	type: MAP_LOADED,
    	node: node,
    }
}

export const DATE_RANGE_EVENT = 'DATE_RANGE_EVENT'
export function handleDateRangeEvent(startDate, endDate) {
	return {
		type: DATE_RANGE_EVENT,
		startDate: startDate,
		endDate: endDate,
	}
}

export const FILTER_CHANGED = 'FILTER_CHANGED'
export function handleFilterChangedEvent(text) {
	return {
		type: FILTER_CHANGED,
		filterText: text
	}
}

export const MAP_ZOOM_CHANGED = 'MAP_ZOOM_CHANGED'
export function handleMapZoomChanged() {
	return {
		type: MAP_ZOOM_CHANGED,
	}
}

export const MAP_CENTER_CHANGED = 'MAP_CENTER_CHANGED'
export function handleMapCenterChanged() {
	return {
		type: MAP_CENTER_CHANGED,
	}
}


let pollURL = ''
let pollTimer
function poll(url) {
	pollURL = url
	if (pollTimer) {
		pollTimer = clearInterval(pollTimer)
	}
	async function tryFetch(res, url) {
		let response = await fetch(url)
		let json = await response.json()
		if (json.status !== 'DONE') return
		// A different url is now being polled. Discard current poll
		if (pollURL !== url) return
		pollTimer = clearInterval(pollTimer)
		res(json)
	}
	return new Promise(res => {
		pollTimer = setInterval(() => {
			// A different url is now being polled. Discard current poll
			if (!pollTimer || pollURL !== url) return
			tryFetch(res, url)
		}, POLLING_INTERVAL)
		tryFetch(res, url)
	})
}

export function handleSearchRequest() {
  	return (dispatch, getState) => {
  		const state = getState();
  		const node = state.map.node;
  		let ne = node.getBounds().getNorthEast();
        let center = node.getCenter();
        let lat = center.lat();
        let lng = center.lng();
        let radius = Math.sqrt(Math.pow(lat - ne.lat(), 2) + Math.pow(lng - ne.lng(), 2));
        const search = state.search
        let t0 = search.startDate.utc().unix();
        let t1 = search.endDate.utc().unix();
        return poll(`/analysis/v1.0/search/${lat}/${lng}/${radius}/${t0}/${t1}`)
        	.then(json => {
        		console.log('Raw Cluster Data', json);
				// raw cluster data needs transformation and shouldbe sorted and reduced
				json.clusters.forEach(cluster => {
				    let center = cluster.center;
				    cluster.center = { lat: center[1], lng: center[0] };
				    let sortable = Object.keys(cluster.words).map(key => { return [key, cluster.words[key]] });
				    sortable.sort((a, b) => { return b[1] - a[1] });
				    cluster.mostPopular = sortable[0]
				});
        		dispatch(receiveClusters(json.clusters))
        	}).catch(err => console.log(err))
  	}
}

export const WORD_SELECTION = 'WORD_SELECTION'
export function handleWordSelection(cluster, word) {
    return {
        type: WORD_SELECTION,
        cluster: cluster,
        word: word,
    }
}
