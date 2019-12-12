<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack Template</h1>
  <p>
    This is the clear basic version of the template for creating projects. It contains several additional instructions on how to configure the additional modules you need. I hope this reduces the likelihood that you will have to create your own webpack configuration.
  </p>
</div>

- [How to install?](#installation)
- [How to use?](#basic-usage)
- [Project Structures](#project-structures)
- [Path Configuration](#config-paths)
- [Import JS Modules](#import-js-files)
- [Add new html page](#create-another-html-page)
- [Import custom fonts](#add-your-fonts)

## Installation:

``` bash
# Download repository:
git clone https://github.com/info-sapphire/webpack-template
```
## Basic Usage:

``` bash
# Go to the project folder:
cd webpack-template

# Install dependencies:
npm install

# Dev server with hot reload at http://localhost:8080/
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

- `src`: source folder
  - `assets`:
    - `scss`: put custom SCSS styles here.
    - `css`: the same as above but CSS here.
    - `fonts`: put your font here.
    - `images`: put your images here.
  - `js`: put your custom scripts here.
  - `static`: folder with extra static assets that will be copied into output folder.
  - `main.js`: your main entry point, you may import all required libs here.

## Config paths:
You may easy reconfigurate path to move all files.
``` js
const PATHS = {
    // path to source dir
    src: path.resolve(__dirname, '..', 'src'),
    // path to output dir
    dist: path.resolve(__dirname, '..', 'dist'),
    // path to configuration dir
    config: path.resolve(__dirname, '..', 'config'),
    // path to static dir (js/scss/ etc ...)
    assets: 'assets'
};
```

### Customize paths:
Change output folders:
``` js
const PATHS = {
    ...
    dist: path.join(__dirname, '../public')
    ...
}
```

## Import js files:
1. Create another js module in `./src/js/` folder
2. Import modules in `./src/main.js` or another entry:

``` js
// import js module for example
import '~/js/example.js'
```
if you want to import files into js modules you need to install `file-loader`

``` bash
npm i --save-dev file-loader
```
#### Added new rules in ./config/webpack.default.config.js:
``` js
module: {
    rules: [
        ...
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ...
    ]
}
```

now you can use it as:

``` js
// import image in as module
import icon from '~/assets/icons/icon.svg';
```

if you want you can set the output folder for the imported images:

``` js
...
    options: {
        name: '[name].[hash].[ext]',
        outputPath: `${PATHS.assets}/images`
    }
...
```

## Create another HTML Page:
1. Сreate a directory in `./src/` for future pages, for ex: `views` then we need to modify the configuration files
2. Edit `./config/path.js`:
``` js
    ...
    // import file system module
    const fs = require('fs');

    // create a path to the folder with pages
    const PAGES_DIR = path.join(PATHS.src, 'views');
    // get all our pages from the folder
    const PAGES = fs.readdirSync(PAGES_DIR).filter(page => page.endsWith('.html'));

    module.exports = {
        ...
        // export new path constant
        PAGES_DIR,
        PAGES
    }
```
3. Edit `./config/webpack.default.config.js`:
``` js
    ...
    // add the constants that we created earlier
    const { ... PAGES_DIR, PAGES } = require('./path');
```
 - Replace this code:
 ``` js
    module.exports = {
        ...
        plugins: [
            ...
            new HtmlWebpackPlugin({
                hash: false,
                template: `${PATHS.src}/index.html`,
                filename: 'index.html',
            })
        ]
    }
 ```
 - on this: 
 ``` js
    module.exports = {
        ...
        plugins: [
            ...
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page}`
            }))
        ]
    }
 ```
4. Now you can create new page in a previously created folder `./src/views/`, for ex: `about.html`
5. Open new page `http://localhost:8080/about.html` (Do not forget to restart the server)

## Add your fonts:
1. Put your font `./src/assets/fonts{your_font}`, for ex: Roboto
2. Register new @font-face in `./src/assets/scss/{your_file}.scss`:
``` scss
// Example with Roboto
@font-face {
  font-family: "Roboto";
  src: url('/assets/fonts/Roboto/Roboto.eot'); /* IE9 Compat Modes */
  src: url('/assets/fonts/Roboto/Roboto.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/assets/fonts/Roboto/Roboto.woff') format('woff'), /* Pretty Modern Browsers */
       url('/assets/fonts/Roboto/Roboto.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('/assets/fonts/Roboto/Roboto.svg') format('svg'); /* Legacy iOS */
}
```
3. Then you can add new variable in `./src/assets/scss/utilities/variables.scss`:
``` scss
$myCustomFont : 'Roboto', Helvetica, sans-serif;
```