import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const BuscadorRecetas = () => {
  const [ingrediente, setIngrediente] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [receta, setReceta] = useState(null);

  const agregarIngrediente = (e) => {
    e.preventDefault();
    if (ingrediente) {
      setIngredientes([...ingredientes, { ingrediente, cantidad }]);//preguntar
      setIngrediente('');
      setCantidad('');
    }
  };

  const eliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes.splice(index, 1);
    setIngredientes(nuevosIngredientes);
  };
  
  
  const buscarRecetas = async (e) => {
    e.preventDefault();
    if (ingredientes.length > 0) {
      const ingredientesParaBuscar = ingredientes.map((item) => `${item.cantidad} ${item.ingrediente}`).join(',');

      const appId = '13281002';
      const appKey = 'd0e6300ddf13e5e46b6f561e3c376d6e';
      const idioma = 'es'; 

      try {
        const response = await axios.get(`https://api.edamam.com/search?q=${ingredientesParaBuscar}&app_id=${appId}&app_key=${appKey}&lang=${idioma}`);
        const primeraReceta = response.data.hits[0].recipe; //preguntar
        setReceta(primeraReceta);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Buscador de Recetas</h1>
      <div className='container'>
        <div className='card'>
          <form onSubmit={agregarIngrediente} >
            <div>
              <label>Ingrese los ingredientes:</label>
              <input
                type="text"
                value={ingrediente}
                onChange={(e) => setIngrediente(e.target.value)}
              />
              <label className='form' >Cantidad: </label> 
              <input
               
                type="text"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <button className='botonAgregar' type="submit">Agregar Ingrediente</button>
            </div>
          </form>
          <h3>Ingredientes Seleccionados:</h3>
  <ul>
    {ingredientes.map((item, index) => (
      <li key={index}>
        {item.cantidad} {item.ingrediente}
        <button className='remove' onClick={() => eliminarIngrediente(index)}>
          <img
            src="https://www.freeiconspng.com/thumbs/remove-icon-png/remove-icon-png-24.png"
            alt="Eliminar"
            className='eliminarBoton'
          />
        </button>
      </li>
    ))}
  </ul>

    <form onSubmit={buscarRecetas}>
      <button className='boton' type="submit">Buscar Recetas</button>
    </form>
        </div>
      
      {receta && (
           <div>
        <h2>Receta Encontrada:</h2>
<div className="recipe-card">
<nav>
  <ul className="card-content">
    <li><a href="#"></a></li>
    <div className="card-img">
      <img src={receta.image} alt="Receta" />
    </div>
    <div className="card-info">
      <h5 className="card-title">{receta.label}</h5>
      <p className="card-text">{receta.ingredientLines.map((ingrediente, index) => ( <li key={index}>{ingrediente}</li>
 ))}</p>
    </div>
   
  </ul>
</nav>
</div>
</div>

      )}
       </div>
    </div>
  );
};

export default BuscadorRecetas;
