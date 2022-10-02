/* eslint-disable no-unused-vars */
import * as Papa from './plugins/papaparse.min.js'

const sample = 'static/assets/js/car_list_all.csv'

Papa.parse(sample, 
       {download: true,
       header: true,
       skipEmptyLines: true,
       complete: function(results){
              console.log(results)
              },
       delimiter:";",
       separator: "\n"
       })

export { sample };