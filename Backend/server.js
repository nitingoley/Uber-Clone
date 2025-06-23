const http = require("http");
const app = require("./app.js");
const PORT =  process.env.PORT;

const server = http.createServer(app);



server.listen(PORT,()=>{
     console.log(`The server running on the port ${PORT}`);
})