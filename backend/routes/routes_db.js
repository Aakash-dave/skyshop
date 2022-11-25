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

  const category = request.params.cat;

  client$.query(`select * from products where category NOT IN ('${category}') ORDER BY RANDOM() LIMIT 7;`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getSimilarProducts = (request, response) => {

  // console.log(request.params.cat);
  const category = request.params.cat;

  client$.query(`select * from products where category in ('${category}') ORDER BY RANDOM() LIMIT 7;`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
};

const getCategory = (request, response) => {
  const category = request.params.cat;

  client$.query(`select * from products where category in ('${category}');`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

client$.end;

module.exports = {
  getProducts,
  getInterestedProducts,
  getSimilarProducts,
  getCategory
}