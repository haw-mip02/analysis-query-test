import { connect } from 'react-redux'
import SidePanelView from '../components/SidePanelView'


const mapStateToProps = (state) => {
    return {
        clusters: state.clusters,
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