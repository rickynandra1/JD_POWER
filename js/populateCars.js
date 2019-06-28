function getelement(id){
	return document.getElementById(id);
}

function populateCars(){
	var maker = getelement('vehicleMake');
	var vehicleMake = maker.options[maker.selectedIndex].value;
	var dodge = ["Challenger","Grand Caravan"];
	var ford = ["Escape","Fusion"];
	var chevy = ["Camaro","Beat"];
	if(vehicleMake=="dodge"){
		var sel = document.getElementById('model');
		document.getElementById('model').options.length = 0;
		var fragment = document.createDocumentFragment();
		dodge.forEach(function(dodge, index) {
		    var opt = document.createElement('option');
		    opt.innerHTML = dodge;
		    opt.value = dodge;
		    fragment.appendChild(opt);
		});

		sel.appendChild(fragment);
	}
	else if(vehicleMake=="ford"){
		var sel = document.getElementById('model');
		document.getElementById('model').options.length = 0;
		var fragment = document.createDocumentFragment();
		ford.forEach(function(ford, index) {
		    var opt = document.createElement('option');
		    opt.innerHTML = ford;
		    opt.value = ford;
		    fragment.appendChild(opt);
		});

		sel.appendChild(fragment);
	}
	else if(vehicleMake=="chevy"){
		var sel = document.getElementById('model');
		document.getElementById('model').options.length = 0;
		var fragment = document.createDocumentFragment();
		chevy.forEach(function(chevy, index) {
		    var opt = document.createElement('option');
		    opt.innerHTML = chevy;
		    opt.value = chevy;
		    fragment.appendChild(opt);
		});

		sel.appendChild(fragment);
	}
}

function getFormData(e){
	e.preventDefault();
	
	var tempArr = [];
	var t = [];
	var formArray = document.forms['carAd'].getElementsByClassName("form-control");
	var i = 0;
	var error = false;
	var missingValues = [];
	var errorLists = "";
	var storageLen = 0;
	if(localStorage.getItem("carAd")){
		tempArr = localStorage.getItem("carAd");
		tempArr = JSON.parse(tempArr);
		storageLen = tempArr.length;
	}
	var cont="{";
	var com = ",";
	for(i=0; i<formArray.length; i++){
		if(formArray[i].value!=""){
			if(i==formArray.length-1){
				com = '';
			}
			cont += '"'+formArray[i].getAttribute("name")+'":"'+formArray[i].value+'"'+com;	
			var phoneno = /^\d{10}$/;  
			if(formArray[i].getAttribute("name")=="phoneNumber" && !phoneno.test(formArray[i].value)){
				missingValues.push(formArray[i].getAttribute("name")+" can't be empty");
				errorLists += "<p>Provide valid 10 digit phone number.</p>";
				formArray[i].style.border = "1px solid red";
				alert("provide valid phone number");
			}
		}
		else{
			
			if(formArray[i].getAttribute("name")!="hiddenImg"){
				missingValues.push(formArray[i].getAttribute("name")+" can't be empty");
				errorLists += "<p>"+formArray[i].getAttribute("name")+" can't be empty.</p>";
				formArray[i].style.border = "1px solid red";
			}
		}	
	}
	cont+="}";
	t.push(cont);

	tempArr[storageLen] = JSON.parse(cont);
	
	if(missingValues.length==0){

		localStorage.setItem("carAd",JSON.stringify(tempArr));
		document.getElementById("errorList").style.display = "none";
		document.getElementById("triggerClick").click();
	}
	else{
		// alert("Oop! there are some errors");
		document.getElementById("errorList").style.display = "block";
		document.getElementById("errorList").innerHTML = errorLists;
	}
}

function HandleBrowseClick(input_image,e)
{
	e.preventDefault();
    var fileinput = document.getElementById(input_image);
    fileinput.click();
}


