export const noop = () => {};

export const sleep = (ms: number) => {
  return new Promise(r => {
    setTimeout(r, ms);
  });
};

export const decodeHTMLEntities = (str: string) => {
  str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
  str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
  const element = document.createElement("div");
  element.innerHTML = str;
  str = element.textContent as string;
  element.textContent = "";

  return str;
};
