import { connect } from 'react-redux'
import SearchRowView from '../components/SearchRowView'
import {
    handleDateRangeEvent,
    handleSearchRequest,
    handleFilterChangedEvent,
    handleTimer,
} from '../actions'


const mapStateToProps = (state) => {
    return {
        startDate: state.search.startDate,
        endDate: state.search.endDate,
        ranges: state.search.ranges,
        filterText: state.search.filterText
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
        onFilterChange: (e) => {
            dispatch(handleFilterChangedEvent(e.target.value))
        },
        onTimerClick: () => {
            dispatch(handleTimer())
        },
    }
}

const SearchRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchRowView)

export default SearchRow
