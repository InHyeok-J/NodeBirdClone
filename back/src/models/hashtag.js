export default (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
        "Hashtag",
        {
            //id가 기본적으로 들어 있음.
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4", // 이모티콘을 위해 mb4추가
            collate: "utf8mb4_general_ci", // 한글 저장

            modelName: "Hashtag",
            tableName: "hashtags",
        }
    );
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
    };
    return Hashtag;
};
