const express = require("express"),
    morgan = require("morgan"),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');


const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27071/myFlixDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});


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
        director: {
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
        director: {
            name: 'Chad Stahleski',
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
        director: {
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
        director: {
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
        director: {
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
        title: 'The Mummy',
        director: {
            name: 'Chris Morgan',
            born: 'December 5, 1970'
        },
        genre: {
            name: 'Action',
            description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violance and physical feats.'

        },
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTCXgCV-ZNb3InBCTaLdED58dF6iZJxIvCOBurktiWxXrwGc8DB'
    },
    {
        title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
        director: {
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
        director: {
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
        director: {
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

// Gets the list of data about All movies without database
// app.get('/movies', (req, res) => {
//     res.json(topMovies);
// });

//Gets the list of data about all movies with database
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err)
        })
})

//Gets the data about a single movie, by title without database
// app.get('/movies/:title', (req, res) => {
//     res.json(topMovies.find((movie) => { return movie.title === req.params.title }));
// });

app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about genres, by name without database
// app.get('/movies/genres/:genreName', (req, res) => {
//     const { genreName } = req.params;
//     const genre = topMovies.find(movie => movie.genre.name === genreName).genre;

//     if (genre) {
//         res.status(200).json(genre);
//     } else {
//         res.status(400).send('This genre does not exist.')
//     }
// });

//Gets the data about genres, by name with database
app.get('/movies/genre/:genreName', (req, res) => {
    Movies.find({ 'Genre:Name': req.params.Name })
        .then((genre) => {
            res.json(genre)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Gets the data about a single director, by name without database
// app.get('/movies/director/:directorName', (req, res) => {
//     const { directorName } = req.params;
//     const director = topMovies.find(movie => movie.director.name === directorName).director;

//     if (director) {
//         res.status(200).json(director);
//     } else {
//         res.status(400).send('This director does not exist');
//     });

//Gets the data about a single director, by name with database
app.get('/movies/director/:directorName', (req, res) => {
    Movies.find({ 'Director.Name': req.params.Name })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//Create user and id without database
// app.post('/users', (req, res) => {
//     const newUser = req.body;

//     if (newUser.name) {
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).json(newUser)
//     } else {
//         res.status(400).send('The User needs a name')
//     }
// });

//Create user with database
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//Update a user's info, by username with database
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }, //This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});


//Update user without database
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedUser = req.body;

//     let user = users.find(user => user.id == id);

//     if (user) {
//         user.name = updatedUser.name
//         res.status(200).json(user);
//     } else {
//         res.status(400).send('There is no user.')
//     }
// });

//Add a movie to favorites without database
// app.post('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     let user = users.find(user => user.id == id);

//     if (user) {
//         user.favoriteMovies.push(movieTitle);
//         res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites`);
//     } else {
//         res.status(400).send('The movie was not added to favorites.')
//     }
// });

//Add a movie to favorites with database
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//Delete a movie from favorites without database
// app.delete('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     //Checks if user exists
//     let user = users.find(user => user.id == id);

//     if (user) {
//         user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
//         res.status(200).send(`${movieTitle} has been removed from users ${id}'s favorites`);
//     } else {
//         res.status(400).send('The movie was not removed.');
//     }
// });

//Delete a movie from favorites with database
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
            $pull: { FavoriteMovies: req.params.MovieID },
        },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});

//Delete the user without a database
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;

//     let user = users.find(user => user.id == id);

//     if (user) {
//         users = users.filter(user => user.id != id);
//         res.status(200).send(`The user ${id} has been deleted`);
//     } else {
//         res.status(400).send('The user was not deleted');
//     }
// });

//Delete the user with database
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});


