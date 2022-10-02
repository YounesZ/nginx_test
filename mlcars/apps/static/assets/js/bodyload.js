import {form_elements, form_pointers} from "./forms.js";

const sample = '/static/data/car_list_all.csv'

/* ===--- Make stats counters ---=== */
if (document.getElementById('state1')) {
  const countUp = new CountUp('state1', document.getElementById("state1").getAttribute("countTo"));
  if (!countUp.error) {
    countUp.start();
  } else {
    console.error(countUp.error);
  }
}
if (document.getElementById('state2')) {
  const countUp1 = new CountUp('state2', document.getElementById("state2").getAttribute("countTo"));
  if (!countUp1.error) {
    countUp1.start();
  } else {
    console.error(countUp1.error);
  }
}
if (document.getElementById('state3')) {
  const countUp2 = new CountUp('state3', document.getElementById("state3").getAttribute("countTo"));
  if (!countUp2.error) {
    countUp2.start();
  } else {
    console.error(countUp2.error);
  };
}


/* ===--- Load car info file ---=== */
let output = new Promise(function(resolve, reject) {
  Papa.parse(sample, {
      download: true,
      header: true,
      complete: function(response) {
          resolve(response.data);
      },
      error: function(err) {
          reject(err);
      }
  });
});
(async () => {
  const users = await output
  refreshCarInfos(users)
})()


/* ===--- Fill car info form ---=== */
function refreshCarInfos(data) {
  let allMakes = new Array();
  let allModels = new Array();
  let allBodyTypes = new Array();
  let allBodySizes = new Array();
  let allOrigins = new Array();
  const lenD = data.length
  for (var i=0; i<lenD; i++) {
    allMakes.push(data[i].Make);
    allModels.push(data[i].Model);
    allBodyTypes.push(data[i].BodyType)
    allBodySizes.push(data[i].BodySize)
    allOrigins.push(data[i].Origin)
  }

  // Populate buttons
  const ls_lists = [unique(allMakes), unique(allModels), unique(allBodyTypes), unique(allBodySizes), unique(allOrigins)];
  for (let i = 0; i < ls_lists.length; i++) {
      populateByVariableList(ls_lists[i], form_pointers[form_elements[i]])
  }
  // Populate years
  for (var i=ls_lists.length; i<ls_lists.length+2; i++) {
      populateYears(form_pointers[form_elements[i]])
  }

}

// ====------  POPULATE LISTS  ------==== //
// Car makes, models, body types, body sizes, origins
function populateByVariableList(elems, pointer) {
    for (var i=0; i<elems.length; i++) {
      var opt_par=document.createElement('option');
      opt_par.innerHTML = '<option value='+String(i)+'>'+elems[i]+'</option>';
      pointer.appendChild(opt_par);
  }
}
// Year min, max
function populateYears(pointer) {
    for (var i=2023;i>=2000;i--){
        var opt_par=document.createElement('option')
        opt_par.innerHTML = '<option value='+String(i)+'>'+String(i)+'</option>';
        pointer.appendChild(opt_par)
    }
}


// =======------  HELPER FUNCTIONS  ------======= //
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function unique(arr) {
  return arr.filter(onlyUnique);
}

