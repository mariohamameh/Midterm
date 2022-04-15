const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/conversations", (req, res) => {
    const paramsUser_ID = [req.session.user_id];
    console.log("current user", paramsUser_ID);
    database.getMessagesforUser(paramsUser_ID)
      .then(data => {
        const templateVars = { messages: data.rows, conversation_id: conversation_id };
        console.log("messages", templateVars.messages);
        res.render("messages", templateVars);
      });
  });

  router.get("/conversations/:id", (req, res) => {
    const sql = "SELECT * FROM messages WHERE conversation_id = $1";
    const conversation_id = req.params.id;
    const params = [conversation_id];
    db.query(sql, params)
      .then(data => {
        const templateVars = { messages: data.rows, conversation_id: conversation_id };
        console.log("msgs", templateVars.messages);
        res.render("messages", templateVars);
      });

  });

  /// create new message from unique item page
  router.post("/conversations/:id", (req, res) => {
    const sender_id = req.session.user_id;

    const message = {
      from_user: sender_id, /// QUESTION: is this the best way to secure user_id
      item_id: req.body.item_id,
      message: req.body.message,
      conversation_id: req.body.conversationId, /// QUESTION: or do we use req.params.id
      from_buyer: true
    };
    database.sendMessage(message);
    console.log("convo being started by user",  from_user, "convo about itemm", item_id)

      .then(data => {
        console.log("conversation id", data.rows[0]);

        const conversation_id = data.rows[0].id;
        const buyer_id = data.rows[0].from_user;
        console.log("buyer and sender id", sender_id, buyer_id);
        if (sender_id !== buyer_id) {
          message.from_buyer = flase;
        }
        database.sendMessage(message)
          .then(data => {
            res.redirect(`conversations/${conversation_id}`);
          });

      });

  });
  return router;
};
