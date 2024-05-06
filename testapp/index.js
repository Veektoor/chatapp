const http=require('http')
const fs =require('fs')

const server=http.createServer((req, res)=>{
    if(req.url=='/'){
        fs.readFile(__dirname + '/index.html',(err, data)=>{
            if(err){
                res.writeHead(500);
                res.end("error handling the page")
    
            }else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
})

const io=require('socket.io')(server);
const port = 8000;

io.on('connection',(socket)=>{
    socket.on('send name',(user)=>{
        io.emit('send name',user);
    });

    socket.on('send message',(chat)=>{
        io.emit('send message',chat);
    });
});

server.listen(port,()=>{
    console.log(`server is listening on port : ${port}`)
})