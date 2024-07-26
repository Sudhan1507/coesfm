function handleError(res,error){
    if (res.headersSent) {
        return;
    }
    const statusCode=error.statusCode || 500;
    const errorMessage=error.Message || 'Internal Server Error';
    console.error('Error: ', errorMessage, 'Stack: ', error.stack);
    res.status(statusCode).json({error: errorMessage});
};

export default handleError;

export function handleDuplicateNameError(res, error) {
    if (error.message === 'Duplicate entry for flowName') {
        res.status(409).json({ status: 'failed', message: 'Duplicate entry for flowName' });
    } else {
        res.status(500).json({ status: 'failed', message: 'Internal server error' });
    }
}