// quick and dirty way to get tasks from catalog o _o
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const serverless = require("serverless-http");
const request = require('async-request');
const router = express.Router();

const getTaskNames = (payload) => {
    return payload["spec"]["tasks"].map(task => task["taskRef"]["name"]);
}

const getTasksFromRepo = async (repo, names) => {
    var result = { "apiVersion" : "v1", "kind" : "List", "items" : []};
    for(var i = 0; i < names.length; i++){
        response = await request(repo + "/task/" + names[i] + "/0.1/" + names[i] + ".yaml");
        result["items"].push(nativeObject = YAML.parse(response.body));
    }
    return result;
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
});

router.post('/get/tasks', async (req, res) => {
    const taskNames = getTaskNames(req.body);
    if(!taskNames){
        res.send("error => invalid post request")
    }
    let payload = await getTasksFromRepo("https://raw.githubusercontent.com/tektoncd/catalog/master", taskNames);
    payload["items"].push(req.body);
    res.send(payload);
});
 
app.use('/.netlify/functions/api', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);