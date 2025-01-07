const { useState, useEffect } = React;
let result;
function App() {
  const [textOperation, setTextOperation] = useState('0');
  const [expression, setExpression] = useState('');
  const [incrementation, setincrementation] = useState(0);
  result=textOperation;
  const cleanExpression = (expr) => {
    return expr
      .replace(/(\+\+|\-\-|\*\*|\/\/)/g, (match) => match[match.length - 1]) 
      .replace(/([+\-*/])\1+/g, '$1') 
      .replace(/(\d)([+\-*/])(\d)/g, (match, p1, p2, p3) => {
        
        if (p2 === '-') {
          return p1 + ' ' + p2 + ' ' + p3;  }
        return match;
      });
  };

  const handleButtonChiffre = (event) => {

    const newText = event.target.value;

    if (newText === '.' && textOperation.includes('.')) {
      return;  
    }
    if (textOperation === '0' && newText=='0') {
      return; 
    }
    if (incrementation == 0) {
      setTextOperation('');
    }
    setTextOperation((prev) => prev + newText);
    setExpression((prev) => prev + newText);
    setincrementation(incrementation + 1);
  };

  const handleButtonOperation = (event) => {
    const newText = event.target.value;
    setTextOperation(newText);
    setExpression((prev) => prev + newText);
  };

  const handleButtonEquals = () => {
    const cleanedExpression = cleanExpression(expression);
    const cleanedExpressionWithoutZero = cleanedExpression.replace(/(^|[^0-9.])0+(?=\d)/g, '$1');
    let calculatedResult = Math.round(eval(cleanedExpressionWithoutZero) * Math.pow(10, 4)) / Math.pow(10, 4);
    setTextOperation(calculatedResult);
    setExpression('');
    setincrementation(0);
  };

  const handleButtonClear = () => {
    setTextOperation('0');
    setExpression('');
    setincrementation(0);
  };
  return (

    <div className="container text-center">
      <div id="operation">{expression}</div>
      <div id="display">{result}</div>
      <div className="grid">
        <button id="clear" type="button" className={`btn btn-danger`} value="AC" onClick={handleButtonClear}>AC</button>
        <button id="divide" type="button" className={`btn btn-secondary`} value="/" onClick={handleButtonOperation}>/</button>
        <button id="multiply" type="button" className={`btn btn-secondary`} value="*" onClick={handleButtonOperation}>*</button>

        <button id="seven" type="button" className={`btn btn-secondary`} value="7" onClick={handleButtonChiffre}>7</button>
        <button id="eight" type="button" className={`btn btn-secondary`} value="8" onClick={handleButtonChiffre}>8</button>
        <button id="nine" type="button" className={`btn btn-secondary`} value="9" onClick={handleButtonChiffre}>9</button>

        <button id="subtract" type="button" className={`btn btn-secondary`} value="-" onClick={handleButtonOperation}>-</button>
        <button id="four" type="button" className={`btn btn-secondary`} value="4" onClick={handleButtonChiffre}>4</button>
        <button id="five" type="button" className={`btn btn-secondary`} value="5" onClick={handleButtonChiffre}>5</button>
        <button id="six" type="button" className={`btn btn-secondary`} value="6" onClick={handleButtonChiffre}>6</button>

        <button id="add" type="button" className={`btn btn-secondary`} value="+" onClick={handleButtonOperation}>+</button>
        <button id="one" type="button" className={`btn btn-secondary`} value="1" onClick={handleButtonChiffre}>1</button>
        <button id="two" type="button" className={`btn btn-secondary`} value="2" onClick={handleButtonChiffre}>2</button>
        <button id="three" type="button" className={`btn btn-secondary`} value="3" onClick={handleButtonChiffre}>3</button>

        <button id="equals" type="button" className={`btn btn-primary`} value="=" onClick={handleButtonEquals}>=</button>
        <button id="zero" type="button" className={`btn btn-secondary`} value="0" onClick={handleButtonChiffre}>0</button>
        <button id="decimal" type="button" className={`btn btn-secondary`} value="." onClick={handleButtonChiffre}
        >.</button>


      </div>

    </div>

  );
}

// Rendre le composant React dans l'élément avec id "root"
ReactDOM.render(<App />, document.getElementById('root'));
