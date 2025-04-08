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

export function createSemaphore(max: number) {
  const waiting: { resolve: () => void; err: (msg?: string) => void }[] = [];

  let counter = 0;

  async function acquire() {
    if (counter < max) {
      counter++;
      return new Promise<void>((resolve) => {
        resolve();
      });
    } else {
      return new Promise<void>((resolve, err) => {
        waiting.push({ resolve, err });
      });
    }
  }
  async function release() {
    counter--;
    take();
  }
  async function take() {
    if (waiting.length > 0 && counter < max) {
      counter++;
      const promise = waiting.shift();
      promise?.resolve();
    }
  }

  async function clear() {
    const unresolved = waiting.length;

    for (let i = unresolved - 1; i >= 0; i--) {
      const promise = waiting.pop();
      promise?.err("Task has been cleared");
    }

    counter = 0;

    return unresolved;
  }

  return {
    acquire,
    release,
    clear,
    counter,
  };
}
