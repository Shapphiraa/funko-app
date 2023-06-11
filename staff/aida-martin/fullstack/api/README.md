# API

## Endpoints

| Action               | Method | Path                    | Body                                                                          | Status |
| -------------------- | ------ | ----------------------- | ----------------------------------------------------------------------------- | ------ |
| Register user        | POST   | /users                  | { "name": "...", "email": "...", "password": "...", "repeatPassword": "..." } | 201    |
| Authenticate user    | POST   | /users/auth             | { "email": "...", "password": "..." }                                         | 200    |
| Retrieve user        | GET    | /users/:userId          | -                                                                             | 200    |
| Update user avatar   | PATCH  | /users/:userId/avatar   | { "avatar": "..." }                                                           | 204    |
| Update user password | PATCH  | /users/:userId/password | { "password": "...", "newPassword": "...", "newPasswordConfirm": "..." }      | 204    |
| Create post          | POST   | /posts                  | { "userId": "...", "image": "...", "text": "..." }                            | 201    |
