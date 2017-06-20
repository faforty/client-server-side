const logger = require('../lib/logger')
const project = require('../../project.config')

logger.info('Starting server...')
require('../../server/app').listen(project.port, () => {
  logger.success(`Server is running at http://localhost:${project.port}`)
})
