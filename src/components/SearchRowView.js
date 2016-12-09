import { default as React, PropTypes } from 'react'

import {
    Row,
    Col,
    Button,
    Glyphicon,
    FormGroup,
    FormControl,
    InputGroup,
} from 'react-bootstrap'

import DateRangePicker from 'react-bootstrap-daterangepicker'

// CSS
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';


const SearchRow = ({ startDate, endDate, ranges, filterText, onDateRangeEvent, onSearchClick, onFilterChange, onSearchClick }) => {
    var start = startDate.format('DD/MM/YYYY');
    var end = endDate.format('DD/MM/YYYY');
    var label = start + ' - ' + end;
    if (start === end) {
        label = start;
    }
    return (
        <Row style={{ paddingBottom: `1em` }}>
            <Col xs={6} md={4}>
                <DateRangePicker startDate={startDate} endDate={endDate} ranges={ranges} onEvent={(e, picker) => onDateRangeEvent(picker.startDate, picker.endDate)}>
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
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Filter" value={filterText} onChange={onFilterChange} />
                        <InputGroup.Button>
                            <Button onClick={onSearchClick}>Search</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col xs={6} md={4}>
                <FormGroup>
                    <div>Auto Search 
                        <Button id='ToggleButton' onClick={onTimerClick} >Off</Button>
                    </div>
                </FormGroup>
            </Col>
        </Row>
    )
}

SearchRow.propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    ranges: PropTypes.object.isRequired,
    filterText: PropTypes.string.isRequired,
    onDateRangeEvent: PropTypes.func,
    onSearchClick: PropTypes.func,
    onFilterChange: PropTypes.func,
    onTimerClick: PropTypes.func,
}

export default SearchRow
