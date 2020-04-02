class ServiceError extends Error {
  constructor(code, error) {
    super()
    this.code = code
    this.name = 'ServiceError'
    this.message = error
  }
}

module.exports = ServiceError
