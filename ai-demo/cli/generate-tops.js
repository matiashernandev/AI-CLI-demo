import cohere from "cohere-ai";
import ora from "ora";
import * as dotenv from "dotenv";
dotenv.config();

const spinner = ora("Generando el top").start();
spinner.color = "blue";

const start = performance.now();

const intervalId = setInterval(() => {
    const time = Math.floor((performance.now() - start) / 1000);
    spinner.text = `Eh amigo, generando el top (${time}s!)`;
});

cohere.init(process.env.API_KEY);

const response = await cohere.generate({
    model: "command-xlarge-20221108",
    prompt: "Generate a list of 5 best INDIE games, But don't select easy games",
    max_tokens: 100,
    temperature: 0,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
});

const time = Math.floor((performance.now() - start) / 1000);
clearInterval(intervalId);

console.log(response);
const { generations } = response.body;
spinner.succeed(`Listo mostro! (${time}s!) `);
console.log(generations[0].text);
