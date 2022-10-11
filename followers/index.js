const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

const Authorization = process.env.AuthorizationToken;

// Khamenei_fa : 2247018338
// khamenei_ir : 27966935
const url =
  "https://api.twitter.com/2/users/2247018338/followers?max_results=1000&user.fields=created_at,location,protected,public_metrics,verified,profile_image_url";

const getData = async (token) => {
  let reqUrl = url;
  if (token) {
    reqUrl += `&pagination_token=${token}`;
  }
  const result = await axios.get(reqUrl, {
    headers: { common: { Authorization } },
  });
  return result;
};
const retrieve = async () => {
  let result = await getData();
  let counter = 0;
  let { next_token } = result.data.meta;
  fs.writeFile(`data/${counter}.json`, JSON.stringify(result.data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  while (next_token) {
    console.log(counter);
    await new Promise((resolve) => setTimeout(resolve, 65000));
    counter++;
    result = await getData(next_token);
    next_token = result.data.meta.next_token;
    fs.writeFile(`data/${counter}.json`, JSON.stringify(result.data), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  console.log(counter);
};

retrieve();
