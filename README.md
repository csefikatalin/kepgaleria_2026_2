# Képgaléria 

## Alapfogalmak

**Komponens (component):** A felhasználói felület egy önálló, újrafelhasználható része. Reactben általában egy függvény, amely JSX-elemeket ad vissza.

**JSX:** JavaScriptben vagy TypeScriptben használható, HTML-hez hasonló szintaxis. Segítségével írjuk le, hogy mit jelenítsen meg egy komponens.

**Props:** A szülőkomponenstől a gyermekkomponensnek átadott, csak olvasható adatok. A gyermek a kapott propsokat nem módosítja közvetlenül.

**State (állapot):** Egy komponens időben változó, belső adata. Az állapot módosításakor a React újrarendereli az érintett komponenst.

**useState hook:** Beépített React hook, amellyel funkcionális komponensben állapotot hozhatunk létre. Visszaadja az aktuális értéket és az értéket módosító függvényt.

## Használt ismeretek

- komponens
- props
- state
- eseménykezelés
- feltételes értékadás 

A képgaléria közös állapotát az `App` komponens kezeli, az adatokat és a függvényeket pedig propsokon keresztül adja át a gyermekkomponenseknek.

Ez az úgynevezett **állapot felemelése** (*lifting state up*): a közös állapotot abban a legközelebbi szülőkomponensben helyezzük el, amelynek gyermekei használják vagy módosítják azt.

## Mit fog kezelni az App komponens?

Az `App.tsx` felelőssége:

- az aktuális kép indexének tárolása;
- egy kép kiválasztása;
- léptetés az előző vagy következő képre;
- a képlista továbbadása a `Galeria` komponensnek;
- az aktuális kép továbbadása a `NagyKep` komponensnek;
- a kiválasztó függvény továbbadása a `Galeria`, majd a `KisKep` komponensnek.

A program állapotát meghatározza: 

- kepLista
- aktIndex, amiben tároljuk, hoyg a lista hányadik elemét kell éppen megjeleníteni. 

## Javasolt fájlszerkezet

```text
src/
├── components/
│   ├── Galeria.tsx
│   ├── KisKep.tsx
│   └── NagyKep.tsx
├── adatok.ts
├── App.css
├── App.tsx
└── main.tsx
```


## Az adatáramlás

```text
App
├── aktIndex állapot
├── kivalaszt() függvény
├── leptet() függvény
│
├── NagyKep
│   └── kepem prop
│
└── Galeria
    ├── lista prop
    ├── aktIndex prop
    └── kivalaszt prop
        │
        └── KisKep
            ├── kepem prop
            ├── index prop
            ├── isAktiv prop
            └── kivalaszt prop
```

Az adatok lefelé haladnak a komponensfában. Amikor a felhasználó egy kis képre kattint, a gyermekkomponens meghívja a szülőtől kapott `kivalaszt` függvényt. A függvény az `App` állapotát módosítja, ezért a felület újrarenderelődik.

## 1. Az adatok és a képtípus

Az útmutató azt feltételezi, hogy az `adatok.ts` fájlban található a `KepTipus` és a `KEPLISTA`.

```ts
export type KepTipus = {
  kep: string;
  leiras: string;
};

export const KEPLISTA: KepTipus[] = [
  {
    kep: '/kepek/hegyek.jpg',
    leiras: 'Hegyek naplementében',
  },
  {
    kep: '/kepek/to.jpg',
    leiras: 'Erdei tó',
  },
  {
    kep: '/kepek/varos.jpg',
    leiras: 'Éjszakai város',
  },
];
```

A saját projektben természetesen a már meglévő képlista használható.

## 2. Az állapot létrehozása az App komponensben

Az aktuális kép indexét az `App` komponensben tároljuk.

```tsx
import { useState } from 'react';
import { KEPLISTA } from './adatok';

function App() {
  const [aktIndex, setAktIndex] = useState(0);

  // ...
}
```

Az `aktIndex` az aktuálisan kiválasztott kép tömbindexe. A `setAktIndex` segítségével módosíthatjuk ezt az értéket.

## 3. A kép kiválasztása

A `kivalaszt` függvény megkapja a kiválasztott kép indexét, ellenőrzi azt, majd módosítja az állapotot.

```tsx
function kivalaszt(index: number) {
  const ervenyesIndex =
    index >= 0 && index < KEPLISTA.length;

  if (ervenyesIndex) {
    setAktIndex(index);
  }
}
```

Ezt a függvényt később propson keresztül továbbadjuk a `Galeria`, majd a `KisKep` komponensnek.

## 4. Léptetés a képek között

