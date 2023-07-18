# API

## Endpoints

| Action                | Method | Path                      | Body                                                                          | Header        | Status |
| --------------------- | ------ | ------------------------- | ----------------------------------------------------------------------------- | ------------- | ------ |
| Register user         | POST   | /users                    | { "name": "...", "email": "...", "password": "...", "repeatPassword": "..." } | No header     | 201    |
| Authenticate user     | POST   | /users/auth               | { "email": "...", "password": "..." }                                         | No header     | 200    |
| Retrieve user         | GET    | /users/                   | No body                                                                       | Bearer userId | 200    |
| Update user avatar    | PATCH  | /users/avatar             | { "avatar": "..." }                                                           | Bearer userId | 204    |
| Update user password  | PATCH  | /users/password           | { "password": "...", "newPassword": "...", "newPasswordConfirm": "..." }      | Bearer userId | 204    |
| Create post           | POST   | /posts                    | { "image": "...", "text": "..." }                                             | Bearer userId | 201    |
| Retrieve post         | GET    | /posts/:postId            | No body                                                                       | Bearer userId | 200    |
| Retrieve posts        | GET    | /posts                    | No body                                                                       | Bearer userId | 200    |
| Retrieve saved posts  | GET    | /posts/saved              | No body                                                                       | Bearer userId | 200    |
| Delete post           | DELETE | /posts/:postId            | No body                                                                       | Bearer userId | 200    |
| Update post           | PATCH  | /posts/:postId            | { "image": "...", "text": "..." }                                             | Bearer userId | 204    |
| Toggle privatize post | PATCH  | /posts/:postId/visibility | No body                                                                       | Bearer userId | 204    |
| Toggle like post      | PATCH  | /posts/:postId/likes      | No body                                                                       | Bearer userId | 204    |
| Toggle save post      | PATCH  | /posts/:postId/saves      | No body                                                                       | Bearer userId | 204    |
| Buy post              | PATCH  | /posts/:postId/buy        | No body                                                                       | Bearer userId | 204    |
| Sell post             | PATCH  | /posts/:postId/sale       | { "price": number }                                                           | Bearer userId | 204    |
