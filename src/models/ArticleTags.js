module.exports = (sequelize, DataType) => {
  const ArticleTags = sequelize.define('Article_Tags', {
    tag: DataType.STRING,
    article: DataType.INTEGER
  }, {
    timestamps: false
  })

  ArticleTags.associate = model => {
    ArticleTags.belongsTo(model.Tags, { foreignKey: 'tag' })
    ArticleTags.belongsTo(model.Articles, { foreignKey: 'article' })
  }

  return ArticleTags
}
