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

module.exports = {
  DuplicityError,
  ContentError,
};
