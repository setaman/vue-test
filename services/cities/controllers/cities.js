module.exports.getCities = function(db, req, res) {
    db.collection('cities').find({
        'name': req.query.city
    })
        .toArray((err, cities) => {
            if (err) console.error('Some error occurred: ' + err);
            console.log(cities);
            res.send(cities);
        })
};

module.exports.addCities = (db, req, res) => {
    db.collection('cities').insertMany(req.body, (err, result) => {
        if (err) console.error('Some error occurred while inserting document: ' + err);
        res.send(result);
    })
};