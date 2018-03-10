'use strict'

module.exports = function (sequelize, DataTypes) {
  var EventInformationSlugs = sequelize.define('event_information_slugs', {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true
    },
    slug_name: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true
    }
  })

  return EventInformationSlugs
}
