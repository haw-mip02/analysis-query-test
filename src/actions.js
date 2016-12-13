import fetch from 'isomorphic-fetch'

import { POLLING_INTERVAL } from './constants'

export const RECEIVE_CLUSTERS = 'RECEIVE_CLUSTERS'
export function receiveClusters(clusters, popularWords) {
	return {
		type: RECEIVE_CLUSTERS,
		clusters: clusters,
        popularWords: popularWords,
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

export const TIMER_CHANGED = 'TIMER_CHANGED'
export function handleTimerChanged(searchTimer) {
	return {
		type: TIMER_CHANGED,
        searchTimer: searchTimer
	}
}
export function handleTimer(){
    return (dispatch, getState) => {
        const timer = getState().searchTimer;
        if(timer === undefined){
            document.getElementById('ToggleField').innerHTML = "Auto Search: On"
            document.getElementById('ToggleButton').innerHTML = "Turn Off"
            dispatch(handleTimerChanged(setInterval(function(){console.log("Request new Data");dispatch(handleSearchRequest())}, 60000)))
        }else{
            document.getElementById('ToggleField').innerHTML = "Auto Search: Off"
            document.getElementById('ToggleButton').innerHTML = "Turn On"
            clearInterval(timer)
            dispatch(handleTimerChanged(undefined))
        }
    }
}

export function handlePieSelect(index){
    return (dispatch, getState) => {
        const state = getState();
        let selWord = state.pie.popularWords[index][0]
        let selCluster = state.pie.popularWords[index][2]
        dispatch(handleWordSelection(selCluster, selWord))
    }
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
        return poll(`/analysis/v1.0/search/${lat}/${lng}/${radius}/${t0}/${t1}/10`)
        	.then(json => {
        		console.log('Raw Cluster Data', json);
				let tweetPromises = []
				// raw cluster data needs transformation and shouldbe sorted and reduced
				json.clusters.forEach(cluster => {
				    let center = cluster.center;
				    cluster.center = { lat: center[1], lng: center[0] };
				    let sortable = Object.keys(cluster.words).map(key => { return [key, cluster.words[key]] });
				    sortable.sort((a, b) => { return b[1] - a[1] });
				    cluster.mostPopular = sortable[0]

					cluster.fetchedTweets = []
					for (let tweetId in cluster.tweets) {
						tweetPromises.push(fetch(`/tweets/${tweetId}`).then(res => res.json()).then(json => {
							cluster.fetchedTweets.push({
								rank: cluster.tweets[tweetId],
								id: json.id_str,
								user: json.user.name,
								userUrl: json.user.screen_name,
								text: json.text,
								entities: json.entities
							})
						}))
					}
					cluster.fetchedTweets.sort((a, b) => b.rank - a.rank)
				});

                //Prepare Piechart Data
                let words = []
                json.clusters.forEach(cluster => {
                    words = words.concat(Object.keys(cluster.words).map(word => [word,cluster.words[word], cluster]).sort((a, b) => b[1] - a[1]).slice(0, 10))
                })
                words = words.sort((a, b) => b[1] - a[1]).slice(0, 10)

				Promise.all(tweetPromises).then(() => dispatch(receiveClusters(json.clusters, words)))
        		dispatch(receiveClusters(json.clusters, words))
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
