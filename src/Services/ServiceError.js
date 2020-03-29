class ServiceError extends Error {
  constructor(code, error) {
    super(error)
    this.code = code
    this.name = 'ServiceError'
  }
}
