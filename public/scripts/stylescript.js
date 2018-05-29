/* global $ */
$(document).ready(function(){
     const selectMonth = document.getElementById("selectMonth");
    const hmonth = document.getElementById("hmonth");
    const selectState = document.getElementById("selectState");
    const hstate = document.getElementById("hstate");
    const selectpicker = document.getElementsByClassName("selectpicker");

// $('.selectMonth .bootstrap-select .filter-option ').text(hmonth);
//Check the selected attribute for the real select

$('.selectMonth').val(hmonth.textContent);
$('.selectMonth').selectpicker('refresh');

// $('#selectState .bootstrap-select .filter-option ').text(hstate);
//Check the selected attribute for the real select
$('#selectState').val(hstate.textContent);
$('#selectState').selectpicker('refresh');

});

    

// document.addEventListener('DOMContentLoaded', function() {
//       const selectMonth = document.getElementById("selectMonth");
//     const hmonth = document.getElementById("hmonth");
//     const selectState = document.getElementById("selectState");
//     const hstate = document.getElementById("hstate");
//     const selectpicker = document.getElementsByClassName("selectpicker");

// function selectSt(elem){
    
//     $('.selectpicker').selectpicker('val', elem);
   
//     // for(var i=0; i< selectState.length; i++ ){
//     //     if(se    l.options[i].value == elem.textContent ){
//     //       sel.selectedIndex = i;
//     //       break;
//     //     }
       
//     // }
// }
// function refresh(){
//     selectpicker.selectpicker("refresh");
// }
//     selectSt(selectMonth, hmonth);
//     refresh();
//     selectSt(selectState, hstate);
// }, false);