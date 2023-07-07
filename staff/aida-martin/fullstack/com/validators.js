const { ContentError } = require("./errors");
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i;
const HEX_DICTIONARY = "0123456789abcdef";

/**
 * Validates the email
 *
 * @param {string} email The email to validate
 */

function validateEmail(email) {
  if (typeof email !== "string") {
    throw new TypeError("Email is not a string 😥", { cause: "userError" });
  }
  if (!email.trim().length) {
    throw new ContentError("Email is empty 😥", { cause: "userError" });
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("Email is not valid 😥", { cause: "userError" });
  }
}

/**
 * Validates the password
 *
 * @param {string} password The password to validate
 * @param {string} explain The word to specity the errors
 */

function validatePassword(password, explain = "Password") {
  if (typeof password !== "string") {
    throw new TypeError(`${explain} is not a string 😥`, {
      cause: "userError",
    });
  }
  if (!password.trim().length) {
    throw new ContentError(`${explain} is empty 😥`, { cause: "userError" });
  }
  if (password.length < 8) {
    throw new RangeError(`${explain} does not have 8 characters 😥`, {
      cause: "userError",
    });
  }
}

/**
 * Validates the name
 *
 * @param {string} name The name to validate
 */

function validateName(name) {
  if (typeof name !== "string") {
    throw new TypeError("Name is not a string 😥", { cause: "userError" });
  }
  if (!name.trim().length) {
    throw new ContentError("Name is empty 😥", { cause: "userError" });
  }
}

/**
 * Validates the url
 *
 * @param {string} url The url to validate
 * @param {string} explain The word to specity the errors
 */

function validateUrl(url, explain = "Url") {
  if (typeof url !== "string") {
    throw new TypeError(`${explain} is not a string 😥`, {
      cause: "userError",
    });
  }
  if (!url.trim().length) {
    throw new ContentError(`${explain} is empty 😥`, { cause: "userError" });
  }
}

/**
 * Validates the ID
 *
 * @param {string} id The ID to validate
 * @param {string} explain The word to specity the errors
 *
 */

function validateId(id, explain = "User ID") {
  if (typeof id !== "string") {
    throw new TypeError(`${explain} is not a string 😥`, {
      cause: "userError",
    });
  }
  if (id.trim().length !== 24) {
    throw new ContentError(`${explain} does not have 24 characters 😥`, {
      cause: "userError",
    });
  }

  for (let i = 0; i < id.length; i++) {
    const char = id[i];

    if (!HEX_DICTIONARY.includes(char))
      throw new ContentError(`${explain} is not hexadecimal 😥`);
  }
}

/**
 * Validates the text
 *
 * @param {string} text The text to validate
 * @param {string} explain The word to specity the errors
 */

function validateText(text, explain = "Text") {
  if (typeof text !== "string") {
    throw new TypeError(`${explain} is not a string 😥`, {
      cause: "userError",
    });
  }
  if (!text.trim().length) {
    throw new ContentError(`${explain} is empty 😥`, { cause: "userError" });
  }
}

function validateCallback(callback, explain = "Callback") {
  if (typeof callback !== "function") {
    throw new TypeError(`${explain} is not a function 😥`);
  }
}

function validateToken(token, explain = "Token") {
  if (typeof token !== "string")
    throw new TypeError(`${explain} is not a string 😥`);
  if (token.split(".").length !== 3)
    throw new ContentError(`${explain} is not valid 😥`);
}

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateUrl,
  validateId,
  validateText,
  validateCallback,
  validateToken,
};
