module.exports = (baseConfig, env, config) => {
  config.resolve.extensions.push('.ts', '.tsx')
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/
  return config
}
