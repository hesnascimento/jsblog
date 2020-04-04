module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    disabled: DataType.BOOLEAN,
    confirmed: DataType.BOOLEAN,
    confirmationCode: DataType.STRING,
    confirmationDate: DataType.DATE,
    creationDate: DataType.DATE,
    displayName: DataType.STRING,
    password: DataType.STRING,
    email: DataType.STRING,
    passwordTries: DataType.INTEGER,
    recovery: DataType.STRING,
    recoveryTries: DataType.INTEGER,
    recoveryDate: DataType.DATE,
    lastLogin: DataType.DATE,
    profileImage: DataType.STRING
  }, {
    timestamps: false
  })

  return Users
}
