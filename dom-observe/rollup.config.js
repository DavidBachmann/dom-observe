import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify'

const libraryName = 'DomObserve'

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  typescript({ useTsconfigDeclarationDir: false }),
  commonjs(),
  resolve(),
]

if (isProduction) {
  plugins.push(uglify())
}

export default {
  input: `src/index.ts`,
  output: [
    {
      file: `./dist/dom-observe${isProduction ? '.min' : ''}.umd.js`,
      name: libraryName,
      format: 'umd',
      sourcemap: !isProduction,
      exports: 'named',
      globals: {
        fastdom: 'fastdom',
      }
    },
    {
      file: `./dist/dom-observe${isProduction ? '.min' : ''}.esm.js`,
      format: 'es',
      sourcemap: !isProduction,
      exports: 'named',
    },
  ],
  external: ['fastdom'],
  watch: {
    include: 'src/**',
  },
  plugins,
}
