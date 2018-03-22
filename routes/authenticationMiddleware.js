const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log(req.path);
    if (req.path === "/api/login") {
        next();
    } else {
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        if (typeof bearerHeader != 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            console.log(bearerToken)
            req.token = bearerToken;
        }
        jwt.verify(req.token, 'wadawada', (err, authData) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                console.log(authData + " testeststset")
                //req.token = bearerToken;
                next();
            }
        });
        // const bearerHeader = req.headers['authorization'];
        // if (typeof bearerHeader != 'undefined') {
        //     const bearerToken = bearerHeader.split(' ')[1];
        //     console.log("Pushpa " + bearerToken)
        //     jwt.verify(bearerToken, 'wadawagg', function(err, decoded) {
        //         console.log(decoded.expiresIn) // bar
        //     });

        //     if (bearerToken == null) {
        //         console.log("Bearer Token is null");
        //         res.sendStatus(401);
        //     } else {
        //         req.token = bearerToken;
        //         next();
        //     }
        // } else {
        //     console.log("error");
        //     res.sendStatus(401);
        // }
    }
}