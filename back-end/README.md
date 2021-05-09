# Web Api Endpoints Docs

Controllers:
* UsersController
* ScoreController
* TokenController

# UsersController

## Register user
## POST /users/register

```
UserRegisterInputModel
{
    email: string,
    username: string,
    password: string
}

(Model comes from request body)
```

## Login
## POST /users/login

```
UserLoginInputModel
{
    email: string,
    password: string
}

(Model comes from request body)
```

# TokenControler

## Refresh token
## POST /token/refresh

```
RefreshTokenInputModel
{
    refreshToken: string
}

(Model comes from request body)
```

# ScoreController

## Submit score
## POST /score/submit

```
SubmitScoreInputModel
{
    points: number(int)
}

(Model comes from request body)
```

## Get Rankings
## GET /score/rankings
```
{
}
```