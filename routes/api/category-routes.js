const router = require('express').Router();
const db = require('../../models');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Find all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'category_name',
      'id'
    ],
    include: [db.Product] 
  }) 
    .then(dbProductData => { 
       res.json(dbProductData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    
  })
});

// Find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    },
    attributes: [
      'category_name',
      'id'
    ],
    include: [db.Product]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })

});

//Create a category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;