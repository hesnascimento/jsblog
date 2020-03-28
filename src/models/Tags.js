module.exports = (sequelize, DataType) => {
  const Tags = sequelize.define('Tags', {
    tag: DataType.STRING,
    enabled: DataType.STRING,
    creationDate : DataType.DATE
  })

  Tags.associate = model => {
    Tags.belongsToMay(model.Articles, { through: 'Article_Tags', foreignKey: 'tag', as: 'articles' })
  }

  return Tags
}
