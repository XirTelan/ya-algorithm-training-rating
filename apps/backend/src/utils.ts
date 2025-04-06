export function removeEmailPhone(inputString: string) {
  const atIndex = inputString.indexOf("@");

  const regex = new RegExp(/^\+\d+/);

  if (inputString.match(regex))
    return (
      inputString.substring(0, 5) +
      "***" +
      inputString.substring(inputString.length - 4)
    );

  if (atIndex === -1) return inputString;

  return inputString.substring(0, atIndex + 1) + "...";
}
