const { readJsonFile } = require("../util/file");
const { differenceInDays, subDays } = require("date-fns");

// const data = readJsonFile(`data/all.json`);
const data = readJsonFile(`data/all.json`);

const total = data.length;
console.log("all: ", data.length);

const protected = data.filter((d) => d.protected).length;
console.log("protected: ", protected, (100 * protected) / total);

const verified = data.filter((d) => d.verified).length;
console.log("verified: ", verified, (100 * verified) / total);

const zeroFollower = data.filter((d) => d.followers_count === 0).length;
console.log(
  "followers_count === 0: ",
  zeroFollower,
  (100 * zeroFollower) / total
);

const fiveLessFollower = data.filter((d) => d.followers_count <= 5).length;
console.log(
  "followers_count <= 5 : ",
  fiveLessFollower,
  (100 * fiveLessFollower) / total
);

const zeroTweet = data.filter((d) => d.tweet_count === 0).length;
console.log("tweet_count === 0: ", zeroTweet, (100 * zeroTweet) / total);

const fiveLessTweet = data.filter((d) => d.tweet_count < 3).length;
console.log("tweet_count < 3: ", fiveLessTweet, (100 * fiveLessTweet) / total);
const withLocation = data.filter((d) => d.location).length;
console.log("with location ", withLocation, (100 * withLocation) / total);

for (let i = 0; i < 60; i++) {
  console.log(
    `${i} days ago(${subDays(new Date(), i)})`,
    //   differenceInDays(new Date(data[0].created_at), new Date(2022, 9, 1))
    data.filter(
      (d) =>
        differenceInDays(new Date(d.created_at), subDays(new Date(), i)) === 0
    ).length
  );
}
