const express = require('express')
const router = express.Router();
const {stats, blogSearch} = require('../middlewares/stats')

router.get("/blog-stats", stats); 
router.get("/blog-search", blogSearch)

module.exports = router;