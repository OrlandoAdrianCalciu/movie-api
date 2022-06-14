const express = require("express"),
    morgan = require("morgan"),
    path = require('path'),
bodyParser = require('body-parser'),
    uuid = require('uuid');


const app = express();

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Max",
        favoriteMovies: ["The Fate of the Furious"]
    },
    {
        id: 2,
        name: "Jason",
        favoriteMovies: "John Wick"
    },
];


let topMovies = [
    {
        title: 'The Fate of the Furious',
        author: {
            name: 'Chris Morgan',
            born: 'December 5, 1970'
        },
        genre: {
            name: 'Action',
            description: 'A film with a fast-moving plot, usually containing scenes of violence.'
        },
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRYf_7fRfACrDV9o7V22QbXubQSRUZX625QoD9YKNnYTDpzhtnh',
    },
    {
        title: 'John Wick',
        chapter: '2',
        author: {
            name: 'Derek Kolstad',
            born: 'April 4, 1974'
        },
        genre: {
            name: 'Action',
            description: 'A film with a fast-moving plot, usually containing scenes of violence.'

        },
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VZ6Un0Fn4RYJSjH6MLsKgEmICbWqxWbfOBjDxkKSD891Thuj'
    },
    {
        title: 'Ghost in the Shell',
        author: {
            name: 'Masamune Shirow',
            born: 'November 23, 1961'
        },
        genre: {
            name: 'Action',
            description: 'A film with a fast-moving plot, usually containing scenes of violence.'

        },
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT4AYNE4UnkfyoBGlU5DTKIeFV-VKlUc6PbA4SSUoNwaI2VkNfQ'
    },
    {
        title: 'Life',
        author: {
            name: 'Rhett Reese',
            born: 'October 10, 1975'
        },
        genre: {
            name: 'Horror',
            description: 'Incidents of physical violence and psychological terror'

        },
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL8hcAOmSG7nJVmkhrnqlaDThH5r0Zj1R4j6kzDx2BXhvVXETI'
    },
    {
        title: 'Gifted',
        author: {
            name: 'Tom Flynn',
            born: 'August 18, 1955',
            died: 'August 23, 2021'
        },
        genre: {
            name: 'Drama',
            description: 'features stories with high stakes and a lot of conflicts'

        },
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSE8rmFQdCRPL8OpCknQJ2ScEcXqf39eOi9w-KIhPpb7aSUrdS3'
    },
    {
        title: 'The Circle',
        author: {
            name: 'James Ponsoldt',
            born: '1978'
        },
        genre: {
            name: 'Science fiction',
            description: 'A film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science'

        },
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLva549ncorFxlLKNq2MWzYP5xADxcHKsH688bpmSht9nm4z1l'
    },
    {
        title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
        author: {
            name: 'Jeff Nathanson',
            born: 'October 12, 1965'
        },
        genre: {
            name: 'Action',
            description: 'A film with a fast-moving plot, usually containing scenes of violence.'

        },
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhEeDOpouHNg3A75Ngkgl-pQdWrr8ErxSuYCbb8-Tn7KcuD79'
    },
    {
        title: 'Blade Runner 2049',
        author: {
            name: 'Hampton Fancher',
            born: 'July 18, 1938'
        },
        genre: {
            name: 'Science fiction',
            description: 'A film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science'

        },
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPy3V6DD-NB3mNaObNlXqdE80zou2yK4Zk4xkq98vmKDI-6i3B'
    },
    {
        title: '47 Meters Down',
        author: {
            name: 'Johannes Roberts',
            born: 'May 24, 1976'
        },
        genre: {
            name: 'Horror',
            description: 'Incidents of physical violence and psychological terror'

        },
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQGGrMCD3Sv5y4ROAMLiHCHgYcEeIOC9ylg_dxT3_zyGabUtaPv{'
    },
    {
        title: 'A Ghost Story',
        author: {
            name: 'David Lowery',
            born: 'December 26, 1980'
        },
        genre: {
            name: 'Romance',
            description: 'Romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters'

        },
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSE7IhHj_IWvsjA8teBFVqSUMqYkKN9AcpOBNZaFgl2CQ-0rSfy'
    },
]

app.use(morgan('common'));

app.use(express.static('public'));

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

app.get('/', (req, res) => {
    res.send('Welcome to information about 10 Top Movies (2017-2022)');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Gets the list of data about All movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//Gets the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => { return movie.title === req.params.title }));
});

//Gets the data about genres, by name
app.get('/movies/genres/:genreName', (req, res) => {
    const {genreName} = req.params;
    const genre = topMovies.find(movie => movie.genre.name === genreName).genre;

    if (genre){
        res.status(200).json(genre);
    } else{
        res.status(400).send('This genre does not exist.')
    }
});

//Gets the data about a single author, by name
app.get('/movies/authors/:authorName', (req, res) => {
    const {authorName} = req.params;
    const author = topMovies.find(movie => movie.author.name === authorName).author;

    if (author){
        res.status(200).json(author);
    } else{
        res.status(400).send('This author does not exist.')
    }
});

//Create user and id
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('The User needs a name')
    }
});

//Update user
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if(user){
        user.name = updatedUser.name
        res.status(200).json(user);
    } else{
        res.status(400).send('There is no user.')
    }
});

//Add a movie to favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const{id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);
   
    if(user){
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites`);
    } else{
        res.status(400).send('The movie was not added to favorites.')
    }
});

//Delete a movie from favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const{id, movieTitle} = req.params;

    //Checks if user exists
    let user = users.find(user => user.id == id);

    if(user){
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from users ${id}'s favorites`);
    } else{
        res.status(400).send('The movie was not removed.');
    }
});

//Delete the user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`The user ${id} has been deleted`);
    } else {
        res.status(400).send('The user was not deleted');
    }
});

app.use((err, req, res, next )=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});