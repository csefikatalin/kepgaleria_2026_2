
import './nagykep.css'
import type { KepTipus } from '../adatok'

import {  useKepContext } from '../contexts/KepContext'
interface NagyKepProps {
    kepem: KepTipus


}
function NagyKep({ kepem }: NagyKepProps) {
     const { leptet } = useKepContext();
   
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