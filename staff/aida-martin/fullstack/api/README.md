# API

## Endpoints

| Action                | Method | Path                         | Body                                                                          | Status |
| --------------------- | ------ | ---------------------------- | ----------------------------------------------------------------------------- | ------ |
| Register user         | POST   | /users                       | { "name": "...", "email": "...", "password": "...", "repeatPassword": "..." } | 201    |
| Authenticate user     | POST   | /users/auth                  | { "email": "...", "password": "..." }                                         | 200    |
| Retrieve user         | GET    | /users/:userId               | No body                                                                       | 200    |
| Update user avatar    | PATCH  | /users/:userId/avatar        | { "avatar": "..." }                                                           | 204    |
| Update user password  | PATCH  | /users/:userId/password      | { "password": "...", "newPassword": "...", "newPasswordConfirm": "..." }      | 204    |
| Create post           | POST   | /posts                       | { "userId": "...", "image": "...", "text": "..." }                            | 201    |
| Retrieve post         | GET    | /posts/:postId/users/:userId | No body                                                                       | 200    |
| Retrieve posts        | GET    | /posts/users/:userId         | No body                                                                       | 200    |
| Retrieve saved posts  | GET    | /posts/users/:userId/saved   | No body                                                                       | 200    |
| Delete post           | DELETE | /posts/:postId               | { "userId": "..." }                                                           | 200    |
| Update post           | PATCH  | /posts/:postId               | { "userId": "...", "image": "...", "text": "..." }                            | 204    |
| Toggle privatize post | PATCH  | /posts/:postId/visibility    | { "userId": "..." }                                                           | 204    |
| Toggle like post      | PATCH  | /posts/:postId/likes         | { "userId": "..." }                                                           | 204    |
| Toggle save post      | PATCH  | /posts/:postId/saves         | { "userId": "..." }                                                           | 204    |
| Buy post              | PATCH  | /posts/:postId/buy           | { "userId": "..." }                                                           | 204    |
| Sell post             | PATCH  | /posts/:postId/sale          | { "userId": "...", "price": number }                                          | 204    |
