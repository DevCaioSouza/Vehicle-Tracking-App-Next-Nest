'use client';

import { FormEvent } from 'react';

export function NewRoutePage() {
  async function searchPlaces(event: FormEvent) {
    return event.preventDefault();
    const origin = (document.getElementById('origin') as HTMLInputElement)
      .value;
    const destination = (
      document.getElementById('destination') as HTMLInputElement
    ).value;

    //aqui é para encapsular as duas requisições fetch numa mesma promise,
    //assim as duas precisam ser finalizadas antes de proceder a execução do código

    //criamos um array contendo o que seriam os dois const, cada um associado
    //a sua respectiva chamada fetch

    //obs: para não haver conflito de porta, rodamos o next em PORT=3001
    //comando: npm run dev -- -p 3001
    const [originResponse, destinationResponse] = await Promise.all([
      fetch(`http://localhost:3000/places?text=${origin}`),
      fetch(`http://localhost:3000/places?text=${destination}`),
    ]);

    //depois transformamos esses const em objeto json, para finalmente criarmos a variável que será usada
    const [originPlace, destinationPlace] = await Promise.all([
      originResponse.json(),
      destinationResponse.json(),
    ]);

    console.log(originPlace, destinationPlace);
  }

  //obs: onde tiver source, colocar origin no lugar

  //obs: PARAMOS EM 45 MINS

  return (
    <div>
      <h1>New Route Page.</h1>
      <form
        style={{ display: 'flex', flexDirection: 'column', background: 'cyan' }}
        onSubmit={searchPlaces}
      >
        <div>
          <input id="origin" type="text" placeholder="origin" />
        </div>
        <div>
          <input id="destination" type="text" placeholder="destination" />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}

export default NewRoutePage;
