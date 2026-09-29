import React from 'react'
import './nagykep.css'
import type { KepTipus } from '../adatok'
interface NagyKepProps {
    kepem: KepTipus
    leptet: (irany: boolean) => void

}
function NagyKep({ kepem, leptet }: NagyKepProps) {
    if (!kepem) {
        return <div className="nagykepdiv">Nincs megjeleníthető kép</div>
    }
    return (
        <div className="nagykepdiv" >
            <button className="bal" onClick={() => leptet(false)} aria-label="Következő kép"
                type="button">◀</button>
            <div>
                <div className="kep">
                    <img src={kepem.kep} alt={kepem.leiras || 'Kép'} />
                </div>
                <p>{kepem.leiras}</p>
            </div>
            <button className="jobb" onClick={() => leptet(true)} aria-label="Következő kép"
                type="button">▶</button>
        </div>
    )
}

export default NagyKep