```tsx
function leptet(irany: boolean) {
  const listaHossz = KEPLISTA.length;

  if (listaHossz === 0) {
    return;
  }

  setAktIndex((elozoIndex) => {
    if (irany) {
      return (elozoIndex + 1) % listaHossz;
    }

    return (elozoIndex - 1 + listaHossz) % listaHossz;
  });
}
```

Az `irany` jelentése:

- `true`: következő kép;
- `false`: előző kép.

A funkcionális állapotfrissítésben az `elozoIndex` mindig az állapot legfrissebb értékét tartalmazza.

## 5. Az App komponens elkészítése

Az `App` kiszámítja az aktuális képet, majd propsokon keresztül átadja a szükséges adatokat a közvetlen gyermekkomponenseinek.

```tsx
import { useState } from 'react';
import './App.css';
import { KEPLISTA } from './adatok';
import Galeria from './components/Galeria';
import NagyKep from './components/NagyKep';

function App() {
  const [aktIndex, setAktIndex] = useState(0);

  function kivalaszt(index: number) {
    const ervenyesIndex =
      index >= 0 && index < KEPLISTA.length;

    if (ervenyesIndex) {
      setAktIndex(index);
    }
  }

  function leptet(irany: boolean) {
    const listaHossz = KEPLISTA.length;

    if (listaHossz === 0) {
      return;
    }

    setAktIndex((elozoIndex) => {
      if (irany) {
        return (elozoIndex + 1) % listaHossz;
      }

      return (elozoIndex - 1 + listaHossz) % listaHossz;
    });
  }

  const aktualisKep = KEPLISTA[aktIndex];
  const nincsKep = KEPLISTA.length === 0;

  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>

      <main>
        {aktualisKep ? (
          <NagyKep kepem={aktualisKep} />
        ) : (
          <p>Nincs megjeleníthető kép.</p>
        )}

        <nav aria-label="Képek léptetése">
          <button
            type="button"
            onClick={() => leptet(false)}
            disabled={nincsKep}
            aria-label="Előző kép"
          >
            Előző
          </button>

          <button
            type="button"
            onClick={() => leptet(true)}
            disabled={nincsKep}
            aria-label="Következő kép"
          >
            Következő
          </button>
        </nav>

        <Galeria
          lista={KEPLISTA}
          aktIndex={aktIndex}
          kivalaszt={kivalaszt}
        />
      </main>

      <footer>Saját név</footer>
    </>
  );
}

export default App;
```

Az `App` háromféle propot ad át a `Galeria` komponensnek:

```tsx
<Galeria
  lista={KEPLISTA}
  aktIndex={aktIndex}
  kivalaszt={kivalaszt}
/>
```

- A `lista` adatot tartalmaz.
- Az `aktIndex` állapotértéket tartalmaz.
- A `kivalaszt` egy függvény, amellyel a gyermekkomponens kezdeményezheti az `App` állapotának módosítását.

## 6. A NagyKep komponens

A `NagyKep` megkapja az aktuális kép objektumát, és megjeleníti azt. Nem tárol saját galériaállapotot.

```tsx
import type { KepTipus } from '../adatok';

type NagyKepProps = {
  kepem: KepTipus;
};

function NagyKep({ kepem }: NagyKepProps) {
  return (
    <figure className="nagykep">
      <img
        src={kepem.kep}
        alt={kepem.leiras || 'Kép'}
      />
      {kepem.leiras && (
        <figcaption>{kepem.leiras}</figcaption>
      )}
    </figure>
  );
}

export default NagyKep;
```

Az aktuális kép az `App` komponensből érkezik:

```tsx
<NagyKep kepem={aktualisKep} />
```

## 7. A Galeria komponens

A `Galeria` három propot kap az `App` komponenstől, majd minden képhez létrehoz egy `KisKep` komponenst.

```tsx
import type { KepTipus } from '../adatok';
import KisKep from './KisKep';

type GaleriaProps = {
  lista: KepTipus[];
  aktIndex: number;
  kivalaszt: (index: number) => void;
};

function Galeria({
  lista,
  aktIndex,
  kivalaszt,
}: GaleriaProps) {
  return (
    <section
      className="galeria"
      aria-label="Választható képek"
    >
      {lista.map((kep, index) => (
        <KisKep
          key={kep.kep}
          kepem={kep}
          index={index}
          isAktiv={index === aktIndex}
          kivalaszt={kivalaszt}
        />
      ))}
    </section>
  );
}

export default Galeria;
```

A `Galeria` nem módosítja közvetlenül az `App` állapotát. A kapott `kivalaszt` függvényt továbbadja a `KisKep` komponenseknek.

