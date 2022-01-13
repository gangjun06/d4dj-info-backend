import axios from "axios";

const formatText = (str: string): string => {
  str = str.replace(/__/gi, "");
  const match = str.match(/^\b[A-Z]+/);
  if (match) {
    return str.replace(/^\b[A-Z]+/, match[0].toLowerCase());
  }
  return str;
};

const parseJSON = <T extends object>(json: any): T[] => {
  let newObj: T[] = [];
  Object.keys(json).forEach((key) => {
    let objItem: T = {} as T;
    Object.keys(json[key]).forEach((key2) => {
      //@ts-ignore
      objItem[formatText(key2)] = json[key][key2];
    });
    newObj.push(objItem as T);
  });
  return newObj;
};

const request = (name: string) =>
  axios.get(`https://asset.d4dj.info/Master/${name}`);

export const parse = (name: string) => {};
