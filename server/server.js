// const express = require('express')
// const cors = require('cors')
// const spotifyWebApi = require('spotify-web-api-node')

// const app = express();
// const port = 8000

// app.use(cors()) // To handle cross-origin requests
// app.use(express.json()); // To parse JSON bodies

// const credentials = {
//   clientId: '9a1e71af41074900af7ee6ede5ba105b',
//   clientSecret: '6ebf9056a7e742b1af35e6f90beb1b75',
//   redirectUri: 'http://localhost:3000/',
// };

// app.get('/', (req, res) => {
//   console.log('Hello World!')
// })

// app.post('/login', (req,res) => {
//     let spotifyApi = new spotifyWebApi(credentials)
//     const code = req.body.code
//     spotifyApi.authorizationCodeGrant(code).then((data) => {
//         res.json({
//             accessToken : data.body.access_token,
//         }) 
//     })
//     .catch((err) => {
//         console.log(err);
//         res.sendStatus(400)
//     })

// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })