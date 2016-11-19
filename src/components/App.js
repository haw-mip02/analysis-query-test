import { default as React, Component } from 'react';

import {
    Grid,
    Row,
    Col,
    PageHeader,
    Panel,
} from 'react-bootstrap'

import Map from '../containers/Map'
import SearchRow from '../containers/SearchRow'
import SidePanel from '../containers/SidePanel'

// Main Component
export default class App extends Component {
    render() {
        return (
            <div style={{ height: `100%`, width: `100%` }}>
                <PageHeader><center>Analysis Query Testing UI <small>v0.0.1</small></center></PageHeader>
                <Grid>
                    <SearchRow />
                    <Row>
                        <Col xs={12} md={8}>
                            <Panel>
                                <Map
                                 containerElement={<div style={{ height: `500px`, width: `100%` }} />}
                                 mapElement={<div style={{ height: `100%` }} />} />
                            </Panel>
                        </Col>
                        <Col xs={6} md={4}>
                            <Panel header="Cluster Statistics" bsStyle="info">
                                TODO: some stats about query and cluster
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <SidePanel />
                        </Col>
                    </Row>
                 </Grid>
            </div>
        );
    }
}