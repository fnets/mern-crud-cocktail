#!/usr/bin/mongo

var db = new Mongo().getDB("cocktailsdb");

db.cocktails.remove({});

db.cocktails.insert([
          {id: 1, name:"Bug Juice", strMeasure1: "blah", ingredients:["drugs","buygs","jugs"], instructions:"smash up a bunch of bugs", },
          {id: 2, name:"High School", ingredients:"everything", instructions:"be insecure", strMeasure1: "blah"}
]);
