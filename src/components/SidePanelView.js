import { default as React, PropTypes } from 'react'

import {
    Panel,
    Table,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'

import BubbleChart from 'react-bubble-chart';
// necessary css for bubblechart
import '../../node_modules/react-bubble-chart/src/style.css';


const colorLegend = [
    {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, 
    "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
    {color: "#f0f0f0", text: 'Neutral'},
    "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", 
    {color: "#08306b", text: 'Positive', textColor: "#ffffff"},
];

const tooltipProps = [
    { css: 'symbol', prop: '_id' }, 
    { css: 'value',  prop: 'value', display: 'Last Value' },
    { css: 'change', prop: 'colorValue', display: 'Change' }
];


const SidePanelView = ({ selectedCluster, selectedWord, onWordSelection }) => {
    if (!selectedWord)
        return (<Panel header="Selected Word: None"  bsStyle="warning">Please select a Word after making a query to get more Information.</Panel>)
    var data = Object.keys(selectedCluster.connections[selectedWord]).map(word => ({
        _id: word,
        value: selectedCluster.words[word],
        colorValue: selectedCluster.polarities[word],
        selected: false,
    }));
    data.push({
        _id: selectedWord,
        value: selectedCluster.words[selectedWord],
        colorValue: selectedCluster.polarities[selectedWord],
        selected: true,
    });
    console.log(data)
    return (
        <Panel header={`Selected Word: ${selectedWord}`} bsStyle="success">
            <BubbleChart
             className="side-panel-chart"
             colorLegend={colorLegend}
             data={data}
             selectedColor="#737373"
             selectedTextColor="#d9d9d9"
             fixedDomain={{min: -1, max: 1}}
             onClick={(data) => onWordSelection(selectedCluster, data._id)}
             legend={true}
             //tooltip={true}
             //tooltipProps={tooltipProps}
             //tooltipFunc={tooltipFunc}
            />
        </Panel>
    )
}


SidePanelView.propTypes = {
    selectedCluster: PropTypes.object,
    selectedWord: PropTypes.string,
}

export default SidePanelView
