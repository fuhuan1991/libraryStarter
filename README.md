# Library starter

```
This is a library starter I built in my former company. This project is designed to allow many developers to work on the same react component library at the same time. The starter is packaged with rollup.js. There are scripts that can analyze codes in ./src and can create a configration file for rollup.js automatically. In this way, each developer can add a few componts into the project with 3rd party library, like antd, without worrying about the package configration.

Technology stack: react, typescript, rollup.js, antd, jest
```

## Getting Started

```
npm install
or
yarn install
```

## Development

### Scripts

- **npm start**
start a local development environment(localhost:9000).
The default component show up here is Playground with which you can test other components.

- **npm run compile_bundle**
Use rollup.js to packup.
All the code will be packed up in a single bundle stored in ./build.
There are mutipule file formats, like es, cjs...
All style files will be packed up in a .css file.

- **npm run compile_lib**
Use rollup.js to packup.
Each component in ./src/components/ will be packed up separately and stored in /lib.
The default file format is es.
There will be a .css file for each component.


- **npm run compile**
run compile_bundle and compile_lib

