
/*
 * GET users listing.
 */

exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        let query = connection.query('SELECT * FROM product', function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.render('products', { page_title: "Products - Node.js", data: rows });
        });
    });
};

exports.add = function (req, res) {
    res.render('add_product', { page_title: "Add Product - Node.js" });
};

exports.edit = function (req, res) {
    let id = req.params.id;
    req.getConnection(function (err, connection) {
        let query = connection.query('SELECT * FROM product WHERE id = ?', [id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.render('edit_product', { page_title: "Edit Products - Node.js", data: rows });
        });
    });
};

exports.save = function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        let data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };
        let query = connection.query("INSERT INTO product set ? ", data, function (err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);
            res.redirect('/products');
        });
    });
};

exports.save_edit = function (req, res) {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    req.getConnection(function (err, connection) {
        let data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };
        connection.query("UPDATE product set ? WHERE id = ? ", [data, id], function (err, rows) {
            if (err)
                console.log("Error Updating : %s ", err);
            res.redirect('/products');
        });
    });
};

exports.delete_product = function (req, res) {
    let id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM product  WHERE id = ? ", [id], function (err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);
            res.redirect('/products');
        });
    });
};