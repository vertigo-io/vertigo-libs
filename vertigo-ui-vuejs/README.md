# vertigo-ui-vuejs

## Project setup
```
npm install
```

### Compiles and hot-reloads for development (use port 3000)
```
npm run dev
```
For vertigo-ui, add a `vuiDevMode` attribute on `<vu:page>` tag, it will auto reload js components (use default port only).
Won't work fine with https, and you should inactivate your ContentSecurityPolicy, or add script-src `http://localhost:3000/` connect-src `wss://localhost:3000/`

### Compiles and minifies for production
```
npm run build-lib
```

