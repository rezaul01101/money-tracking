import multer from "multer"
import path from "path"
import fs from "fs"


const uploadPath="./upload"

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const fileExt= path.extname(file.originalname);
        const filename=file.originalname
                        .replace(fileExt,"")
                        .toLocaleLowerCase()
                        .split(" ")
                        .join("-")+"_"+Date.now();
        cb(null,filename+fileExt)

    }
  })
  export const upload = multer({ storage: storage })