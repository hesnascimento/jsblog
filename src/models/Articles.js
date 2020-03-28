module.exports = (sequelize, DataType) => {
  const Articles = sequelize.define('Articles', {
    id: DataType.INTEGER,
    enabled: DataType.BOOLEAN,
    draft: DataType.BOOLEAN,
    creationDate: DataType.DATE,
    publicationDate: DataType.DATE,
    slug: DataType.STRING,
    title: DataType.STRING,
    body: DataType.STRING,
    author: DataType.INTEGER
  })

  Articles.associate = model => {
    Articles.belongsTo(model.Users, { foreignKey: 'author', as: 'author' })
    Articles.belongsToMany(model.Tags, { through: 'Article_Tags', foreignKey: 'article', as: 'tags' })
  }

  return Articles
}
