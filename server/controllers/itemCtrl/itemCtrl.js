module.exports = {
  newItem(req, res) {
    const db = req.app.get("db");
    const { userId, name, descr, category } = req.body;
    db.addItem([userId, name, descr, category])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  },
  updateItem(req, res) {
    const db = req.app.get("db");
    const { desc, id } = req.body;
    db.updateItem([desc, id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  },
  deleteItem(req, res) {
    const db = req.app.get("db");
    const { id } = req.body;
    db.deleteItem([id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  },
  getAllItems(req, res) {
    const db = req.app.get("db");
    db.getAllItems()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  },
  getItemsFromUser(req, res) {
    const db = req.app.get("db");
    const { id } = req.body;
    db.getItemsFromUser([id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  }
};
