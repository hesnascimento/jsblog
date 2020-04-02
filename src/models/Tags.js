module.exports = (sequelize, DataType) => {
  const Tags = sequelize.define('Tags', {
    tag: DataType.STRING,
    enabled: DataType.STRING,
    creationDate : DataType.DATE
  }, {
    timestamps: false
  })

  Tags.associate = model => {
    Tags.belongsToMany(model.Articles, { through: 'Article_Tags', foreignKey: 'tag', as: 'articles' })
  }

  return Tags
}
