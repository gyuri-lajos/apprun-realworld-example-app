let access_token: string = window.localStorage.getItem('jwt');

export function setToken(token: string) {
  access_token = token;
  window.localStorage.setItem('jwt', token);
}

export async function fetchAsync(method: string, url: string, body?: any) {
  const headers = access_token ? { 'Authorization': `Bearer ${access_token}` } : {}
  headers['Content-Type'] = 'application/json; charset=utf-8';
  const response = await window['fetch'](url, {
    method,
    headers,
    body
  });
  return await response.json();
}

export async function get(url: string) {
  return await fetchAsync('GET', url);
}

export async function post(url: string, body?: any) {
  return await fetchAsync('POST', url, body);
}

export async function del(url: string) {
  return await fetchAsync('DELETE', url);
}

export async function put(url: string, body?: any) {
  return await fetchAsync('PUT', url, body);
}
export function toQueryString(obj) {
  const parts = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return parts.join("&");
}

export function serializeObject(form) {
  let obj = {};
  if (typeof form == 'object' && form.nodeName == "FORM") {
    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i];
      if (field.name
        && field.type != 'file'
        && field.type != 'reset'
        && field.type != 'submit'
        && field.type != 'button') {
        if (field.type == 'select-multiple') {
          obj[field.name] = '';
          let tempvalue = '';
          for (let j = 0; j < form.elements[i].options.length; j++) {
            if (field.options[j].selected)
              tempvalue += field.options[j].value + ';';
          }
          if (tempvalue.charAt(tempvalue.length - 1) === ';') obj[field.name] = tempvalue.substring(0, tempvalue.length - 1);

        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
          obj[field.name] = field.value;
        }
      }
    }
  }
  return obj;
}
