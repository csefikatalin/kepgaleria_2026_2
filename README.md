# Képgaléria

## Használt ismeretek

- komponens
- props
- state
- eseménykezelés
- feltételes értékadás 

## Tesztelés

Tesztkörnyezet telepítése

```
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

Egészítsd ki a package.json fájlt: 

```
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest"
}
```