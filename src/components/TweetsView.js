import { default as React, PropTypes } from 'react'

import {
    Panel
} from 'react-bootstrap'

let entityTypes = [
    {
        key: 'urls',
        textKey: 'display_url',
        urlKey: 'expanded_url'
    },
    {
        key: 'hashtags',
        textKey: 'text',
        urlKey: 'text'
    },
    {
        key: 'user_mentions',
        textKey: 'screen_name',
        urlKey: 'screen_name'
    },
    {
        key: 'media',
        textKey: 'url',
        urlKey: 'expanded_url'
    },
]
function buildTweetMarkup(tweet) {
    let subs = []
    for (let entityType of entityTypes) {
        if (!tweet.entities[entityType.key]) continue
        for (let entity of tweet.entities[entityType.key]) {
            subs.push({
                indices: entity.indices,
                type: entityType.key,
                text: entity[entityType.textKey],
                url: entity[entityType.urlKey]
            })
        }
    }
    subs.sort((a, b) => a.indices[0] - b.indices[0])
    let lastIndex = 0
    let elements = subs.map(sub => {
        let element
        let index = lastIndex
        lastIndex = sub.indices[1]
        switch (sub.type) {
            case 'url':
                element = <a href={sub.url} target="_blank">{sub.text}</a>
                break;
            case 'hashtag':
                element = <a href={'https://twitter.com/hashtag/Hiring?src=' + sub.text} target="_blank">#{sub.text}</a>
                break;
            case 'mention':
                element = <a href={sub.url} target="_blank">@{sub.text}</a>
                break;
            case 'media':
                element = <a href={sub.url} target="_blank">{sub.text}</a>
                break;
        }
        return (
            <span>
                {tweet.text.substring(index, sub.indices[0])}
                {element}
            </span>
        )
    })
    elements.push((<span>
        {tweet.text.substring(lastIndex, tweet.text.length)}
    </span>))
    return <div>{elements}</div>
}

const TweetsView = ({ selectedCluster }) => {
    if (!selectedCluster) return null
    return (
        <Panel header="Tweets" bsStyle="info">
            {selectedCluster.fetchedTweets.map(tweet => {
                return (
                    <div key={tweet.id} className="tweet">
                        <a href={'https://twitter.com/' + tweet.userUrl} target="_blank" className="tweet-writer">{tweet.user}:</a>
                        {buildTweetMarkup(tweet)}
                    </div>
                )
            })}
        </Panel>
    )
}


TweetsView.propTypes = {
    clusters: PropTypes.array,
}

export default TweetsView
