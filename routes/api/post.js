const express = require('express');
const router = express.Router();

//@route GET api/POST

//@desc Test route

//@access public  


router.get('/', ( req, res) => {
    res.send("POst routed")
})

module.exports = router;