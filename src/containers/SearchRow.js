import { connect } from 'react-redux'
import SearchRowView from '../components/SearchRowView'
import {
    handleDateRangeEvent,
    handleSearchRequest,
} from '../actions'


const mapStateToProps = (state) => {
    return {
        startDate: state.search.startDate,
        endDate: state.search.endDate,
        ranges: state.search.ranges,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDateRangeEvent: (startDate, endDate) => {
            dispatch(handleDateRangeEvent(startDate, endDate))
        },
        onSearchClick: () => {
            dispatch(handleSearchRequest())
        },
    }
}

const SearchRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchRowView)

export default SearchRow