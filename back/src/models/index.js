import Sequelize from "sequelize";
import env from "../configs";
import User from "./user";
import Post from "./post";
import Comment from "./comment";
import Hashtag from "./hashtag";
import Image from "./image";

const db = {};

const sequelize = new Sequelize(
    env.sequelizeConfig.database,
    env.sequelizeConfig.username,
    env.sequelizeConfig.password,
    env.sequelizeConfig
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Comment = Comment(sequelize, Sequelize);
db.Hashtag = Hashtag(sequelize, Sequelize);
db.Image = Image(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
