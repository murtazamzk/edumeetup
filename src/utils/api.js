import axios from 'axios';

export const get = async (url, params) => {
  const result = await axios.get(url, params).catch(err => {
    console.log(err);
    return err;
  });
  return result.data;
};

export const post = async (url, data) => {
  const result = await axios.post(url,data).catch(err => {
    console.log(err);
    return err;
  });
  return result;
};