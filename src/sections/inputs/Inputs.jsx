import { useState } from "react";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../../prompts";

import styles from "./inputs.module.css";

function Inputs(props) {
  const { setResults } = props;

  const [endpoint, setEndpoint] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [files, setFiles] = useState(null);

  const fetchCompletion = async (encodedImages) => {
    const aoaiClient = new OpenAI({
      apiKey: apiKey,
      baseURL: endpoint + "openai/deployments/gpt-4o",
      defaultQuery: { "api-version": "2024-10-21" },
      defaultHeaders: { "api-key": apiKey },
      dangerouslyAllowBrowser: true,
    });

    let content = [{ type: "text", text: SYSTEM_PROMPT }];

    for (let i = 0; i < encodedImages.length; i++) {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${encodedImages[i]}`,
          detail: "low",
        },
      });
    }

    try {
      const result = await aoaiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
        response_format: { type: "json_object" },
      });
      return JSON.parse(result.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let myArray = [];
    for (let i = 0; i < files.length; i++) {
      const base64String = await readFileAsDataURL(files[i]);
      myArray.push(base64String);
    }
    const result = await fetchCompletion(myArray);
    setResults(result);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Inputs</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="endpoint">Endpoint URL:</label>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          onChange={(e) => setEndpoint(e.target.value)}
        />

        <label htmlFor="apiKey">API Key:</label>
        <input
          type="password"
          id="apiKey"
          name="apiKey"
          onChange={(e) => setApiKey(e.target.value)}
        />

        <label htmlFor="file">Upload files:</label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          onChange={(e) => {
            setFiles(Array.from(e.target.files));
          }}
        />

        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Inputs;
