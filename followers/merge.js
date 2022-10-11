const fs = require("fs");
const { readJsonFile } = require("../util/file");

const result = [];
for (let i = 0; i <= 554; i++) {
  const { data } = readJsonFile(`data/archive/kh_ir/${i}.json`);
  console.log("🚀 ~ file: merge.js ~ line 12 ~ i", i, data.length);
  const formatted = data.map(({ public_metrics, ...rest }) => ({
    ...public_metrics,
    ...rest,
  }));
  result.push(...formatted);
}

const { parse } = require("json2csv");

const fields = [
  "id",
  "username",
  "name",
  "created_at",
  "location",
  "verified",
  "followers_count",
  "following_count",
  "tweet_count",
  "listed_count",
  "protected",
  "profile_image_url",
];

const opts = { fields };
console.log("🚀 ~ write to json");
fs.writeFile(`data/all.json`, JSON.stringify(result), (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

console.log("🚀 ~ write to csv");

try {
  const csv = parse(result, opts);
  fs.writeFile(`data/all.csv`, csv, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
} catch (err) {
  console.error(err);
}
