export default (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            //id가 기본적으로 들어 있음.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4", // 이모티콘을 위해 mb4추가
            collate: "utf8mb4_general_ci", // 한글 저장

            modelName: "Post",
            tableName: "posts",
        }
    );
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, { as: "Retweet" });
        db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    };
    return Post;
};
