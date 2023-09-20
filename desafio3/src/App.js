import './App.css';
import React, {useState} from 'react';

function App() {
  const [descripcion , setDescripcion]= useState('');

  function Cambios(e){
    e.preventDefault()
    console.log(descripcion)
  }

  return (
    <div className="App">
      <h1>Desafio 3</h1>
      <form>
        <label> ingrese descripcion</label>
        <input onChange={(e) => setDescripcion(e.target.value)}/>    
        <br></br>
        <button onClick={Cambios}>Cargar ingrediente</button>
      </form>
    </div>
  );
}

export default App;
