import { default as React, PropTypes } from 'react'

import { Chart } from 'react-google-charts'

const colors = ['#f5778a', '#ffa05f', '#7d91b4', '#a37fda', '#3da5f1', '#7fc344', '#e7b730'];

const PieView = ({ selectedCluster, selectedWord }) => {
    if (!selectedWord) return null
    let words = Object.keys(selectedCluster.words).map(word => [word, selectedCluster.words[word]])
    words.sort((a, b) => b[1] - a[1])
    words.unshift(['Word', 'Mentions'])
    return (
        <Chart
          chartType='PieChart'
          options={{
              legend: 'none',
              pieSliceText: 'label',
              colors: colors,
              chartArea: {width: '80%', height: '80%'}
          }}
          width='100%'
          data={words.slice(0, colors.length + 1)}
        />
    )
}


PieView.propTypes = {
    clusters: PropTypes.array,
}

export default PieView
