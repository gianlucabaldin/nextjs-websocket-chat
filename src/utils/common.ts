/**
 * Formats date from ISO format to dd/mm/yyyy hh:mm one
 *
 * @param {string} isoDateString - The ISO date string to be formatted
 * @return {string} The formatted date and time string
 */
export const formatDateTime = (isoDateString: string): string => {
  if (!isoDateString) return "";
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

/**
 * Scrolls the given HTMLUListElement to the bottom.
 *
 * @param {React.RefObject<HTMLUListElement>} ref - The reference to the HTMLUListElement to be scrolled to the bottom
 * @return {void}
 */
export const scrollToBottom = (ref: React.RefObject<HTMLUListElement>) => {
  ref?.current?.lastElementChild?.scrollIntoView();
};

/**
 * Generates a random ID of the specified length using alphanumeric characters,
 * used to give a unique ID to each message
 *
 * @param {number} length - the length of the random ID (default is 8)
 * @return {string} the randomly generated ID
 */
export const generateRandomId = (length: number = 8): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};

/**
 * Returns the initials of the given username; used to display the initials within
 * the circle in the chat
 *
 * @param {string} username - the input username
 * @return {string} the initials of the username
 */
export const getIntials = (username: string): string => {
  if (!username) return "";

  const parts = username.split(" ");

  if (parts.length > 1) {
    const firstName = parts[0].slice(0, 1);
    const lastName = parts[1].slice(0, 1);
    return `${firstName}${lastName}`;
  } else if (username.length > 2) {
    return username.substring(0, 2);
  } else {
    return username;
  }
};
