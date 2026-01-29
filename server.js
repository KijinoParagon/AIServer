import ollama from "ollama";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = 9;

let ol = async (req, res) => {
  let chain = req.body.messages;
  let response = await ollama.chat({
    model: "gemma3:1b",
    messages: chain,
  });
  res.send({ message: await response.message });
};

let oai = async (req, res) => {
  const response = await openai.responses.create({
    model: "gpt-3.5-turbo",
    input: req.body.messages
  });

  console.log(response);
  res.send({ message: await response.output.content.text});
};

app.get("/", (req, res) => {
  res.sendFile("public/chat.html", { root: "./" });
});

app.get(/\.js$/, (req, res) => {
  res.sendFile("public" + req.url, { root: "./" });
});

app.post("/api/message", express.json(), oai);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
