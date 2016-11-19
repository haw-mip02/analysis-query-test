import { connect } from 'react-redux'
import SidePanelView from '../components/SidePanelView'
import { handleWordSelection } from '../actions'


const mapStateToProps = (state) => {
    return {
        selectedCluster: state.selection.cluster,
        selectedWord: state.selection.word,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWordSelection: (cluster, word) => {
            dispatch(handleWordSelection(cluster, word))
        },
    }
}

const SidePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanelView)

export default SidePanel