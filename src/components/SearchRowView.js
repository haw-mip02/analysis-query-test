import { default as React, PropTypes } from 'react'

import {
    Row,
    Col,
    Button,
    Glyphicon,
    FormGroup,
    FormControl
} from 'react-bootstrap'

import DateRangePicker from 'react-bootstrap-daterangepicker'

// CSS
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';


const SearchRow = ({ startDate, endDate, ranges, onDateRangeEvent, onSearchClick }) => {
    var start = startDate.format('DD/MM/YYYY');
    var end = endDate.format('DD/MM/YYYY');
    var label = start + ' - ' + end;
    if (start === end) {
        label = start;
    }
    return (
        <Row style={{ paddingBottom: `1em` }}>
            <Col xs={4} md={2}>
                <DateRangePicker startDate={startDate} endDate={endDate} ranges={ranges} onEvent={(e, picker) => onDateRangeEvent(picker.startDate, picker.endDate)}>
                    <Button className="selected-date-range-btn" style={{width:'100%'}}>
                        <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                        <div className="pull-right">
                            <span>
                                {start}
                            </span>
                            <span className="caret"></span>
                        </div>
                    </Button>
                </DateRangePicker>
            </Col>
            <Col xs={3} md={3}>
                <FormGroup>
                    <FormControl type="text" placeholder="Filter" />
                </FormGroup>
            </Col>
        </Row>
    )
}

SearchRow.propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    ranges: PropTypes.object.isRequired,
    onDateRangeEvent: PropTypes.func,
    onSearchClick: PropTypes.func
}

export default SearchRow
