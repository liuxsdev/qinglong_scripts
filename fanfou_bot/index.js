import { get_better_msg } from "@liuxsdev/poetry";
import Fanfou from "fanfou-sdk";

const KEY = process.env.FANFOU_KEY;
const SECRET = process.env.FANFOU_SECRET;
const USERNAME = process.env.FANFOU_USERNAME;
const PASSWORD = process.env.FANFOU_PASSWORD;

async function postStatus(status) {
  const ff = new Fanfou({
    consumerKey: KEY,
    consumerSecret: SECRET,
    username: USERNAME,
    password: PASSWORD,
  });
  await ff.xauth();
  const post = await ff.post("/statuses/update", { status });
  return post;
}

const URL = "https://poetry.liuxs.pro/#/";
async function main() {
  if (!KEY || !SECRET || !USERNAME || !PASSWORD) {
    console.log("环境变量未设置");
  } else {
    const msg_data = await get_better_msg();
    const msg = `${msg_data.msg} ${URL}${msg_data.extra.uid}`;
    console.log(msg);
    const status = await postStatus(msg);
    console.log(status);
  }
}

main();
