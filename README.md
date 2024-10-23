# monoBackRepoDjMarcel

Repository mono repo pour tous les back DJ marcel

## MONO REPO

### Back-end

Le mono repo a les trois services suivantes

- [djBackClient](djBackClient/) : API referet aux donnes Clients
- [djBackPlaylist](djBackPlaylist/): API referet aux playtist Clients
- [djBackP(./)]: API referet aux Dj Marcel

### Front-End

Le front-end est le:

- [frontDj](frontDj/) : Front-end

## Modeles Json

### djBackClient

```json
[
  {
    "name": "Nome Exemplo 1",
    "email": "email1@example.com",
    "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a"
  },
  {
    "name": "Nome Exemplo 2",
    "email": "email2@example.com",
    "id": "d1e8f9e8-1685-4c89-bafb-ff5af830be8b"
  }
]
```

### djBackPlaylist

``` json
{
  "playlists": [
    {
      "id": "0",
      "nom": "maPlaylist test",
      "chansons": [1, 2],
      "client": 0
    }
  ],
  "soirees": [
    {
      "id": 0,
      "nom": "",
      "date": "",
      "playlist": [0]
    }
  ],
  "clients": [
    {
      "id": 0,
      "nom": "",
      "prenom": ""
    }
  ],
  "chansons": [
    {
      "id": 0,
      "artiste": "",
      "titre": ""
    }
  ]
}
```

### frontDj

```json
{
  "playlists": [
    {
      "id": "0",
      "nom": "maPlaylist test",
      "chansons": [1, 2],
      "client": 0
    }
  ],
  "soirees": [
    {
      "id": 0,
      "nom": "",
      "date": "",
      "playlist": [0]
    }
  ],
  "clients": [
    {
      "id": 0,
      "nom": "",
      "prenom": ""
    }
  ],
  "chansons": [
    {
      "id": 0,
      "artiste": "",
      "titre": ""
    }
  ]
}
```
