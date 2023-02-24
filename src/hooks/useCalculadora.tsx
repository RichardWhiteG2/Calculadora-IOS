//Esto es un Custom Hook: useCalculadora
import { useRef, useState } from "react";

//Para usar en el useRef
enum Operadores{
    sumar, restar,multiplicar,dividir
}

export const useCalculadora = () => {
 
  // PAra mantener el estado
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');


  const ultimaOperacion = useRef<Operadores>()


  const limpiar = ()=>{
    setNumero('0');
    setNumeroAnterior('0');
  }
  const armarNumero = (numeroTexto: string)=>{
    //No aceptar doble punto
    if(numero.includes('.')&& numeroTexto =='.') return;  

    if(numero.startsWith('0') || numero.startsWith('-0')){

      //Punto decima
      if(numeroTexto=='.'){
        setNumero(numero+numeroTexto);
        //Evaluar si es otro cero, y hay un punto
      }else if(numeroTexto =='0' && numero.includes('.')){
        setNumero(numero+numeroTexto);
         //Evaluar si es diferente de cero  no tiene un punto
      }else if(numeroTexto!=='0' && !numero.includes('.')){
        setNumero(numeroTexto);
        //Evitar 000.0
      }else if(numeroTexto=='0' && !numero.includes('.')){
        setNumero(numero);
      }else{
        setNumero(numero+numeroTexto);
      }
    }else{
      setNumero(numero+numeroTexto);
      
    }
  }
  const btnDelete = ()=>{
    let negativo= '';
    let numeroTemp = numero;
    if(numero.includes('-')){
      negativo='-';
      numeroTemp= numero.slice(1);

    }
    if(numeroTemp.length >1){
      setNumero(negativo + numeroTemp.slice(0,-1))
    }else{
      setNumero('0');
    }
  }
 const cambiarNumPorAnterior =() => {
    if(numero.endsWith('.')){
      setNumeroAnterior(numero.slice(0,-1));
    }else{
      setNumeroAnterior(numero);
    }
    setNumero('0');
 }

  const positivoNegativo = ()=>{
    if(numero.includes('-')){
      setNumero(numero.replace('-',''));
    }else{
      setNumero('-' + numero);
    }
  }

  const btnDividir = () =>{
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  }
  const btnSumar = () =>{
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  }
  const btnRestar = () =>{
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  }
  const btnMultiplicar = () =>{
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  }

  const calcular = () =>{
    const num1 = Number( numero);
    const num2 = Number( numeroAnterior);
    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1+num2}`);
        break;
      case Operadores.restar:
        setNumero(`${num2-num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1*num2}`);
        break;
      case Operadores.dividir:
        // operador ternario
        setNumero(num1 !== 0 ? `${num2/num1}` : 'ERROR: Enserio divides entre 0 ?');
        break;
    }
    setNumeroAnterior('0');
  }

  return{
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    armarNumero,
    calcular,
  }
}
