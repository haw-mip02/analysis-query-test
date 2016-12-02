import { default as React, PropTypes } from 'react'

import {
    Panel
} from 'react-bootstrap'

const TweetsView = ({ clusters }) => {
    if (!clusters || clusters.length === 0)
        return null
    return (
        <Panel header="Tweets" bsStyle="info">
            {Array(6).fill({name: '@HAW_Hamburg', text: 'Dr. Becke joins the presidium of the ISOC DE. Internet-related standards, education, access, and policy.'}).map((tweet, i) => (
                <div key={i} className="tweet">
                    <a href={'https://twitter.com/' + tweet.name.slice(1)} target="_blank" className="tweet-writer">{tweet.name}:</a>
                    <div>{tweet.text}</div>
                </div>
            ))}
        </Panel>
    )
}


TweetsView.propTypes = {
    clusters: PropTypes.array,
}

export default TweetsView
