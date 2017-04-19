# Focus demo application

## Purpose

This application sets to music FOCUS libraries and components.

![image](https://cloud.githubusercontent.com/assets/5349745/11564024/2604cbca-99d7-11e5-9c9c-406d9cabdbbd.png)

![image](https://cloud.githubusercontent.com/assets/5349745/11563963/ea3a509c-99d6-11e5-8810-acc4b4b67493.png)

## How to install it ?

Clone or download project code sources.

Install package dependencies :

```shell
npm i
```

## How to launch it ?

You don't have your own server API, you can use our mock API by launching this command:
```shell
node api
```

The mock API serve fake datas at this URL : `http://localhost:9999/`.

The section below explain how to plug your own API.

To launch webapp server :
```shell
npm start
```

Open you browser and access to this URL : `http://localhost:3000/`

## How to plug my own backend API ?

Edit `config.webpack.js` file and replace `API_ROOT` var by root your root API URL in this section :

```javascript
plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        API_ROOT: '"http://localhost:9999"'
    })
],
```

## API format

API must respect those rules : https://gist.github.com/pierr/86159b709242ea96c71c
