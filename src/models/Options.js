module.exports = (sequelize, DataType) => {
  const Options = sequelize.define('Options', {
    option: DataType.STRING,
    value: DataType.STRING
  },{
    timestamps: false
  })

  return Options
}
