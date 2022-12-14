const client$ = require("../connectdb");
const bodyParser = require('body-parser');

client$.connect();

const getProducts = (request, response) => {
  client$.query("SELECT * FROM products ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getInterestedProducts = (request, response) => {
  const category = request.params.cat;

  client$.query(
    `select * from products where category NOT IN ('${category}') ORDER BY RANDOM() LIMIT 7;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getSimilarProducts = (request, response) => {
  // console.log(request.params.cat);
  const category = request.params.cat;

  client$.query(
    `select * from products where category in ('${category}') ORDER BY RANDOM() LIMIT 7;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCategory = (request, response) => {
  const category = request.params.cat;

  client$.query(
    `select * from products where category in ('${category}');`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCartItems = (request, response) => {
  const query_ = 'select id, name, url1, price, category from products where id = ANY($1)';
  const values = request.body;

  client$.query(query_, [values], (error, results) => {
    if (error) {
      response.status(500).json("something didn't work");
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

client$.end;

module.exports = {
  getProducts,
  getInterestedProducts,
  getSimilarProducts,
  getCategory,
  getCartItems,
};
