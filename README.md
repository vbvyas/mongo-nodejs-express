mongo-nodejs-express
====================

An Example sample template for mongo, nodejs, and express RESTful Web api.

    api routes
    ----------
    url               HTTP Method  Operation
    /api/examples      GET          Get an array of all examples
    /api/examples/:id  GET          Get the example with id of :id
    /api/examples      POST         Add a new example, return the example with an id attribute added
    /api/examples/:id  PUT          Update the example with id of :id
    /api/examples/:id  DELETE       Delete the example with id of :id



Example to do a post:

    curl -X POST -d "name=john&image=http://www.image.com/url/1.jpg&video=http://www.video.com/url/1.mp4&quantity=1&size=3" http://localhost:3000/api/examples