function loadAd(){
	var tempArr =[]; 
	tempArr = localStorage.getItem("carAd");
	
	var fetchJSON = JSON.parse(tempArr);
	var htmlContent = "";
	
	for(i=0;i<fetchJSON.length;i++){

		htmlContent += "<tr>";
		htmlContent += "<td><img src='"+fetchJSON[i].hiddenImg+"' id='image-preview'  style='height:200px; width:200px;' /></td>";
		htmlContent += "<td>"+fetchJSON[i].vehicleMake+" "+fetchJSON[i].model+"<br>Year: "+fetchJSON[i].year+"</td>";
		htmlContent += "<td>"+fetchJSON[i].sellerName+"</td>";
		htmlContent += "<td>"+fetchJSON[i].emailAddress+"</td>";
		htmlContent += "<td>"+fetchJSON[i].phoneNumber+"</td>";
		htmlContent += "<td>"+fetchJSON[i].address+"</td>";
		htmlContent += "<td>"+fetchJSON[i].city+"</td>";
		htmlContent += "<td><a href='./cars.html?"+i+"/"+fetchJSON[i].vehicleMake+"/"+fetchJSON[i].model+"/"+fetchJSON[i].year+"'>View ad</a></td>";
		htmlContent += "</tr>";
	}
	
	document.getElementById("demo").innerHTML = htmlContent;
}

function decodeURL(){
	var getURL = decodeURIComponent(location.search);
	var URLparts = getURL.split("?");
	var queryString = URLparts[1].split("/");
	var id = queryString[0];
	var vehicleMake = queryString[1];
	var model = queryString[2];
	var year = queryString[3];

	var tempArr =[]; 
	tempArr = localStorage.getItem("carAd");
	
	var fetchJSON = JSON.parse(tempArr);
	var htmlContent = "";
	getelement("imgPreview").setAttribute("src",fetchJSON[id].hiddenImg);
	getelement("company").innerHTML = fetchJSON[id].vehicleMake;
	getelement("carname").innerHTML = fetchJSON[id].model;
	getelement("owner").innerHTML = fetchJSON[id].sellerName;
	getelement("Address").innerHTML = fetchJSON[id].address;
	getelement("city").innerHTML = fetchJSON[id].city;
	getelement("phone").innerHTML = fetchJSON[id].phoneNumber;
	getelement("email").innerHTML = fetchJSON[id].emailAddress;
}


function getName(event){
	event.preventDefault();
	var vehicleName = document.getElementById("vehName").value;
	
	var tempArr =[]; 
	tempArr = localStorage.getItem("carAd");
	
	var fetchJSON = JSON.parse(tempArr);
	
	var htmlContent = "";
	if(vehicleName!=""){
		for(i=0;i<fetchJSON.length;i++){

			if(vehicleName===fetchJSON[i].model || vehicleName===fetchJSON[i].vehicleMake || vehicleName==fetchJSON[i].year){

				htmlContent += "<tr>";
				htmlContent += "<td><img src='"+fetchJSON[i].hiddenImg+"' id='image-preview'  style='height:200px; width:200px;' /></td>";
				htmlContent += "<td>"+fetchJSON[i].vehicleMake+" "+fetchJSON[i].model+"<br>Year: "+fetchJSON[i].year+"</td>";
				htmlContent += "<td>"+fetchJSON[i].sellerName+"</td>";
				htmlContent += "<td>"+fetchJSON[i].emailAddress+"</td>";
				htmlContent += "<td>"+fetchJSON[i].phoneNumber+"</td>";
				htmlContent += "<td>"+fetchJSON[i].address+"</td>";
				htmlContent += "<td>"+fetchJSON[i].city+"</td>";
				htmlContent += "<td><a href='./cars.html?"+i+"/"+fetchJSON[i].vehicleMake+"/"+fetchJSON[i].model+"/"+fetchJSON[i].year+"'>View ad</a></td>";
				htmlContent += "</tr>";
			}
		}
		document.getElementById("getResults").style.display = "block";
		document.getElementById("searchResults").innerHTML = htmlContent;	
	}
	else{
		alert("Can't search for empty value");
	}
	
}