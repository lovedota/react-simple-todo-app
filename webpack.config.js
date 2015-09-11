var path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: ['babel-core/polyfill', './main.tsx'],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'scripts.js'
    },
    module: {
        // preLoaders: [ //Will uncomment when tslint support typescript 1.6
        //     {
        //         test: /\.ts$/,
        //         loader: "tslint"
        //     }
        // ],
        loaders: [
            {
               test: /\.ts(x?)$/,
               loader: 'babel?optional[]=runtime&stage=0!ts-loader',
               exclude: /(node_modules|bower_components)/
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader?includePaths[]='+ path.resolve(__dirname, "./node_modules"))
            },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              loader: 'url-loader?limit=10000'
            },
            {
               test: /bootstrap[^\.]+.js$/,
               loader: 'imports?jQuery=jquery,$=jquery',
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    debug: true,
    devtool: 'inline-source-map'
};
