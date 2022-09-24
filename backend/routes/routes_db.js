const client$ = require('../connectdb');

client$.connect();

const getProducts = (request, response) => {
    
    client$.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const getInterestedProducts = (request, response) => {
    
    client$.query("select * from products where category in ('caps','hoods','sunglasses') ORDER BY RANDOM() LIMIT 3;", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const getSimilarProducts = (request, response) => {
    
    client$.query("select * from products where category in ('caps','hoods','sunglasses') ORDER BY RANDOM() LIMIT 3;", (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  client$.end;

  module.exports = {
    getProducts,
    getInterestedProducts,
    getSimilarProducts
  }