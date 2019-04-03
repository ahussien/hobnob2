function getUsersEngine(req, db) {
    return db.search({
        index: process.env.ELASTICSEARCH_INDEX
    });
}

export default getUsersEngine;