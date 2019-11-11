const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/events', (req,res) => {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    });

    setTimeout(() => {
        res.write('data: {"flight": "I768", "state": "landing"}');
        res.write("\n\n");
    }, 3000);

    setTimeout(() => {
        res.write('data: {"flight": "I768", "state": "landed"}');
        res.write("\n\n");
    }, 6000);

});


// An api endpoint that returns a short list of items
app.get('/api/eventsOther', (req,res) => {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    });

    setTimeout(() => {
        res.write('data: {"flight": "D654", "state": "landing"}');
        res.write("\n\n");
    }, 5000);

    setTimeout(() => {
        res.write('data: {"flight": "D654", "state": "landed"}');
        res.write("\n\n");
    }, 8000);

});
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
