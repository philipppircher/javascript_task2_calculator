var str = "0";                    // concatened label text to a string, example value "99" in label "inputValue"
var concatString = "";            // concatened every input value or operator to a string and print it in label "calculation"
var values = [];                  // first input, second input, calculated result -> max to lenght 3 
var ops = [];                     // collect up to 2 elements of operations (needed to behave like windows calculator)
var result = 0;                   // saves new result value after evaluation
var isWaitingforValue = true;     // use this to prevent multiply use of op button calculations
var isCalcLabelSetToResult = false;
var hasAnyCalc = false;

function checkChar(value){
  if (typeof value === 'number'){
      getNumber(value);
  } else if (typeof value === 'string' && !isWaitingforValue){
      getChar(value);

      if (isCalcLabelSetToResult){
          document.getElementById("calculation").innerHTML = result + " " + ops[0];
          isCalcLabelSetToResult = false;
      }
  }
}

function getNumber(num){
  console.log(num);
  refreshInputValueLabel(num);
}

function refreshInputValueLabel(value){ 

  // First condition sets string to value instead of concatenade them together
  // Second condition prevents "00" case in inputLabel string
  if (isWaitingforValue || document.getElementById("inputValue").innerHTML == "0"){
      str = value;
      isWaitingforValue = false;
  } else{
      str += "" + value;
  }

  document.getElementById("inputValue").innerHTML = str;
}

function getChar(operator){

    if(hasAnyCalc)
        concatString = result + " " + ops[0];
  ops.push(operator);
  isWaitingforValue = true;
  values.push( document.getElementById("inputValue").innerHTML);

  // Here is the calculationLabel error (concat 2 values to on number after first "=" operation)

  // zahl anhängen

  /*if(operator != "=" && values.length == 0)
    concatString += operator + " " + document.getElementById("inputValue").innerHTML;
  else
  {*/
    concatString += document.getElementById("inputValue").innerHTML + " " + operator;
  //}
    
    /*if (operator != "="){
      concatString += document.getElementById("inputValue").innerHTML + " " + ops[ops.length - 1];
  } */

  document.getElementById("calculation").innerHTML = concatString;
  isCalcLabelSetToResult = false;
  if (values.length == 2){
      executeOperation();
  } 
}

function executeOperation(){
  switch (ops[0]) {

      case '+': 
          values.push(eval(parseFloat(values[0]) + parseFloat(values[1])));
          break;
      case '-': 
          values.push(eval(parseFloat(values[0]) - parseFloat(values[1])));
          break;                        
      case '*':
          values.push(eval(parseFloat(values[0]) * parseFloat(values[1])));
          break;
      case '/': 
          values.push(eval(parseFloat(values[0]) / parseFloat(values[1])));
          break;                       
      case '%': 
          values.push(eval(parseFloat(values[0]) % parseFloat(values[1])));
          break;
      case '=':
          values[2] = result;     // TODO fix bug here..
          concatString = result;
          isCalcLabelSetToResult = true;
          break;
      case 'c':
          resetAll();
          break;
      }

      ops.shift();    

      hasAnyCalc = true;
      result = values[2];
      values = [result];  // Set values back to 1 element with result value
      refreshInputValueLabel(result);
      // Fix a bug -> if "=" selected, a new value can be entered in inputLabel
      if (ops[0] != "="){
             // implemented only refresh inputValue label yet..
          isWaitingforValue = true;
      }
}