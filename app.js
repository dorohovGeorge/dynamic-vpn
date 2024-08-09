const express = require('express')
const app = express()
var port = 3000
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const url = 'http://vpn.94.103.89.23.sslip.io/'

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', true)
    res.append('Access-Control-Expose-Headers', ['*'])
    res.append('content-type', 'text/plain')
    next();
});

app.get('/key/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const options = {
		method: 'GET'
	};
    var str = url+id
    console.log(str)
    fetch(str, options)
		.then(res => res.text())
		.then(text => console.log(text))
		.catch(err => console.error('error:' + err));

    	try {
            let response = await fetch(str, options);
            response = await response.text();
            res.send(response)
        } catch (err) {
            console.log(err);
            res.status(500).json({msg: `Internal Server Error.`});
        }    
})

// app.get('/allConnections', async (req, res) => {
//         const options = {
//             method: 'GET'
//         };
//         var part = 'allConnections'
//         var str = url + part
//         console.log(str)
//         fetch(str, options)
//             .then(res => res.text())
//             .then(text => console.log(text))
//             .catch(err => console.error('error:' + err));
    
//             try {
//                 let response = await fetch(str, options);
//                 response = await response.text();
//                 res.send(response)
//             } catch (err) {
//                 console.log(err);
//                 res.status(500).json({msg: `Internal Server Error.`});
//             }    
//     })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
