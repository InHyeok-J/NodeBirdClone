import Sequelize from "sequelize";
import env from "../configs";

const db = {};

const sequelize = new Sequelize(
    env.sequelizeConfig.database,
    env.sequelizeConfig.username,
    env.sequelizeConfig.password,
    env.sequelizeConfig
);

db.sequelize = sequelize;

export default db;
