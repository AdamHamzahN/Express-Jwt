const validateCategoryCreate = (req, res, next) => {
    let { name } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Nama wajib minimal 2 karakter')
    }
    if (errors.length) return res.status(400).json({ errors });

    next()
}

const validateCategoryUpdate = (req, res, next) => {
    let { name } = req.body;
    const errors = [];

    if (name !== undefined && (!name || typeof name !== 'string' || name.trim().length < 2)) {
        errors.push('Nama wajib minimal 2 karakter)')
    }
    if (errors.length) return res.status(400).json({ errors });

    next()
}

const validateMovieCreate = (req, res, next) => {
    let { title, year } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim().length < 2) {
        errors.push('Title wajib minimal 2 karakter')
    }

    if (year !== undefined && (!Number.isInteger(year) || year < 1000 || year > 3000)) {
        errors.push('year harus integer yang valid')
    }

    if (errors.length) return res.status(400).json({ errors });

    next()
}

const validateMovieUpdate = (req, res, next) => {
    let { title, year } = req.body;
    const errors = [];

    if (title !== undefined && (!title || typeof title !== 'string' || title.trim().length < 1)) {
        errors.push('Title wajib minimal 1 karakter')
    }

    if (year !== undefined && (!Number.isInteger(year) || year < 1000 || year > 3000)) {
        errors.push('year harus integer yang valid')
    }

    if (errors.length) return res.status(400).json({ errors });

    next()
}

module.exports = {
    validateCategoryCreate,
    validateCategoryUpdate,
    validateMovieCreate,
    validateMovieUpdate
}