/* Imports */
import {makeOracleChart, makeOracleChartPlotly} from "./charts.js";
import {getChartData} from "./forms.js";

$(document).ready(function(){

    /* Get HTML elements */
    const custcard = document.querySelector(".rotating-card-container");

    /* FRONT BUTTON */
    $('.rotating-card-container .btn-front').on('click', function() {
        custcard.classList.toggle('is-flipped');

        /* Get form content - from front card */
        let form_data = getChartData()

        /* Feed form content to model - get chart data */
        let req = $.ajax({url: '/oracleinfer', type: 'POST', data: form_data});

        req.done( function(data) {
            /* Make the chart after card flip */
            makeOracleChart(data.X, data.Y, data.Xlab)
        })

    })

    /* BACK BUTTON */
    $('.rotating-card-container .btn-back').on('click', function() {
        custcard.classList.toggle('is-flipped');
    })
})

/*
custButF.addEventListener("click", function (e) {
        custcard.classList.toggle('is-flipped');
    });

custButB.addEventListener("click", function (e) {
        custcard.classList.toggle('is-flipped');
    });
*/
