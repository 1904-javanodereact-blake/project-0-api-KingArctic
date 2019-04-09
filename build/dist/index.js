"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var app = express_1.default();
app.use(function (req, res, next) {
    console.log("Request made url: " + req.url + " and method: " + req.method);
    next();
});
app.use(bodyParser.json());
app.get('/test', function (req, res) {
    console.log('Req Processed!');
    res.send('Here is the response data!');
});
app.post('/test', function (req, res) {
    console.log('Posted to test');
    var body = req.body;
    console.log(body);
    res.send('Saved test call');
});
app.get('/hello', function (req, res) {
    res.send('Hello! How are you? Are you having a good day today?');
});
app.listen(8080);
//# sourceMappingURL=index.js.map