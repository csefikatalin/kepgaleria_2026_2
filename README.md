# Képgaléria 

# React Context és Provider lépésről lépésre

Ebben az útmutatóban egy képgaléria közös állapotát tesszük elérhetővé több komponens számára a React Context API segítségével.

A Contexten keresztül a következő értékeket adjuk tovább:

- a képek listáját;
- az aktuálisan kiválasztott kép indexét;
- a kép kiválasztására szolgáló függvényt;
- az előző vagy következő képre léptető függvényt.

A **Provider** jelentése: „értéket biztosító komponens”. A React Context esetében a Provider határozza meg, hogy a komponensfa egy adott részében milyen Context-érték legyen elérhető.
Dinamikus, közösen módosítható állapot továbbítására használjuk. 

### Context és Provider szerepe

- A **Context** definiálja az adatcsatornát és az átadható érték típusát.
- A **Provider** megadja az adatcsatornán ténylegesen továbbított értéket.
- A **useContext** kiolvassa a legközelebbi Provider értékét.

## Javasolt fájlszerkezet

```text
src/
├── components/
│   ├── Galeria.tsx
│   ├── KisKep.tsx
│   └── NagyKep.tsx
├── contexts/
│   └── KepContext.tsx
├── adatok.ts
├── App.tsx
└── main.tsx
```

Mivel a Provider JSX-kódot tartalmaz, a Context fájl kiterjesztése `.tsx` legyen.

## Context és Provider alapszerkezet


```tsx

type KepContextValue = {
  valt1: number;
  fv1: (p: number) => void;
  valt2: stirng;
  fv2: (t: string) => void;
  
};

export const KepContext = createContext<
  KepContextValue | undefined
>(undefined);

type KepProviderProps = {
  children: ReactNode;
};

export function KepProvider({ children }: KepProviderProps) {
  const [valt1, setValt1] = useState(0);/* itt vannak a statek */
  const [valt2, setValt2] = useState("");/* itt vannak a statek */

  function fv1(index: number) {
    
  }

  

  return (
    <KepContext.Provider
      value={{ valt1,  fv1, valt2, fv2 }}
    >
      {children}
    </KepContext.Provider>
  );
}
```

A Context-providerrel való használata 4 lépésben történik. 

1. Context létrehozzása
2. Provider komponens létrehozása,  A providerben azon válotzók és függvények megadása, amelyet a komponensekben használni akarunk. 
3. A Komponensek körülölelése a providerrel
4. A kontext felhasználása a komponensekben, a providerben definiált változók és függvények elérése. 




## 1. A Context létrehozása
Contextet az alábbi paranccsal hozunk létre. 

```tsx
export const KepContext = createContext();
```

A createContext függvénynek paramétert kell adni, mely a contextet használó provider által elérésre engedélezett változókat és függvényeket tartalmazza. 
Ehhez meg kell határozni ezeknek a típusoát. ld. 2. pont. 

```tsx
export const KepContext = createContext<
  KepContextValue | undefined
>(undefined);
```

A `createContext` második paramétere egy tartalékérték. Ezt a React csak akkor adja vissza, ha egy komponens felett nincs megfelelő Provider.

Az alapérték most `undefined`, mert a képgaléria Contextjét csak `KepProvider` komponensen belül szeretnénk használni. A típusban ezért szerepel a `KepContextValue | undefined` unió.

A Contextet exportáljuk, hogy saját hook nélkül más komponensek is átadhassák a `useContext` számára.

## 2. A Context értéktípusának megadása

Először megadjuk, milyen értékeket fog továbbítani a Context.

```tsx
type KepContextValue = {
  aktIndex: number;
  kivalaszt: (index: number) => void;
  leptet: (irany: boolean) => void;
  kepLista: KepTipus[];
};
```

A `KepContextValue` típus szerint:

- az `aktIndex` egy szám;
- a `kivalaszt` egy számot váró, visszatérési érték nélküli függvény;
- a `leptet` egy logikai értéket váró függvény;
- a `kepLista` `KepTipus` objektumokból álló tömb.

A Provider `value` propjában átadott objektumnak ezt a szerkezetet kell követnie.



## 3. A Provider komponens elkészítése

