import multer from "multer";

/*
 * Creates a custom function to store the file with custom name
 * and on custom folder
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file) {
      cb(null, "src/assets/uploads");
    } else {
      cb(new Error("Multer error!!"), "");
    }
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(null, Date.now() + "_" + file.originalname);
    } else {
      cb(new Error("Multer error!!"), "");
    }
  },
});

const upload = multer({ storage });

export default upload;
