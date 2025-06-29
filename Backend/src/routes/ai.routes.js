const express =require('express');
const aicontorller =require("../controllers/ai.controller");


const router = express.Router();
router.post("/get-review" , aicontorller.getReview)

module.exports = router;