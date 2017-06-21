# client-server-side
Isomorphic application on Vue.js

## Requirements
* node `^7.0.0`
* yarn `^0.23.0` or npm `^4.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can create a new project based on `client-server-side` by doing the following:

```bash
$ git clone https://github.com/faforty/client-server-side.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn run build  # Compile your application (or `npm run build`)
$ yarn start  # Start the development server (or `npm start`)
```

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`              |Run dev server with HotModuleReplacement|
|`start`            |Serves your app at `localhost:9000`|
|`build`            |Builds the application to ./dist|
|`build:client`     |Builds the application of client|
|`build:server`     |Builds the application of server|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|
