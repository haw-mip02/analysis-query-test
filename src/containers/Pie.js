import { connect } from 'react-redux'
import PieView from '../components/PieView'


const mapStateToProps = (state) => {
    return {
        clusters: state.clusters,
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
