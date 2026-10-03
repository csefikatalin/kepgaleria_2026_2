import { createContext, useContext, useState, type ReactNode } from "react";
import { KEPLISTA, type KepTipus } from "../adatok";



type KepContextValue = {
    aktIndex: number;
    kivalaszt: (index: number) => void;
    leptet: (irany: boolean) => void;
    kepLista: KepTipus[];
};

// 1. Context létrehozása
// Provider nélkül az érték undefined
export const KepContext = createContext<
    KepContextValue | undefined
>(undefined);


// 2. Provider komponens
type KepProviderProps = {
    children: ReactNode;
};

export function KepProvider({ children }: KepProviderProps) {
    const [aktIndex, setAktIndex] = useState(0)
    function kivalaszt(index: number) {
        setAktIndex(index)
    }

    function leptet(irany: boolean) {
        console.log(irany)
        let listaHossz = KEPLISTA.length
        if (listaHossz === 0) return
        let i: number = 0
        if (irany) {
            i = (aktIndex + 1) % listaHossz
        } else {
            i = ((aktIndex - 1) + listaHossz) % listaHossz
        }

        setAktIndex(i)

    }


    return (
        <KepContext.Provider value={{ kivalaszt, leptet, aktIndex, kepLista: KEPLISTA }}>
            {children}
        </KepContext.Provider>
    );
}
/* 3. lépés: Ne feledd el körbeölelni az app komponenst a main.js-ben!
   <KepProvider>
      <App />
    </KepProvider>
*/
/* 4. lépés: felasználás a komponensekben
import './App.css'
import NagyKep from './components/NagyKep'
import Galeria from './components/Galeria'
import {useContext} from 'react'
import { KepContext } from './contexts/KepContext'

function App() {
 const context = useContext(KepContext);

  if (context === undefined) {
    throw new Error(
      'A useKepContext csak KepProvideren belül használható.'
    );
  }
  const { kepLista, aktIndex } = useContext(KepContext);
  return (
    <>
      <header><h1>Képgaléria</h1></header>
      <main>

        <NagyKep kepem={kepLista[aktIndex]} />
        <Galeria lista={kepLista} aktIndex={aktIndex} />
      </main>
      <footer>Saját név</footer>
    </>
  )
}

export default App

*/

/* 5. Saját hook készítése Azért szükséges, hogy az egyes komponensekben ne kelljen mindig leírni a típusellenőrzést.  */
export function useKepContext() {
    const context = useContext(KepContext);

    if (context === undefined) {
        throw new Error(
            'A useKepContext csak KepProvideren belül használható.'
        );
    }

    return context;
}

/* . lépés - a hookot haasználva

import './App.css'
import NagyKep from './components/NagyKep'
import Galeria from './components/Galeria'

import { useKepContext } from './contexts/KepContext'

function App() {
  const { kepLista, aktIndex } = useKepContext();
  return (
    <>
      <header><h1>Képgaléria</h1></header>
      <main>

        <NagyKep kepem={kepLista[aktIndex]} />
        <Galeria lista={kepLista} aktIndex={aktIndex} />
      </main>
      <footer>Saját név</footer>
    </>
  )
}

export default App

*/