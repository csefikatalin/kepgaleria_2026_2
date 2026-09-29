import { useState } from 'react'

import './App.css'
import NagyKep from './components/NagyKep'
import Galeria from './components/Galeria'
import { KEPLISTA } from './adatok'

function App() {
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

    /* 
    setAktIndex((prevIndex) => {
      if (irany) {
        // Előre léptetés: ciklikusan visszaugrik a 0-ra a végén
        return (prevIndex + 1) % listaHossz
      } else {
        // Vissza léptetés: ciklikusan a tömb végére ugrás, ha 0 alá menne
        return (prevIndex - 1 + listaHossz) % listaHossz
      }
    */
  }
  return (
    <>
      <header><h1>Képgaléria</h1></header>
      <main>

        <NagyKep kepem={KEPLISTA[aktIndex]} leptet={leptet}  />
        <Galeria kivalaszt={kivalaszt} lista={KEPLISTA} aktIndex={aktIndex} />
      </main>
      <footer>Saját név</footer>
    </>
  )
}

export default App
