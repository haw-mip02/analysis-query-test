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
import DetailPanel from '../containers/DetailPanel'
import Pie from '../containers/Pie'
import Tweets from '../containers/Tweets'

// Main Component
export default class App extends Component {
    render() {
        return (
            <div style={{ height: `100%`, width: `100%` }}>
                <PageHeader><center>Twitter Mood Map</center></PageHeader>
                <Grid>
                    <SearchRow />
                    <Row>
                        <Col xs={12} md={12}>
                            <Panel>
                                <Map
                                 containerElement={<div style={{ height: `500px`, width: `100%` }} />}
                                 mapElement={<div style={{ height: `100%` }} />} />
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <DetailPanel />
                        </Col>
                        <Col xs={12} md={4}>
                            <Pie />
                            <Tweets />
                        </Col>
                    </Row>
                 </Grid>
            </div>
        );
    }
}
