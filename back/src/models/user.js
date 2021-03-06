export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            //id가 기본적으로 들어 있음.
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci", // 한글 저장

            modelName: "User",
            tableName: "users",
        }
    );
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
        db.User.belongsToMany(db.User, {
            through: "Follow",
            as: "Followers",
            foreignKey: "FollowingId",
        });
        db.User.belongsToMany(db.User, {
            through: "Follow",
            as: "Followings",
            foreignKey: "FollowerId",
        });
    };
    return User;
};
