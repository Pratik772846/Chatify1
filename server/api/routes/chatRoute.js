const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController.js');
const CheckAuth = require('../middleware/authMiddleware.js');

router.post("/access",CheckAuth,ChatController.accessChat);


router.get("/",CheckAuth,ChatController.fetchChats);
router.post("/group",CheckAuth,ChatController.createGroupChat);
router.put("/rename",CheckAuth,ChatController.renameGroup);
router.put("/groupremove",CheckAuth,ChatController.removeFromGroup);
router.put("/groupadd",CheckAuth,ChatController.addToGroup);


module.exports = router;
