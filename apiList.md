# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //Forgot password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore, intrested, accepted, rejected

NOTES:

/feed?page=1&limit=10 => users 1-10  => .skip(0) & .limit(10)

/feed?page=2&limit=10 => users 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => users 21-30 => .skip(20) & .limit(10)

