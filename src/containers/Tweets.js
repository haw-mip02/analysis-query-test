import { connect } from 'react-redux'
import TweetsView from '../components/TweetsView'


const mapStateToProps = (state) => {
    return {
        selectedCluster: state.selection.cluster,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const Tweets = connect(
    mapStateToProps,
    mapDispatchToProps
)(TweetsView)

export default Tweets
