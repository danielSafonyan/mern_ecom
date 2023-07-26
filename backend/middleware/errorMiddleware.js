function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message 

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404
        message = `Resource not found.`
    }

    res.status(statusCode).json({
        statusCode, 
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
     })
}

export { notFound, errorHandler }