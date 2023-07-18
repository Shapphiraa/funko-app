class DuplicityError extends Error {
  constructor(message) {
    super(message);

    //this.name = DuplicityError.name
  }

  get name() {
    return DuplicityError.name;
  }
}

class ContentError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return ContentError.name;
  }
}

class ExistenceError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return ExistenceError.name;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return AuthError.name;
  }
}

class PropertyError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return PropertyError.name;
  }
}

class UnknownError extends Error {
  constructor(message) {
    super(message);
  }

  get name() {
    return UnknownError.name;
  }
}

module.exports = {
  DuplicityError,
  ContentError,
  ExistenceError,
  AuthError,
  PropertyError,
  UnknownError,
};
