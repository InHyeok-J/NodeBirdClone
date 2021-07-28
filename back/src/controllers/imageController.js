import multer from "multer";
import path from "path";
import fs from "fs";

try {
    fs.accessSync("uploads");
} catch (err) {
    console.log("upload폴더가 없으므로 생성");
    fs.mkdirSync("uploads");
}

const multerUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); //확장자 추출 (.png)
            const basename = path.basename(file.originalname, ext); // 이름을 꺼내올 수 있다.
            done(null, basename + "_" + new Date().getTime() + ext); // 파일이름 날짜 .png
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB로 파일 크기 제한
});

export const upload = multerUpload;
