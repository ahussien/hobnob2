function createUserEngine(req, db) {
    return db.index({
        index: process.env.ELASTICSEARCH_INDEX,
        type: 'user',
        body: req.body,
    });
}

export default createUserEngine;