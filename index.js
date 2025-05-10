const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {

   
    console.log(req.url);

    /*

    if req url is /api send db.json data
    if req url is / send index.html
    else send 404

    */
    // console.log(typeof(req.url));

    
    if (req.url === '/') {
            
        fs.readFile( path.join(__dirname,'public', 'index.html'),'utf-8', (err,data)=>{
            if (err) throw err;
            // console.log(typeof(data));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
         })
    }
    else if (req.url === '/about') {
            
        fs.readFile( path.join(__dirname,'public', 'about.html'),'utf-8', (err,data)=>{
            if (err) throw err;
            // console.log(typeof(data));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
         })
    }
    else if (req.url === '/api') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle preflight OPTIONS request
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }
        const {MongoClient} = require('mongodb');

        
        async function main(){

            const uri ="mongodb+srv://tejareddych12:Tej%401234@cluster0.agy9lmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
            const client = new MongoClient(uri);
        
            try {
                // Connect to the MongoDB cluster
                await client.connect();
                await findsomedata(client);
        
            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
            }
        }

        main().catch(console.error);


        async function findsomedata(client ){
            const cursor = client.db("Flight_details").collection("Details").find({});
            const results = await cursor.toArray();
            //console.log(results);
            const js= (JSON.stringify(results));
            console.log(js);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(js);

        };
        
    }
    else if (req.url === '/my_image.png') {
        fs.readFile(path.join(__dirname, 'public', 'my_image.png'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading image');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    }
    else{
         
        fs.readFile( path.join(__dirname,'public', '404.html'),'utf-8', (err,data)=>{
            if (err) throw err;
            // console.log(typeof(data));
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data);
         })
    }

});

server.listen(8032, () => console.log("yay my server is running"));