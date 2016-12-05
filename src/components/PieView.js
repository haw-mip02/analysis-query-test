import { default as React, PropTypes } from 'react'

import { Chart } from 'react-google-charts'

const colors = ['#f5778a', '#ffa05f', '#7d91b4', '#a37fda', '#3da5f1', '#7fc344', '#e7b730'];

const PieView = ({clusters, onWordSelection }) => {
    if (clusters === null || clusters.length <= 0) return null
    let words = []
    for(let i = 0; i < clusters.length; i++){
        let popWords = Object.keys(clusters[i].words).map(word => [word, clusters[i].words[word], i])
        popWords.sort((a, b) => b[1] - a[1])
        popWords = popWords.slice(0, Math.min(popWords.length, colors.length) + 1)
        words = words.concat(popWords)
    }
    
    words.sort((a, b) => b[1] - a[1])
    words = words.slice(0, Math.min(words.length, colors.length) + 1)
    
    let dataTable = [['Word', 'Mentions']]
    dataTable = dataTable.concat(words.map(word => [word[0], word[1]]))
    
    let chartEvents=[
        {
            eventName : 'select',
            callback  : function(Chart) {
                // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
                if(Chart.chart.getSelection().length > 0){
                    let tableIndex = Chart.chart.getSelection()[0].row
                    let selWord = words[tableIndex][0]
                    let selCluster = clusters[words[tableIndex][2]]
                    onWordSelection(selCluster, selWord)
                }
            }
        }
    ];
    
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
          data={dataTable.slice(0, colors.length + 1)}
          chartEvents={chartEvents}
        />
    )
}


PieView.propTypes = {
    clusters: PropTypes.array,
}

export default PieView
