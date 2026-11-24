# DSFR

We are building our own umd version of the DSFR

## Project Setup

```sh
npm install
```

### Compile and Minify for Production

```sh
npm run build-lib 
```

`build-lib` copies the UMD script (with its source map) and its css into vertigo-ui, in `static/3rdParty/dsfr/vue-dsfr@<version>/`, named by
the vue-dsfr version installed : `head.html` loads this folder (`vueDsfrVersion` param of `vu:head`, its default is the
current version).

### Two versions shipped

As for quasar, two versions of vue-dsfr are shipped : the default one and the previous one, both built with the same
Vertigo DSFR components. After a change of a Vertigo DSFR component, rebuild both :

```sh
npm run build-lib
npm install --no-save @gouvminint/vue-dsfr@<previous version>
npm run build-lib
npm ci
```

When vue-dsfr is upgraded : set the new default `vueDsfrVersion` in `head.html`, keep the folder of the previous
version, delete the older one, and compare the two with `UiUpgradeComparisonTest` (`-Dvue-dsfr.candidate=<new>`).
