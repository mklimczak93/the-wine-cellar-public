const path      = require('path');
const multer    = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
      }
})

const uploadFile = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/JPG" || file.mimetype == "image/png") {
            callback(null, true);
        } else {
            console.log("Only jpg/png files.");
            callback(null, false);
        }
    },
    //file size limit 5MB
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})



module.exports = uploadFile;