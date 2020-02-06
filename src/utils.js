export const apiGet = url => {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response);
      }
    })
    .then(responseJson => responseJson)
    .catch(error => {
      throw new Error(error);
    });
};
export const imgLoad = src => {
  let img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve();
    };
    img.onerror = () => {
      reject();
    };
    img.src = src;
  });
};
