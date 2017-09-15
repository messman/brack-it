# brack-it

**brack-it** is a front-end web project built to help users create a single-elimination tournament bracket.

brack-it currently supports these features:
- Matchups between N players at once (math conflicts are resolved with 2-player matchups)

## Development

brack-it uses Webpack. Look there for details.
- ES2015 React TypeScript (.tsx) files are run through `ts-loader` and `babel-loader`. 
- SASS (.scss) files are run through `sass-loader`, `css-loader`, and `style-loader`.

To run, just type `npm run dev`, `npm run dev:w` (watch) or `npm run dev:s` (server).