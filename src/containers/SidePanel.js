import { connect } from 'react-redux'
import SidePanelView from '../components/SidePanelView'


const mapStateToProps = (state) => {
    return {
        selectedCluster: state.selection.cluster,
        selectedWord: state.selection.word,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const SidePanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanelView)

export default SidePanel