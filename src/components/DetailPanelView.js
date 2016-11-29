import { default as React, PropTypes } from 'react'

import {
    Panel,
} from 'react-bootstrap'

import BubbleChart from 'react-bubble-chart';
// necessary css for bubblechart
import '../../node_modules/react-bubble-chart/src/style.css';


const colorLegend = [
    {color: "#f6778b", text: 'Negative', textColor: "#ffffff"},
    "#f2778c", "#e87b91", "#de7d97", "#d2809d", "#c683a5", "#bb86ac", "#ae89b3",
    {color: "#a28cba", text: ''},
    "#968fc1", "#8993c8", "#7d96cf", "#7298d5", "#649cdc", "#579ee3", "#4ba3ea",
    {color: "#3ea5f1", text: 'Positive', textColor: "#ffffff"},
];

const tooltipProps = [
    { css: 'symbol', prop: '_id' },
    { css: 'value',  prop: 'value', display: 'Last Value' },
    { css: 'change', prop: 'colorValue', display: 'Change' }
];


const DetailPanelView = ({ selectedCluster, selectedWord, onWordSelection }) => {
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


DetailPanelView.propTypes = {
    selectedCluster: PropTypes.object,
    selectedWord: PropTypes.string,
}

export default DetailPanelView