Ez a props továbbadása:

```text
App --kivalaszt--> Galeria --kivalaszt--> KisKep
```

## 8. A KisKep komponens

A `KisKep` már nem használja a `useContext` hookot. A `kivalaszt` függvényt propson keresztül kapja meg.

```tsx
import type { KepTipus } from '../adatok';

type KisKepProps = {
  kepem: KepTipus;
  index: number;
  isAktiv: boolean;
  kivalaszt: (index: number) => void;
};

function KisKep({
  kepem,
  index,
  isAktiv,
  kivalaszt,
}: KisKepProps) {
  return (
    <button
      type="button"
      className={`kepdiv ${isAktiv ? 'aktiv' : ''}`}
      onClick={() => kivalaszt(index)}
      aria-pressed={isAktiv}
    >
      <span className="kep">
        <img
          src={kepem.kep}
          alt={kepem.leiras || 'Kép'}
        />
      </span>
    </button>
  );
}

export default KisKep;
```

Kattintáskor a következő folyamat történik:

1. A `KisKep` meghívja a kapott `kivalaszt(index)` függvényt.
2. A függvény valójában az `App` komponensben van definiálva.
3. A függvény meghívja a `setAktIndex` állapotfrissítőt.
4. Az `App` újrarenderelődik az új indexszel.
5. A `NagyKep` megkapja az újonnan kiválasztott képet.
6. A megfelelő `KisKep` `isAktiv` propja `true` lesz.

## 9. A main.tsx fájl

Context és Provider nélkül az `App` komponenst közvetlenül rendereljük.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Nincs szükség erre a csomagolásra:

```tsx
// Ebben a változatban nincs rá szükség.
<KepProvider>
  <App />
</KepProvider>
```

## Miért jó ez a megoldás?

- Az állapot helye egyértelmű: az `App` komponensben található.
- Az adatáramlás könnyen követhető.
- A komponensek a propsok alapján önállóan is tesztelhetők.
- Nincs szükség Contextre, Providerre vagy saját contexthookra.
- Kisebb komponensfa esetén kevesebb rejtett függőség keletkezik.

## Mi a megoldás hátránya?

A `Galeria` nem használja közvetlenül a `kivalaszt` függvényt, mégis át kell vennie és tovább kell adnia a `KisKep` komponensnek:

```tsx
function Galeria({ kivalaszt }: GaleriaProps) {
  return (
    <KisKep kivalaszt={kivalaszt} />
  );
}
```

Ezt nevezzük **props drillingnek**, vagyis a propsok több komponensszinten keresztüli továbbadásának.

Ebben a kis alkalmazásban ez még jól áttekinthető. Context használata akkor válhat indokolttá, ha ugyanazokat az értékeket sok, egymástól távoli komponens használja, és több köztes komponens csak továbbadná a propsokat.



## Gyakori hibák

### A gyermekkomponensben ismét létrehozzuk az állapotot

Az `aktIndex` állapotnak csak egyetlen közös forrása legyen:

```tsx
// App.tsx
const [aktIndex, setAktIndex] = useState(0);
```

A `Galeria` és a `KisKep` ezt propsként kapja. Ha több komponensben külön `aktIndex` állapotot hoznánk létre, azok nem lennének automatikusan szinkronban.

### Meghívjuk a függvényt propsátadás közben

```tsx
// Hibás: renderelés közben azonnal meghívja.
<KisKep kivalaszt={kivalaszt(index)} />
```

```tsx
// Helyes: magát a függvényt adjuk tovább.
<KisKep kivalaszt={kivalaszt} />
```

A `KisKep` kattintáskor hívja meg a függvényt az indexszel:

```tsx
onClick={() => kivalaszt(index)}
```

### Hiányzik egy prop típusa

A függvényprop típusát is meg kell adni:

```tsx
type KisKepProps = {
  kivalaszt: (index: number) => void;
};
```

## Összefoglalás

Az `App` az állapot tulajdonosa. A gyermekkomponensek propsokon keresztül kapják meg az adatokat és azokat a függvényeket, amelyekkel kezdeményezhetik az állapot módosítását.

```text
állapot és függvények az App komponensben
                    │
                    ▼
           propsok továbbadása
                    │
                    ▼
             gyermekkomponensek
                    │
                    ▼
       eseménykor függvény meghívása
                    │
                    ▼
          az App állapota módosul
```

Kisebb és közepes mélységű komponensfánál ez legyen az alapértelmezett megoldás. Contextet akkor érdemes bevezetni, amikor a propsok továbbadása már több, csak közvetítő szerepet betöltő komponensen haladna keresztül.