```tsx
export function KepProvider({ children }: KepProviderProps) {
  const [aktIndex, setAktIndex] = useState(0);

  function kivalaszt(index: number) {
    setAktIndex(index);
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

  return (
    <KepContext.Provider
      value={{
        kivalaszt,
        leptet,
        aktIndex,
        kepLista: KEPLISTA,
      }}
    >
      {children}
    </KepContext.Provider>
  );
}
```

Az `aktIndex` állapot tárolja az aktuális kép sorszámát.

A `kivalaszt` a paraméterként kapott indexre állítja az aktuális indexet.

A `leptet` függvényben:

- az `irany === true` a következő képre léptet;
- az `irany === false` az előző képre léptet;
- a maradékos osztás miatt az utolsó kép után ismét az első következik;
- a `+ listaHossz` megakadályozza, hogy visszalépéskor negatív indexet kapjunk.

A `value` prop tartalmazza mindazokat az értékeket, amelyeket a becsomagolt komponensek elérhetnek.



## 4. A Provider propjának típusa

A Provider becsomagolja azokat a komponenseket, amelyek számára elérhetővé szeretnénk tenni az adatokat.

```tsx
type KepProviderProps = {
  children: ReactNode;
};
```

A `children` a Provider nyitó és záró címkéje közé helyezett tartalmat jelenti.

## 5. A szükséges elemek importálása a komponensekbe

Importáljuk a szükséges React-elemeket és a képek adatait.

```tsx
import {
  createContext,
  useState,
  type ReactNode,
} from 'react';
import { KEPLISTA, type KepTipus } from '../adatok';
```

- A `createContext` hozza létre a Context objektumot.
- A `useState` tárolja az aktuális kép indexét.
- A `ReactNode` segítségével adjuk meg a Provider `children` propjának típusát.
- A `KEPLISTA` tartalmazza a képek adatait.
- A `KepTipus` írja le egy kép objektumának szerkezetét.



## 6. A teljes Context fájl

A `src/contexts/KepContext.tsx` fájl jelenlegi tartalma:

```tsx
import {
  createContext,
  useState,
  type ReactNode,
} from 'react';
import { KEPLISTA, type KepTipus } from '../adatok';

type KepContextValue = {
  aktIndex: number;
  kivalaszt: (index: number) => void;
  leptet: (irany: boolean) => void;
  kepLista: KepTipus[];
};

export const KepContext = createContext<
  KepContextValue | undefined
>(undefined);

type KepProviderProps = {
  children: ReactNode;
};

export function KepProvider({ children }: KepProviderProps) {
  const [aktIndex, setAktIndex] = useState(0);

  function kivalaszt(index: number) {
    setAktIndex(index);
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

  return (
    <KepContext.Provider
      value={{
        kivalaszt,
        leptet,
        aktIndex,
        kepLista: KEPLISTA,
      }}
    >
      {children}
    </KepContext.Provider>
  );
}
```

## 7. Az alkalmazás becsomagolása

A Context értékei csak a Provider leszármazott komponenseiben érhetők el. Ezért a `main.tsx` fájlban csomagoljuk be az `App` komponenst.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { KepProvider } from './contexts/KepContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KepProvider>
      <App />
    </KepProvider>
  </StrictMode>,
);
```

Ettől kezdve az `App` és minden alatta megjelenő komponens hozzáférhet a `KepContext` értékeihez.

## 8. A Context használata saját hook nélkül

A Context értékét a `useContext` hookkal olvashatjuk ki.

```tsx
import { useContext } from 'react';
import './App.css';
import NagyKep from './components/NagyKep';
import Galeria from './components/Galeria';
import { KepContext } from './contexts/KepContext';

function App() {
  const context = useContext(KepContext);

  if (context === undefined) {
    throw new Error(
      'Az App csak KepProvideren belül használható.',
    );
  }

  const { kepLista, aktIndex } = context;

  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>

      <main>
        <NagyKep kepem={kepLista[aktIndex]} />
        <Galeria
          lista={kepLista}
          aktIndex={aktIndex}
        />
      </main>

      <footer>Saját név</footer>
    </>
  );
}

