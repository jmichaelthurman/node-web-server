
const hbs = require('hbs');
const express = require('express');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

var mode = 'normal';
//var mode = 'maint';
var logRequest = (req,res) =>{
    var now = new Date().toString();
    var log = `${now}, method: ${req.method}, path: ${req.url}, res: ${res}`
    
    console.log(`${log}`);
    fs.appendFile('server.log',log + '\n', (err) =>{
        if(err){
            console.log('Ooops! Something went wrong.');
        };
    })
};

if(mode == 'maint'){
app.use((req,res,next) => {
    
    res.render('maintenance.hbs');
    var maint = 'maintenance: true';
    logRequest(req,'maint');

});
}else {
app.use((req,res,next) => {
    /*
    var now = new Date().toString();
    var log = `${now}, method: ${req.method}, path: ${req.url}`
    
    console.log(`${log}`);
    fs.appendFile('server.log',log + '\n', (err) =>{
        if(err){
            console.log('Ooops! Something went wrong.');
        };
    })
    */
    logRequest(req,res);
    next();
});
};
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('copyrightYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('siteTitle', () => { return 'MySite'});

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        
        pageTitle: 'Home',
        welcomeMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });
} );

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        
        pageTitle: 'About'
    });
});

app.get('/bad',(req,res) => {
    res.render('bad.hbs',{
        
        pageTitle: 'Bad Request',
        errorMessage: 'Bad news, Charlie. No chocolate for you.'
    });
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000.")
});