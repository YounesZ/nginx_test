export const form_elements = ['listmake', 'listmodel', 'listbodytype', 'listbodysize', 'listorigin', 'listyearmin', 'listyearmax', 'carmiles1', 'carmiles2', 'listluxury']
export const form_pointers = get_element_pointers()

export function getChartData(){
    /* Get fields objects */
    var form_data = {}
    for (var i=0; i<form_elements.length; i++) {
        form_data[form_elements[i]] = form_pointers[form_elements[i]].value
    };
    return form_data;
}

export function get_element_pointers() {
    var form_pointers = {};
    for (const s of form_elements) {
        const pointer = document.getElementById(s);
        form_pointers[s] = pointer
    }
    return form_pointers;
}


