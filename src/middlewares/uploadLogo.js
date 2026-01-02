const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/logo');
    },
    filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        const filename = `logo-${Date.now()}${ext}`;
        cb(null, filename)
    }
})

const fileFilter =(req, file, cb) =>{
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("only image files are allowed"), false);
    }
}

const uploadLogo = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:2 * 1024 * 1024 // 2mb
    }
})

module.exports = uploadLogo;