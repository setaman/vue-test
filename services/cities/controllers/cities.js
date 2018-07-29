module.exports.getCities = function(db, req, res) {
    db.collection('cities').indexInformation((err, index) => {
        console.log(index);
    });
    console.log(req.query);
    db.collection('cities').find(
        { name: { $regex: `(${req.query.city})` }}
    )
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