import { useState } from 'react';
import './App.css';
import InputMask from 'react-input-mask';

function App() {
  const [form, setForm] = useState('');

  function validaForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function calculaIMC(event) {
    event.preventDefault();
    if ((!form.altura && !form.peso) || !form.altura || !form.peso) {
      alert("Por favor complete todos os campos");
    } else {
      const imc = (form.peso / (form.altura * form.altura)).toFixed(1);
      const classificacao = getIMCclassificacao(imc);
      setForm({ ...form, seuIMC: imc, classificacao: classificacao });
    }
  }

  function getIMCclassificacao(imc) {
    if (imc < 16.9) {
      return "Magreza severa";
    } else if (imc >= 16.9 && imc < 18.5) {
      return "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
      return "Peso normal";
    } else if (imc >= 25 && imc < 30) {
      return "Acima do peso";
    } else if (imc >= 30 && imc < 35) {
      return "Obesidade I";
    } else if (imc >= 35 && imc < 40) {
      return "Obesidade II";
    } else if (imc >= 40) {
      return "Obesidade III";
    } else {
      return "";
    }
  }

  return (
    <form onSubmit={calculaIMC}>
      <div className='container'>
        <div className='form'>
          <h1>Calculadora de IMC</h1>
          <div className='input-label'>
            <div className='children-input-label'>
              <label>Altura</label>
              <InputMask mask="9.99" placeholder='Digite a sua altura' onChange={validaForm} name='altura'/>
            </div>
            <div className='children-input-label'>
              <label>Peso</label>
              <InputMask placeholder='Digite o seu peso' onChange={validaForm} name='peso'/>
            </div>
          </div>
          <div className="botao">
            <button type='submit'>Calcular</button>
          </div>
          <div className='children-input-label'>
            <InputMask placeholder='Seu IMC' name='seuIMC' value={form.seuIMC || ''} readOnly />
            {form.classificacao && <p>O seu IMC é {form.seuIMC} <br /> Classificação: {form.classificacao}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;