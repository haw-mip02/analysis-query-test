import { connect } from 'react-redux'
import DetailPanelView from '../components/DetailPanelView'
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

const DetailPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPanelView)

export default DetailPanel