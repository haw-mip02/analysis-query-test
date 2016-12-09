import { connect } from 'react-redux'
import PieView from '../components/PieView'
import { handlePieSelect } from '../actions'

const mapStateToProps = (state) => {
    return {
        clusters: state.clusters,
        popularWords: state.pie.popularWords,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPieSelection: (index) => {
            dispatch(handlePieSelect(index))
        },
    }
}

const Pie = connect(
    mapStateToProps,
    mapDispatchToProps
)(PieView)

export default Pie
