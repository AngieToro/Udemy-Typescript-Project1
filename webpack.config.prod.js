const path = require('path');
const cleanPugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.ts',   //el archivo de entrada del proyecto
    output: {
        filename: 'bundle.js',  //guardara todos los js en un archivo 
        path: path.resolve(__dirname, 'dist')   //el path de output en taconfig.json
    },
    devtool: 'none', 
    module: {
        rules: [
            {
                test: /\.ts$/,  //se cargan solamente los archivos .ts -> es una expresion regular
                use: 'ts-loader',   // lo toma del package.json
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']  //agrupara todos los archivos con estas extensiones
    },
    plugins: [
        new cleanPugin.CleanWebpackPlugin()
    ]
};