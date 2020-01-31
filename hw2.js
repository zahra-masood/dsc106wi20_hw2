// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
// let store = {
//   orderHistory: []
// };

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

window.addEventListener('DOMContentLoaded', function(){
	let defaultEntry = generateEntries();
});

document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById('Order').disabled = "true";
});

window.onload = function generateRow() {

	// if (localStorage.getItem('topzero')!= null){
	// 	document.getElementById('topzero').innerHTML = window.localStorage.getItem('ding_top');
	// }

	var table = document.getElementById("tbody");
	var cols = generateEntries()[0].length;

	for (var i = 0; i<generateEntries().length; i++) {
		var row = table.insertRow();
		var top2 = document.getElementById('topzero');
		var topding = document.getElementById('topzero').innerHTML;
		var top3 = document.getElementById('topzero2')
		var topwid = document.getElementById('topzero2').innerHTML;

		localStorage.setItem('ding_top', document.getElementById('topzero').innerHTML);
		//document.getElementById('topzero').innerHTML = window.localStorage.getItem('ding_top');

		for (var x =0; x<(generateEntries()[i].length)+1; x++){
			if (x === cols){
				var total_cell = row.insertCell(-1);
				var new_tot = (DINGUS_PRICE*this.generateEntries()[i][2]) + (WIDGET_PRICE*this.generateEntries()[i][3]);
				new_tot = new_tot.toFixed(2);
				total_cell.innerHTML = "$" + new_tot;

				var top4 = document.getElementById('topzero3'); 
				var topsal = document.getElementById('topzero3').innerHTML; 
				top4.innerHTML = (Number(topsal.replace('$','')) + Number(new_tot.replace('$', ''))).toFixed(2);
			} else{
				var cell = row.insertCell();
				cell.innerHTML = this.generateEntries()[i][x];
				top2.innerHTML = Number(topding) + Number(this.generateEntries()[i][2]);
				top3.innerHTML = Number(topwid) + Number(this.generateEntries()[i][3]);

			}
		}
	} 
	//localStorage.clear()
	var retrievedTable = JSON.parse(localStorage.getItem("tables") || "[]");

	var tbody = document.getElementById("tbody");
	var new_row = tbody.insertRow();

	if(retrievedTable){
		for(var j=0; j<retrievedTable.length; j++){
			var new_row = tbody.insertRow();
			for(var y=0; y<5; y++){
				var new_cell = new_row.insertCell();
				new_cell.innerHTML = retrievedTable[j][y];

			}
		}
	}
	
}

//var idnum = (generateEntries().length) +1;
function updateOrder(){
	var table = document.getElementById("tbody");
	row = table.insertRow();
	var idnum = table.rows.length-1;
	//var vars_lst = [];
	var date_today = new Date();
	var dates= String(date_today.getDate()).padStart(2, '0');
	var months = String(date_today.getMonth() + 1).padStart(2, '0'); 
	var years = date_today.getFullYear();
	date_today = months + '/' + dates + '/' + years;

	var dingus_input = document.getElementById('Dingus').value;
	var widget_input = document.getElementById('Widget').value;
	var total_input = '$' + document.getElementById('Tot').value;

	lst = [idnum,date_today, dingus_input, widget_input, total_input];

	for(var i=0; i<lst.length; i++){
		cell = row.insertCell();
		cell.innerHTML = lst[i];
	}

	var top2 = document.getElementById('topzero')
	var topding = document.getElementById('topzero').innerHTML;
	top2.innerHTML = Number(topding) + Number(dingus_input);

	var top3 = document.getElementById('topzero2')
	var topwid = document.getElementById('topzero2').innerHTML;
	top3.innerHTML = Number(topwid) + Number(widget_input);

	var top4 = document.getElementById('topzero3'); 
	var topsal = document.getElementById('topzero3').innerHTML; 
	var toptot = (Number(topsal.replace('$','')) + Number(total_input.replace('$', ''))).toFixed(2);
	
	top4.innerHTML = toptot;


	var local = JSON.parse(localStorage.getItem("tables") || "[]");
	local.push(lst);
	localStorage.setItem("tables", JSON.stringify(local));
	
	if (localStorage.getItem('topzero')!= null){
		document.getElementById('topzero').innerHTML = window.localStorage.getItem('ding_top');
	}

}


function myFunction() {
	var inputOne = document.getElementById('Dingus').value;
	var inputTwo = document.getElementById('Widget').value;
	if (inputOne === 0 && inputTwo == 0) {
		document.getElementById('Order').disabled = true;
	} else {
			document.getElementById('Order').disabled = false;
	}
	var ding_val = document.getElementById('Dingus').value * DINGUS_PRICE;
	document.getElementById('DingTot').value = ding_val.toFixed(2);

	var wid_val = document.getElementById('Widget').value * WIDGET_PRICE;
	document.getElementById("WidTot").value = wid_val.toFixed(2);

	var new_tot = document.getElementById('Tot').value = (ding_val + wid_val).toFixed(2);
	//new_tot = new_tot.toFixed(2);
}


function ClearFields() {
	document.getElementById("Dingus").value = 0;
	document.getElementById("Widget").value = 0;
	document.getElementById('Order').disabled = "true";
	document.getElementById('Tot').value = ZERO_FORMAT;
	document.getElementById('DingPrice').value = DINGUS_PRICE;
	document.getElementById('WidPrice').value = WIDGET_PRICE;
	document.getElementById('DingTot').value = ZERO_FORMAT;
	document.getElementById('WidTot').value = ZERO_FORMAT;
}





