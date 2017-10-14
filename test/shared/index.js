// TODO: place OK, ERROR, IT logic here

function searchCache(moduleName, callback) {
  var mod = require.resolve(moduleName);
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    (function traverse(mod) {
      mod.children.forEach(function(child) {
        traverse(child);
      });
      callback(mod);
    }(mod));
  }
};

exports.purgeCache = function purgeCache(moduleName) {
  searchCache(moduleName, function(mod) {
    delete require.cache[mod.id];
  });

  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
};
