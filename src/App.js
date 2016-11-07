import {
    default as React, 
    Component
} from 'react';

import {
  withGoogleMap,
  GoogleMap,
  OverlayView,
  InfoWindow,
} from 'react-google-maps';

import {
    default as moment,
} from 'moment';

import {
    Grid,
    Row,
    Col,
    Button,
    Glyphicon,
    PageHeader,
    Panel,
} from 'react-bootstrap'

import {
    default as DateRangePicker,
} from 'react-bootstrap-daterangepicker'

// CSS
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';

// Constants
const INITIAL_CENTER = { lat: 53.6798865, lng: 9.3726795 };
const INITIAL_ZOOM = 8;
const REST_URL = "http://hqor.de:16500/analysis/v1.0/"


// Helper
function getPixelPositionOffset(width, height) {
  return { x: -(width / 2), y: -(height / 2) };
}

// Map Component
const MapView = withGoogleMap(props => (
    <GoogleMap
     ref={props.onMapLoad}
     center={props.center}
     zoom={props.zoom}
     onCenterChanged={props.onCenterChanged}
     onZoomChanged={props.onZoomChanged}>
        {props.clusters.map((cluster, index) => (
            // <OverlayView
            //  key={index}
            //  position={cluster.center}
            //  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            //  getPixelPositionOffset={getPixelPositionOffset}>
            //     <ul>
            //         {cluster.words.map((word, index) => (
            //             <li key={index}>{cluster.words[0]}</li>    
            //         ))}
            //     </ul>
            // </OverlayView>
            <InfoWindow
             key={index}
             defaultPosition={cluster.center}>
                <ul>
                    {cluster.words.map((word, index) => (
                        <li key={index}>{cluster.words[0]}</li>    
                    ))}
                </ul>
            </InfoWindow>
        ))}
    </GoogleMap>
));

// Main Component
export default class App extends Component {
    state = {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        clusters: [{ words: ["test"], center: INITIAL_CENTER }],
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    };

    handleMapLoaded = this.handleMapLoaded.bind(this);
    handleSearchClick = this.handleSearchClick.bind(this);
    handleCenterChanged = this.handleCenterChanged.bind(this);
    handleZoomChanged = this.handleZoomChanged.bind(this);
    handleOverlayLinkClick = this.handleOverlayLinkClick.bind(this);
    handleDateRangeEvent = this.handleDateRangeEvent.bind(this);

    handleMapLoaded(map) {
        this._map = map;
    }
    
    handleSearchClick() {
        let ne = this._map.getBounds().getNorthEast();
        let center = this._map.getCenter();
        let lat = center.lat();
        let lng = center.lng();
        let radius = Math.sqrt(Math.pow(lat - ne.lat(), 2) + Math.pow(lng - ne.lng(), 2));
        const state = this.state;
        let t0 = state.startDate.utc().unix();
        let t1 = state.endDate.utc().unix();
        console.log(lat, lng, radius, t0, t1);
    }

    handleCenterChanged() { // center handled explicitly to allow later manipulation
        const map = this._map;
        const nextCenter = map.getCenter();
        if (nextCenter.equals(new window.google.maps.LatLng(INITIAL_CENTER))) {
            return;
        }
        this.setState({
            center: nextCenter,
        });
    }

    handleZoomChanged() { // zoom handled explicitly to allow later manipulation
        const map = this._map;
        const nextZoom = map.getZoom();
        if (nextZoom !== this.state.zoom) {
            this.setState({
                zoom: nextZoom,
            });
        }
    }

    handleOverlayLinkClick() {
        console.log("TEST");
    }

    handleDateRangeEvent(e, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    render() {
        var change = (name, value) => this.setState({ ['time' + name]: value });
        var start = this.state.startDate.format('DD/MM/YYYY');
        var end = this.state.endDate.format('DD/MM/YYYY');
        var label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        return (
            <div style={{ height: `100%`, width: `100%` }}>
                <PageHeader>Analysis Query Testing UI <small>v0.0.1</small></PageHeader>
                <Grid>
                    <Row style={{ paddingBottom: `1em` }}>
                        <Col xs={6} md={4}>
                            <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.state.ranges} onEvent={this.handleDateRangeEvent}>
                                <Button className="selected-date-range-btn" style={{width:'100%'}}>
                                    <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                                    <div className="pull-right">
                                        <span>
                                            {label}
                                        </span>
                                        <span className="caret"></span>
                                    </div>
                                </Button>
                            </DateRangePicker>
                        </Col>
                        <Col xs={6} md={4}>
                            <Button onClick={this.handleSearchClick}>Search</Button>
                        </Col>
                        <Col xs={6} md={4} />
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <Panel>
                                <MapView
                                 onMapLoad={this.handleMapLoaded}
                                 center={this.state.center}
                                 zoom={this.state.zoom}
                                 containerElement={<div style={{ height: `500px`, width: `100%` }} />}
                                 mapElement={<div style={{ height: `100%` }} />}
                                 clusters={this.state.clusters}
                                 onOverlayLinkClick={this.handleOverlayLinkClick}
                                 onCenterChanged={this.handleCenterChanged} 
                                 onZoomChanged={this.handleZoomChanged}/>
                            </Panel>
                        </Col>
                        <Col xs={6} md={4}>
                            <Panel>
                                Test
                            </Panel>
                        </Col>
                     </Row>
                 </Grid>
            </div>
        );
    }
}