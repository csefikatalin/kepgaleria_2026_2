import React from 'react'
import type { KepTipus } from '../adatok'
interface KisKepProps {
    kepem: KepTipus,
    index: number,
    kivalaszt: (index:number) => void,
    isAktiv:boolean
}
function KisKep({ kepem, index, kivalaszt, isAktiv }: KisKepProps) {
    return (
        <div className={`kepdiv ${isAktiv ? 'aktiv' : ''}`}  onClick={() => kivalaszt(index)}>
            <div className="kep">
                <img src={kepem.kep} alt={kepem.leiras || 'Kép'}/>
            </div>

        </div>
    )
}

export default KisKep