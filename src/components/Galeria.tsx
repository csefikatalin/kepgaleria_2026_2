
import './galeria.css'
import KisKep from './KisKep'
import type { KepTipus } from '../adatok'

interface GaleriaProps {
  
    lista: KepTipus[]
    aktIndex:number
}

function Galeria({ lista,  aktIndex }: GaleriaProps) {
    return (
        <div className='galeria'>
            {
                lista.map((e, i) => {
                    return <KisKep kepem={e}  index={i} key={i} isAktiv={i === aktIndex} />
                })
            }

        </div>
    )
}

export default Galeria