import axios from "axios";
import { keys } from "./mainKey";

function urlsConstructor(event, param = {}) {
  let url = "";

  switch (event) {
    case "main":
      url = `members/me/boards?`;
      break;

    case "lists":
      url = `boards/${param.idBoard}/${event}?`;
      break;

    case "cards":
      url = `boards/${param.idBoard}/${event}?attachments=true&`;
      break;

    case "list":
      url = `lists/${param.idList}?`;
      break;

    case "createCard":
      url = `cards?`;
      Object.keys(param).forEach(item => {
        url += `${item}=${param[item]}&`;
      });
      break;
  }
  console.log(
    "axios",
    `https://api.trello.com/1/${url}key=${keys.key}&token=${keys.token}`
  );
  return `https://api.trello.com/1/${url}key=${keys.key}&token=${keys.token}`;
}

export function axiosRequest(event, method, param) {
  return axios[method](urlsConstructor(event, param));
}

//https://api.trello.com/1/members/me/boards?key=98868453c73052e17ab9df0a4edf4694&token=36eddc198b3d27b2525a8a7fba48296abe009203abec8776ba305824a81f4db5
//https://api.trello.com/1/boards/5dae9c5f272acd1a7f9cae54/lists?key=98868453c73052e17ab9df0a4edf4694&token=36eddc198b3d27b2525a8a7fba48296abe009203abec8776ba305824a81f4db5
// https://api.trello.com/1/boards/5dae9c5f272acd1a7f9cae54/cards?key=98868453c73052e17ab9df0a4edf4694&token=36eddc198b3d27b2525a8a7fba48296abe009203abec8776ba305824a81f4db5
//https://api.trello.com/1/cards/${idCard}?key=${keys.key}&token=${keys.token}`
//https://api.trello.com/1/cards?...&key=${keys.key}&token=${keys.token}
//https://api.trello.com/1/lists/id?key=yourApiKey&token=yourApiToken
//https://api.trello.com/1/cards/id?key=yourApiKey&token=yourApiToken
//https://api.trello.com/1/cards/id?key=yourApiKey&token=yourApiToken
//https://api.trello.com/1/cards/id/attachments?file=data&key=yourApiKey&token=yourApiToken
//https://api.trello.com/1/cards/id/attachments/idAttachment?key=yourApiKey&token=yourApiToken