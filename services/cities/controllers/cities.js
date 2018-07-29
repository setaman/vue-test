module.exports.getCities = function(db, req, res) {
    let search_regexp = new RegExp(`(${req.query.city})`, 'i');
    console.log(search_regexp);
    db.collection('cities').find(
        { name: { $regex: search_regexp}}
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