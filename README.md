

# Development

## Bundle the code

| Command | Effect |
| ------- | ------ |
| `npm run build` | bundle and minify the code in `dist/bundle.js` folder, so it could be copy-pasted into [Espruino Web IDE][webIDE] |
| `npm run build -- --no-minify` | bundle the code without minification |
| `npm run build -- --app` | bundle, minify and package the code as a bangle.js application |
| `npm run build:watch` | watch the `src/` folder and restart build on file change |

# Icons

## Distance

```js
// draw the ruler body
g.setColor(...white)
g.fillPoly([
  x - 14 * s,
  y + 8 * s,
  x - 16 * s,
  y + 7 * s,
  x - 16 * s,
  y - 7 * s,
  x - 14 * s,
  y - 8 * s,
  x + 14 * s,
  y - 8 * s,
  x + 16 * s,
  y - 7 * s,
  x + 16 * s,
  y + 7 * s,
  x + 14 * s,
  y + 8 * s
])
g.setColor(...black)
// clear out center tick
g.fillPoly([
  x - 1 * s,
  y - 6 * s,
  x + 1 * s,
  y - 6 * s,
  x + 1 * s,
  y + 3 * s,
  x,
  y + 5 * s,
  x - 1 * s,
  y + 3 * s
])
// left tick
g.fillPoly([
  x - 7 * s,
  y - 6 * s,
  x - 5 * s,
  y - 6 * s,
  x - 5 * s,
  y - 1 * s,
  x - 6 * s,
  y,
  x - 7 * s,
  y - 1 * s
])
// left wing tick
g.fillPoly([
  x - 13 * s,
  y - 6 * s,
  x - 11 * s,
  y - 6 * s,
  x - 11 * s,
  y - 1 * s,
  x - 12 * s,
  y,
  x - 13 * s,
  y - 1 * s
])
// right tick
g.fillPoly([
  x + 7 * s,
  y - 6 * s,
  x + 5 * s,
  y - 6 * s,
  x + 5 * s,
  y - 1 * s,
  x + 6 * s,
  y,
  x + 7 * s,
  y - 1 * s
])
// right wing tick
g.fillPoly([
  x + 13 * s,
  y - 6 * s,
  x + 11 * s,
  y - 6 * s,
  x + 11 * s,
  y - 1 * s,
  x + 12 * s,
  y,
  x + 13 * s,
  y - 1 * s
])
```

## Incline

```js
// first leg: up and right
g.setColor(...white)
g.fillPoly([x - 15 * s, y + 15 * s, x - 4 * s, y - 8 * s, x - 3 * s, y - 4 * s, x - 13 * s, y + 16 * s])
// second leg: down and right
g.fillPoly([x - 4 * s, y - 8 * s, x + 6 * s, y, x + 7 * s, y + 4 * s, x - 3 * s, y - 4 * s])
// thrid leg: up and right
g.fillPoly([x + 6 * s, y, x + 13 * s, y - 13 * s, x + 14 * s, y - 10 * s, x + 7 * s, y + 4 * s])
// arrow
g.fillPoly([x + 17 * s, y - 16 * s, x + 17 * s, y - 8 * s, x + 8 * s, y - 12 * s])
```

[webIDE]: https://www.espruino.com/ide/