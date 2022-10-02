let bgcolor = 'rgba(161, 198, 247, 1)';
let lncolor = 'rgb(47, 128, 237)';
let divid = "oraclechartdiv"
let canid = "oraclechartcanvas"

export function makeOracleChart(X, Y, Xlab) {

    let ctx = document.getElementById(canid).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: X,
            datasets: [{
                label: 'prices distribution',
                backgroundColor: bgcolor,
                borderColor: lncolor,
                data: Y,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        },
    })
    return myChart;
}

export function makeOracleChartPlotly(xValue, yValue, Xlab) {

    var trace1 = {
      x: xValue,
      y: yValue,
      type: 'bar',
      text: Xlab,
      textposition: 'outside',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(161, 198, 247)',
        /*opacity: 0.6,*/
        line: {
          color: lncolor,
          width: 1.5
        }
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Prices distribution',
      barmode: 'stack'
    };

    Plotly.newPlot(divid, data, layout);

}

