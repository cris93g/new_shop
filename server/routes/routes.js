const {
  newItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItemsFromUser
} = require("../controllers/itemCtrl/itemCtrl");

module.exports = app => {
  app.post("/api/newItem", newItem);
  app.put("/api/updateItem", updateItem);
  app.delete("/api/deleteItem", deleteItem);
  app.get("/api/items", getAllItems);
  app.post("/api/userItems", getItemsFromUser);
};
