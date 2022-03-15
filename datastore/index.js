const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    let newPath = path.join(exports.dataDir, `${id}.txt`);
    fs.writeFile(newPath, text, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, text});
      }
    });
  });
};

exports.readAll = (callback) => {
  const todoContainer = [];

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      callback(err);
    } else {
      files.forEach((file) => {
        const todoId = file.slice(0, file.length - 4);
        let todo = { id: todoId, text: todoId};
        todoContainer.push(todo);
      });
      callback(null, todoContainer);
    }
  });

  /*
  iterate over each file in data
  */


  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
