import { default as React, PropTypes } from 'react'

// import Pie from 'react-pie'

const colorRange = ['#f5778a', '#ffa05f', '#7d91b4', '#a37fda', '#3da5f1', '#7fc344', '#e7b730'];

const PieView = ({ clusters }) => {
    if (!clusters || clusters.length === 0)
        return null
    return (
        null
    )
}


PieView.propTypes = {
    clusters: PropTypes.array,
}

export default PieView
