import { default as React, PropTypes } from 'react'

import {
    Panel,
    Table,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'


const SearchRow = ({ selectedCluster, selectedWord }) => {
    if (!selectedWord)
        return (<Panel><ListGroup><ListGroupItem bsStyle="info">Please select a Word after making a query to get more Information.</ListGroupItem></ListGroup></Panel>)
    return (
        <Panel header={`Selected Word: ${selectedWord}`}>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Popularity</th>
                        <th>Sentiment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>{selectedWord}</b></td>
                        <td><b>{selectedCluster.words[selectedWord]}</b></td>
                        <td><b>{selectedCluster.polarities[selectedWord].toFixed(2)}</b></td>
                    </tr>
                    {Object.keys(selectedCluster.connections[selectedWord]).map(other => (
                        <tr key={other}>
                            <td>{other}</td>
                            <td>{selectedCluster.words[other]}</td>
                            <td>{selectedCluster.polarities[other].toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Panel>
    )
}


SearchRow.propTypes = {
    selectedCluster: PropTypes.object,
    selectedWord: PropTypes.string,
}

export default SearchRow