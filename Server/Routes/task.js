const express = require('express');
const router = express.Router();
const { tasks } = require('../models');
require('../models/index');
require('../index');

// Read operation: 
router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (tasks).findAll();
     return res.send(find);
})


// // Create operation

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { task_name, description, actual_hour, estimated_hour, invoiceId } = req.body
     let task = await tasks.create({ task_name, description, actual_hour, estimated_hour, invoiceId });
     console.log("New task created ✔ ");
     return res.send(task);
})

// // Update Operation

router.put('/:id', async function (req, res) {
     const { task_name, description, actual_hour, estimated_hour } = req.body;
     const id = req.params.id;
     let update = await tasks.update({ task_name, description, actual_hour, estimated_hour }, {
          where: {
               id
          }
     });
     console.log("Updated pg_db ✔");

     return res.send(update);
},
)


// // Deleting Operator

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await tasks.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)

module.exports = router;

