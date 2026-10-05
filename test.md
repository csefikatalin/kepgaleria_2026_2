

## React + Vite Tesztkörnyezet Telepítése és Beállítása

Futtasd az alábbi parancsot a projekt gyökérkönyvtárában lévő terminálban

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

#### Telepített csomagok szerepe:

- vitest: A Vite-ra optimalizált, ultra-gyors tesztfuttató motor.
- jsdom: A böngészős környezetet (DOM) szimulálja Node.js alatt.
- @testing-library/react: Segédkönyvtár a React komponensek kirajzolásához és vizsgálatához.
- @testing-library/jest-dom: Egyedi matcher-ek (pl. .toBeInTheDocument(), .- toHaveClass()).
- @testing-library/user-event: Valódi felhasználói interakciók (pl. kattintás, gépelés) szimulálására szolgál.


### A Vite Konfiguráció Frissítése - vite.config.ts

```bash
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})

```

### Egészítsd ki a package.json fájlt: 

```
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest"
}
```

### Setup Fájl Létrehozása (src/setupTests.ts)

Hozz létre egy setupTests.ts fájlt az src mappában az alábbi tartalommal. Ez tölti be automatikusan az egyedi DOM matcher-eket minden tesztfájl előtt:

```
import '@testing-library/jest-dom'
```

### TypeScript Típusok Beállítása (tsconfig.app.json vagy tsconfig.json)

Ahhoz, hogy az IDE (pl. VS Code) ne húzza alá pirossal a tesztelő metódusokat (mint a toBeInTheDocument vagy a toHaveClass), add hozzá a @testing-library/jest-dom típust a compilerOptions.types tömbhöz:

```
{
  "compilerOptions": {
    "types": [
      "vitest/globals",
      "@testing-library/jest-dom"
    ]
  }
}
```

### Tesztkörnyezet indítása

A Vitest ekkor watch (megfigyelő) módban indul el, és automatikusan lefut, valahányszor tesztfájlt módosítasz vagy hozol létre (.test.tsx vagy .spec.tsx kiterjesztéssel).

```
npm run test
```

## Tesztkód írása

Konvenció, hogy a komponensteszt fájl neve: KomponensNev.test.tsx

Az alapszerkezet 

``` javascript
// Minta adat a teszteléshez
const mockAdat = {
   
}


describe('KomponensNev komponens', () => {
    it('teszteset leírása', () => {
       render (<KomponensNev attr={mockAdat}  />)
        const htmlElem =screen.findByText("szöveg")
        expect(htmlElem).toBeInTheDocument()
    }) 
    
      it('teszteset leírása', () => {
       
    })  


})
```

Szükséges importok:

```
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

```

