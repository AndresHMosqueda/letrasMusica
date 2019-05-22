import React, {useState, useEffect, Fragment} from 'react'
import Formulario from './componentes/Formulario';
import Cancion from './componentes/Cancion'
import Informacion from './componentes/Informacion'
import axios from 'axios';

function App() {

  //Utilizar useState con 3 states
const [artista, agregarArtista] = useState('');
const [letra, agregarLetra] = useState([]);
const [info, agregarInfo] = useState({});

//Metodo para consultar la API de Letras de canciones
const consultarAPILetra = async busqueda => {
  const {artista, cancion} = busqueda;
  const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

  //consultar la api
  const resultado = await axios(url);

  //almacenar el artista que se busco
  agregarArtista(artista);

  //almacenar la letra en el state
  agregarLetra(resultado.data.lyrics);

  //almacenar la letra en el state
  agregarArtista(artista)

}

//Metodo para consultar la API de Informacion
const consultarAPIInfo = async () => {
  if(artista) {
  const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
  const resultado = await axios(url)

  console.log(resultado);
  agregarInfo(resultado.data.artists[0])
   
  }
}

useEffect(
  () => {
    consultarAPIInfo()
  }, [artista]
)

return (
<Fragment>
  <Formulario 
  consultarAPILetra={consultarAPILetra}
  />

  <div className="container mt-5">
    <div className="row">
      <div className="col-md-6">
       <Informacion
       info={info}
        />
      </div>
      <div className="col-md-6">
        <Cancion letra={letra} />
      </div>
    </div>
  </div>
</Fragment>
)
}

export default App;