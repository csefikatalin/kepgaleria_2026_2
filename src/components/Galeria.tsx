import React from 'react'
import './galeria.css'
import KisKep from './KisKep'
import type { KepTipus } from '../adatok'

interface GaleriaProps {
    kivalaszt: (index: number) => void,
    lista: KepTipus[]
    aktIndex:number
}

function Galeria({ lista, kivalaszt, aktIndex }: GaleriaProps) {
    return (
        <div className='galeria'>
            {
                lista.map((e, i) => {
                    return <KisKep kepem={e} kivalaszt={kivalaszt} index={i} key={i} isAktiv={i === aktIndex} />
                })
            }

        </div>
    )
}

export default Galeria