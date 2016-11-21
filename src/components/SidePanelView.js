import { default as React, PropTypes } from 'react'

import {
    Panel,
    Table,
} from 'react-bootstrap'

const SidePanelView = ({ clusters }) => {
    if (!clusters || clusters.length === 0)
        return (<Panel header="Cluster Statistics" bsStyle="info">Please run a search query to get more information about the clusters.</Panel>)
    console.log(clusters)
    return (
        <Panel header="Cluster Statistics" bsStyle="info">
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Words</th>
                        <th>Most popular</th>
                    </tr>
                </thead>
                <tbody>
                    {clusters.map((c, i) => (
                        <tr>
                            <td>{i+1}</td>
                            <td>{Object.keys(c.words).length}</td>
                            <td>{c.mostPopular.slice(-1)[0][0]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Panel>
    )
}


SidePanelView.propTypes = {
    clusters: PropTypes.array,
}

export default SidePanelView
