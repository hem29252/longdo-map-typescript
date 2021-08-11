const express = require('express');
const app = express();
const cors = require('cors');
const port = 3003
var data = [
    { "id": 1 , "name": "Sicnovac", "amount": 5, "lat": 13.570273388892026, "long": 100.633780169487, "email": "john@example.com", "tel": "00000", "description": "none"},
    { "id": 2 , "name": "Modena", "amount": 7, "lat": 13.470273388892026, "long": 100.733780169487, "email": "john@example.com", "tel": "00000", "description": "none"},
    { "id": 3 , "name": "Pizer", "amount": 10, "lat": 13.770273388892026, "long":100.833780169487, "email": "john@example.com", "tel": "00000", "description": "none"},
]

app.use(cors({
    origin: '*'
}));

app.get('/vaccine', (req ,res) => {
    res.json({
        "status": 200,
        "data": data
    })
})


app.listen(port, () => { console.log(`http://localhost:${port}`); });
