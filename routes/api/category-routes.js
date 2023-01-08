const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with that id.'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with that id.'});
      return;
    }
    categoriesData.update({ category_name: req.body.category_name})
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
      id: req.params.id,
      },
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
