import { connect } from 'react-redux'
import PieView from '../components/PieView'


const mapStateToProps = (state) => {
    return {
        selectedCluster: state.selection.cluster,
        selectedWord: state.selection.word,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const Pie = connect(
    mapStateToProps,
    mapDispatchToProps
)(PieView)

export default Pie
