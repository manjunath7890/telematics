var express = require("express");
var router = express.Router();
const fs = require('fs');
const moment = require('moment');
const xlsx = require('xlsx');


// router.use(function(req, res, next) {
//   req.myData = null; // Initialize to null in case no data is received
//   next();
//   console.log(req.myData);
// });
let variables = '';

function generateValues() {
  const values = [];
    for (let i = 0; i < 10; i++) {
      values.push(Math.floor(Math.random() * 100));
    }
    return values;
  }
// Render the HTML template with the data
router.get('/table', (req, res) => {
  const date = new Date();
  // const filename = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.txt`;
  // fs.readFile(filename, 'utf8', (err, data) => {
  //   if (err) throw err;
    // const variables = data.trim().split('\n');
    const variables = generateValues();
    res.render('table.ejs', { variables: variables });
  });


  router.get('/variables', (req, res) => {
    const values = generateValues();
    res.send({ variables: [values.join(' ')] });
  });

function writeDataToExcel() {
  const varr = generateValues();
  const currentDate = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('HH:mm:ss');
  const data = [[currentTime, varr[0], varr[1], varr[2], varr[3], varr[4], varr[5], varr[6], varr[7], varr[8], varr[9]]];
  
  // Check if the current date is different from the date in the filename
  const filename = `variables-${currentDate}.xlsx`;
  fs.stat(filename, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
        xlsx.writeFile(wb, filename);
        // console.log(`New file ${filename} created with data: ${data}`);
      } else {
        throw err;
      }
    } else {
      const wb = xlsx.readFile(filename);
      const ws = wb.Sheets['Sheet1'];
      const previousData = xlsx.utils.sheet_to_json(ws, {header: 1, raw: false});
      const newData = previousData.concat(data);
      ws['!ref'] = `A1:J${newData.length}`;
      xlsx.utils.sheet_add_aoa(ws, newData, {origin: 'A1'});
      xlsx.writeFile(wb, filename);
      // console.log(`File ${filename} updated with data: ${data}`);
    }
  });
}

setInterval(writeDataToExcel, 1000);
module.exports = router;