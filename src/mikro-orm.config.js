"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var User_1 = require("./entities/User");
var Item_1 = require("./entities/Item");
var path = require("path");
var Control_1 = require("./entities/Control");
var Comment_1 = require("./entities/Comment");
var Message_1 = require("./entities/Message");
exports["default"] = {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    dbName: 'backend',
    type: 'postgresql',
    entities: [User_1.User, Item_1.Item, Control_1.Control, Comment_1.Comment, Message_1.Message],
    debug: !constants_1.__prod__,
    clientUrl: "postgres://postgres:15577800@localhost:5432/backend"
};
