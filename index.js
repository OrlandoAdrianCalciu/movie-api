const express = require("express"),
morgan = require("morgan"),
fs = require('fs'), //import built in node modules fs and path
path = require('path');

const app = express();
const accesLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies = [
    {
        title: 'The Fate of the Furious',
        author: 'Chris Morgan'
    },
    {
        title: 'John Wick',
        chapter: '2',
        author: 'Derek Kolstad'
    },
    {
        title: 'Ghost in the Shell',
        author: 'Masamune Shirow'
    },
    {
        title: 'Life',
        author: 'Rhett Reese, Paul Wenick'
    },
    {
        title: 'Gifted',
        author: 'Tom Flynn'
    },
    {
        title: 'The Circle',
        author: 'James Ponsoldt, Dave Eggers'
    },
    {
        title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
        author: 'Jeff Nathanson'
    },
    {
        title: 'Blade Runner 2045',
        author: 'Hampton Fancher, Michael Green'
    },
    {
        title: '47 Meters Down',
        author: 'Johannes Roberts, Ernest Riera'
    },
    {
        title: 'A Ghost Story',
        author: 'David Lowery'
    },
]

app.use(morgan('combined', {stream: accesLogStream}));

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Welcome to information about 10 Top Movies (2017-2022)');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});