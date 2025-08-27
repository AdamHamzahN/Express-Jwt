const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');
const { validateMovieCreate, validateMovieUpdate } = require('../middleware/validation');
const multer = require('multer');
const path = require('path');

// Konfigurasi storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder tempat simpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // nama unik
    }
});
const upload = multer({ storage });

router.get('/', movieController.getAll);            // public
router.get('/:id', movieController.getById);        // public
router.post('/', auth, validateMovieCreate, upload.single('picture'), movieController.create); // protected
router.put('/:id', auth, validateMovieUpdate, movieController.update); // protected
router.delete('/:id', auth, movieController.remove); // protected

module.exports = router;

