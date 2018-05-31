const chalk = require('chalk')
const LOG_LEVEL_INFO = 'INFO'
const LOG_LEVEL_WARNING = 'WARNING'
const LOG_LEVEL_ERROR = 'ERROR'
const LOG_LEVEL_DEBUG = 'DEBUG'

const out = function(level = LOG_LEVEL_INFO, message = '') {
  const dateTime = new Date().toISOString()
  // Line details example from https://stackoverflow.com/a/39684350
  let logLineDetails = ((new Error().stack).split("at ")[3]).trim();
  // Allow shorthand log(message) for debugging.
  if (message === '') {
    message = level
    level = LOG_LEVEL_DEBUG
  }
  // Stringify objects.
  if (typeof message === 'object' && level !== LOG_LEVEL_DEBUG) {
    message = `${JSON.stringify(message)}`
  } else if (typeof message === 'object' && level === LOG_LEVEL_DEBUG) {
    // Debug object messages go on new lines and pretty printed.
    message = `\n${JSON.stringify(message, null, 2)}`
  }
  const logEntry = `${dateTime} ${level} ${logLineDetails} ${message}`
  switch (level) {
    case LOG_LEVEL_INFO:
      console.log(chalk.green(logEntry))
      break
    case LOG_LEVEL_WARNING:
      console.log(chalk.yellow(logEntry))
      break
    case LOG_LEVEL_ERROR:
      console.log(chalk.red(logEntry))
      break
    case LOG_LEVEL_DEBUG:
      console.log(chalk.magenta(logEntry))
      break
  }
}

exports.clog = function(message) {
  out(LOG_LEVEL_DEBUG, message)
}

exports.log = {
  info: function(message) {
    out(LOG_LEVEL_INFO, message)
  },
  warn: function(message) {
    out(LOG_LEVEL_WARNING, message)
  },
  error: function(message) {
    out(LOG_LEVEL_ERROR, message)
  },
  debug: function(message) {
    out(LOG_LEVEL_DEBUG, message)
  }
}
