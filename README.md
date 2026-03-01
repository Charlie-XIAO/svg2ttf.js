# svg2ttf.js

Fix strokes in SVGs using [oslllo-svg-fixer](https://www.npmjs.com/package/oslllo-svg-fixer) then convert them to TTF fonts using [svg2ttf](https://www.npmjs.com/package/svg2ttf).

This is effectively the same thing [lucide](https://github.com/lucide-icons/lucide) does to generate their icon fonts, and I made this script mainly for my convenience, though it may be useful to others as well.

### Usage

```bash
pnpm dlx @charlie-xiao/svg2ttf -i <input-dir> -o <output-dir> -n <font-name>
```

### Options

```
-i, --input <dir>       input SVGs directory
-o, --output <dir>      output fonts directory
-n, --font-name <name>  font name
--trace-resolution [n]  svg fixer trace resolution (default: 800)
-h, --help              display help for command
```

### License

[MIT](LICENSE)
