export default (sequelize, DataTypes) => {
    const Image = sequelize.define(
        "Image",
        {
            //id가 기본적으로 들어 있음.
            src: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci", // 한글 저장

            modelName: "Image",
            tableName: "images",
        }
    );
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
