import { css } from 'docz-plugin-css';

module.exports = {
  title: 'GrowingIO Design System',
  typescript: true,
  src: '..',
  menu: [
    'Overview',
    'Getting Started',
    'Design Language',
    'Components',
    'Changelog'
  ],
  plugins: [
    css({ preprocessor: 'postcss' }),
    css({ 
      preprocessor: 'less',
      loaderOpts: { javascriptEnabled: true } 
    })
  ]
}
