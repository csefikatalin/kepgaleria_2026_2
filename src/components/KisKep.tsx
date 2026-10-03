import type { KepTipus } from '../adatok'
import { useKepContext } from '../contexts/KepContext'
interface KisKepProps {
    kepem: KepTipus,
    index: number,
    isAktiv: boolean
}
function KisKep({ kepem, index, isAktiv }: KisKepProps) {
    const { kivalaszt } = useKepContext();



    return (
        <div className={`kepdiv ${isAktiv ? 'aktiv' : ''}`} onClick={() => kivalaszt(index)}>
            <div className="kep">
                <img src={kepem.kep} alt={kepem.leiras || 'Kép'} />
            </div>

        </div>
    )
}

export default KisKep