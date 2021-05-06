import React from 'react';
import "./Timer.css";
import  { useState, useEffect,useRef } from 'react';



const Timer = () => {

  const [segundos, setSegundos] = useState("segundos");
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState('Contador');

  const myRef = useRef(null);

  
  function agregaSegundos() {
    // `current` apunta al elemento de entrada de texto montado
    let ref = myRef.current.value
    setSegundos(ref)
}

useEffect(() => {
  let intervalo = null;
  if (activo && tipo === 'Contador') {
    intervalo = setInterval(() => {
      setSegundos(segundos => segundos + 1);
    }, 1000);
  }
  if (activo && tipo === 'Cuenta Regresiva') {
    intervalo = setInterval(() => {
      setSegundos(segundos => segundos - 1);
    }, 1000);
  }
  if (!activo && segundos !== 0 && tipo === 'Contador') {
    clearInterval(intervalo);
  }
  if (segundos === 0 && tipo === 'Cuenta Regresiva') {
    reset();
    clearInterval(intervalo);
  }

  return () => clearInterval(intervalo);
}, [activo, segundos, tipo]);



  function toggle() {
    setActivo(!activo); //(true)
  }

  function reset() {
    setSegundos(0);
    setActivo(false);
  }

  function cambioTipo() {
    if(tipo === 'Contador') setTipo('Cuenta Regresiva')
    if(tipo === 'Cuenta Regresiva') setTipo('Contador')
}

  return (
    <div className="app">

      <div className="time">
        {segundos}s
    </div>
      <div className="row">

        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`}
        onClick={toggle}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>

        <button className="button" onclick={reset}>
          Reset
      </button>
      </div>



      <button className="button" onclick={cambioTipo}>
        {tipo}x
      </button>
      {tipo === 'Cuenta Regresiva' && <input type="number" ref={myRef} placeholder="Ingresa Segundos" autoComplete="off" />}
    </div>
  )
};

export default Timer;
