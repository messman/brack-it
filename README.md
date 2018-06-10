# brack-it

**brack-it** is a front-end web project for creating a tournament bracket.
This project is a work-in-progress with a sole contributor. 

brack-it uses React, TypeScript, Redux, and Webpack. See below for more info.

## Major Features

- [x] Support matchups for N players in groups of M players, resolving conflicts with a 2-player matchup
- [x] Show a view of the matchups horizontally with each round as a column
- [x] Show a view of the matchups vertically
- [ ] Support X-elimination brackets (2-, 3-, etc)
- [ ] Support multiple winners
- [ ] Show a true tournament style view suitable for printing, with winner in the center
- [ ] Show an SVG-based circular view, because it looks super cool
- [ ] Optimize the bracket for printing
- [ ] Allow for importing / exporting of data to share with other people

## Project Development Goals

- Keep integration between TypeScript and React as tight as possible; don't settle for the 'any' type.
- Design everything before implementing anything. (I use Sketch.)
- Keep the tournament logic separated.
- Allow everything to be edited after starting the tournament process.
- KISS

## Development

brack-it uses Webpack 3 for code splitting and easy importing. Additionally:
- ES2015 React TypeScript (.tsx) files are run through `ts-loader` and `babel-loader`. 
- SASS (.scss) files are run through `sass-loader`, `css-loader`, and `style-loader`.

As mentioned above, React, Redux, and React-Redux are also used.

## Running

To run, just type `npm run dev`, `npm run dev:w` (watch) or `npm run dev:s` (server).