export default (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment",
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

            modelName: "Comment",
            tableName: "comments",
        }
    );
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};
