import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import KisKep from './KisKep'

// Minta adat a teszteléshez
const mockKep = {
    kep: 'kepek/kep1.webp',
    leiras: 'Teszt kép leírás'
}

describe('KisKep komponens', () => {
    it('megfelelően megjeleníti a képet a megadott leírással', () => {
        render(<KisKep kepem={mockKep} index={0} kivalaszt={() => { }} isAktiv={true} />)

        // Ellenőrizzük, hogy a kép jelen van-e a DOM-ban az alt szövege alapján
        const imgElem = screen.getByAltText('Teszt kép leírás')
    
        expect(imgElem).toBeInTheDocument()
        expect(imgElem).toHaveAttribute('src', 'kepek/kep1.webp')
    })


    it('Van-e kepdiv class', () => {
        const { container } = render(
            <KisKep kepem={mockKep} index={0} kivalaszt={() => { }} isAktiv={true} />
        )

        // Megkeressük a .kepdiv elemet a DOM-ban
        const divElem = container.querySelector('.kepdiv')

        // Ellenőrizzük, hogy létezik-e a DOM-ban
        expect(divElem).toBeInTheDocument()
    })

    it('hozzáadja az "aktiv" osztályt, ha az isAktiv prop true', () => {
        const { container } = render(
            <KisKep kepem={mockKep} index={0} kivalaszt={() => { }} isAktiv={true} />
        )

        // Ellenőrizzük az 'aktiv' CSS osztály jelenlétét
        const kepDiv = container.querySelector('.kepdiv')
        expect(kepDiv).toHaveClass('aktiv')
    })

    it('kattintásra meghívja a kivalaszt függvényt a megfelelő indexszel', async () => {
        // Létrehozunk egy kamufüggvényt (mock function)
        const mockKivalaszt = vi.fn()
        const user = userEvent.setup()

        const { container } = render(
            <KisKep kepem={mockKep} index={2} kivalaszt={mockKivalaszt} isAktiv={true} />
        )

        // Megkeressük a .kepdiv elemet a DOM-ban
        const divElem = container.querySelector('.kepdiv')
        expect(divElem).not.toBeNull()
        // 4. Rákattintunk
        if (divElem) {
            await user.click(divElem)
        }
        // Ellenőrizzük, hogy a függvény lefutott-e a 2-es indexszel
        expect(mockKivalaszt).toHaveBeenCalledTimes(1)
        expect(mockKivalaszt).toHaveBeenCalledWith(2)
    })


})