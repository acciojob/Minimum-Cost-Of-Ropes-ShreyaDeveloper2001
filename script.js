function calculateMinCost() {
	let ropes = document.getElementById("rope-length").value

	let arr = ropes.split(",");
	let finalValue = 0;
	while(arr.length > 1){
		arr.sort((a,b) => {return(a-b)});
		let value = parseInt (arr.shift());
		let value1 = parseInt(arr.shift());
		let mainValue = value+value1;
		finalValue = finalValue + mainValue;
		arr.push(mainValue);
	}
	let result = document.getElementById("result");
	result.innerText = finalValue;
	return finalValue;
}
 
    

 
     
    