export default App;
```

Az ellenőrzés azért szükséges, mert a Context lehetséges értéke `KepContextValue | undefined`. Az ellenőrzés után a TypeScript már tudja, hogy a `context` biztosan `KepContextValue` típusú.

Fontos, hogy az ellenőrzés után ne hívjuk meg még egyszer a `useContext` hookot:

```tsx
// Hibás
const context = useContext(KepContext);

if (context === undefined) {
  throw new Error('Hiányzik a KepProvider.');
}

const { kepLista, aktIndex } = useContext(KepContext);
```

Helyette az előzőleg ellenőrzött változóból kell kivenni az értékeket:

```tsx
// Helyes
const context = useContext(KepContext);

if (context === undefined) {
  throw new Error('Hiányzik a KepProvider.');
}

const { kepLista, aktIndex } = context;
```

## 9. Saját hook készítése

Ha több komponens használja a Contextet, minden komponensben meg kellene ismételni az `undefined` ellenőrzését. Ezt helyezzük át egy saját hookba.

Először adjuk hozzá a `useContext` hookot a fájl React-importjához:

```tsx
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
```

A következő függvényt a `KepContext.tsx` fájl végére írjuk:

```tsx
export function useKepContext() {
  const context = useContext(KepContext);

  if (context === undefined) {
    throw new Error(
      'A useKepContext csak KepProvideren belül használható.',
    );
  }

  return context;
}
```

A saját hook:

- kiolvassa a Context értékét;
- ellenőrzi a Provider meglétét;
- érthető hibaüzenetet ad, ha hiányzik a Provider;
- garantáltan `KepContextValue` típusú értéket ad vissza.

## 10. A Context használata a saját hookkal

Az `App.tsx` így már rövidebb és könnyebben olvasható:

```tsx
import './App.css';
import NagyKep from './components/NagyKep';
import Galeria from './components/Galeria';
import { useKepContext } from './contexts/KepContext';

function App() {
  const { kepLista, aktIndex } = useKepContext();

  return (
    <>
      <header>
        <h1>Képgaléria</h1>
      </header>

      <main>
        <NagyKep kepem={kepLista[aktIndex]} />
        <Galeria
          lista={kepLista}
          aktIndex={aktIndex}
        />
      </main>

      <footer>Saját név</footer>
    </>
  );
}

export default App;
```

Más komponensekben ugyanígy csak az éppen szükséges értékeket kell kivenni:

```tsx
const { kivalaszt } = useKepContext();
```

```tsx
const { leptet } = useKepContext();
```

## A folyamat összefoglalása

1. Meghatározzuk a Contexten átadott értékek típusát.
2. Létrehozzuk a Contextet a `createContext` segítségével.
3. Elkészítjük a Providert, amely az állapotot és a függvényeket tartalmazza.
4. A Provider `value` propjában átadjuk a közös értékeket.
5. A `main.tsx` fájlban becsomagoljuk az alkalmazást a Providerrel.
6. A komponensekben `useContext` segítségével olvassuk ki az értékeket.
7. Saját hookkal egy helyre szervezzük a Context kiolvasását és ellenőrzését.

## Gyakori hibák

### A Context típusa nem egyezik a Provider értékével

```tsx
// A Context értékét string típusúnak állítja be.
const KepContext = createContext('');

// Ezért itt az objektum típushibát okoz.
<KepContext.Provider value={{ aktIndex }}>
```

A Context generikus típusának és a Provider `value` értékének egyeznie kell.

### Kimarad a Provider

Ha az alkalmazást nem csomagoljuk `KepProvider` komponensbe, a Context értéke `undefined` lesz, a saját hook pedig érthető hibát jelez.

### Nincs ölelgetés

Azt a komponenst kell körbeölelni a providerrel, amelyikben a providerben definiált adatokat fel akarjuk használni. Ennek hináyban nem tudjuk hazsnálni az adatokat.

### Közvetlen destrukturálás

```tsx
const { kivalaszt } = useContext(KepContext);
```

Ez hibás, mert a `useContext` eredménye `undefined` is lehet. Előbb ellenőrizni kell az értéket, vagy a `useKepContext` saját hookot kell használni.

## Hivatalos dokumentáció

- [React: createContext](https://react.dev/reference/react/createContext)
- [React: useContext](https://react.dev/reference/react/useContext)
- [React és TypeScript: useContext](https://react.dev/learn/typescript#usecontext)
