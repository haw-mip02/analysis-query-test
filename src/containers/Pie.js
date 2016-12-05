import { connect } from 'react-redux'
import PieView from '../components/PieView'
import { handleWordSelection } from '../actions'

const mapStateToProps = (state) => {
    return {
        clusters: state.clusters,
        //selectedCluster: state.selection.cluster,
        //selectedWord: state.selection.word,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWordSelection: (cluster, word) => {
            dispatch(handleWordSelection(cluster, word))
        },
    }
}

const Pie = connect(
    mapStateToProps,
    mapDispatchToProps
)(PieView)

export default Pie
