

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
