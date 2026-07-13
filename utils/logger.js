const logger = (request, response, next) => {
    console.log(`Request method: ${request.method}`);
    console.log(`Request Url: ${request.url}`);
    console.log('Request body:', request.body);
    console.log('Request cookie:', request.cookies);
    console.log('----------------------------')
    
    next();
}

module.exports = logger;