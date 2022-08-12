# Animle

An evolutionary guessing game inspired by Wordle.

Data from [TimeTree](http://timetree.org/). Kumar S, Stecher G, Suleski M, Hedges SB (2017) **TimeTree: A Resource for Timelines, Timetrees, and Divergence Times.** _Mol Biol Evol_ doi:10.1093/molbev/msx116

## Routes

### `/species` GET

returns a JSON array of all species, e.g.

```json
[
  {
    "_id": "82114bf4-2566-484a-845b-94ac3cf8c182",
    "parent": "72d1d450-56f3-4bd2-9567-564b3ccf4569",
    "yearsSinceParent": 19256250,
    "isSpecies": true,
    "speciesName": "Ailuropoda melanoleuca",
    "otherNames": [],
    "lineage": [
      {
        "ancestor": "72d1d450-56f3-4bd2-9567-564b3ccf4569",
        "yearsSinceAncestor": 19256250
      }
    ]
  },
  {
    "_id": "13ab7b58-a789-4eb8-ac59-14d6401c48f0",
    "parent": "d3ea0c2b-1129-4fd3-9762-ac27af4f245f",
    "yearsSinceParent": 6766300,
    "isSpecies": true,
    "speciesName": "Arctodus simus",
    "otherNames": [],
    "lineage": [
      {
        "ancestor": "72d1d450-56f3-4bd2-9567-564b3ccf4569",
        "yearsSinceAncestor": 19256250
      },
      {
        "ancestor": "a6b7586d-08cb-451c-ab5c-fe2a87529e6c",
        "yearsSinceAncestor": 13938185
      },
      {
        "ancestor": "d3ea0c2b-1129-4fd3-9762-ac27af4f245f",
        "yearsSinceAncestor": 6766300
      }
    ]
  },
  ...
]
```

### `/users` GET

TODO: Disable for production!

returns a JSON array of all users, e.g.

```json
[
  {
    "_id": "62c9cf29ba7a29a87af33175",
    "games": [],
    "__v": 0
  },
  {
    "_id": "62c9d550e4684d1744a66446",
    "games": [],
    "__v": 0
  },
  ...
  ]
```

### `/users` POST

registers a new user

No req parameters

Response: JSON object with user details

e.g.

```json
{
  "games": [],
  "_id": "62f69ce211260c89cb2187f4",
  "__v": 0
}
```

### `/users/:userId` GET

validate user

returns:

- `204 No Content` if valid
- `404 Not Found` if not found
- `400 Bad Request` for invalid userId

### `users/:userId/stats` GET

// TODO

returns user stats (might phase out)

### `users/:userId/games` GET

returns gameboard for current day's game. Either returns the existing game for the user today or creates a new one.

returns JSON object with game info

example:

```json
{
  "user": "62f69ce211260c89cb2187f4",
  "target": "62d301c1720360a5a26a551b",
  "won": false,
  "guesses": [],
  "_id": "62f69dd711260c89cb2187fc",
  "__v": 0
}
```

### `users/:userId/games/:gameId/guesses/:nodeId` POST

Make a guess!

returns JSON object with guess info

example:

```json
{
  "ancestor": "a6b7586d-08cb-451c-ab5c-fe2a87529e6c",
  "yearsSinceAncestor": 13938185
}
```

#### Errors

// TODO

### Routes to (probably) eliminate

- `/` GET
- `/guess` POST
- `/nextGameTime` GET
