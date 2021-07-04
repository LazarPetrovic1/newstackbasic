"use strict";
exports.__esModule = true;
var User_1 = require("./entities/User");
exports["default"] = {
    dbName: 'my-db-name',
    type: 'postgres',
    entities: [User_1.User]
};
