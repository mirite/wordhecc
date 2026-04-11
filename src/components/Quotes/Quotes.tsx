import React from "react";

import * as styles from "./Quotes.module.css";

const Quotes = () => {
  const quotes = [
    {
      source: "My Mom",
      text: "What's wrong with you?",
    },
    {
      source: "Also My Mom",
      text: "It's already difficult enough",
    },
    {
      source: "My Brother",
      text: "I'm in misery",
    },
    {
      source: "My Coworker",
      text: "It's the hardest word game I've ever played",
    },
    {
      source: "My Other Coworker",
      text: "You misunderstood what I was saying…",
    },
    {
      source: "My Other Other Coworker",
      text: "This is evil",
    },
    {
      source: "Me",
      text: "This used to be a lot harder",
    },
  ];
  return (
    <div className={styles.quotes}>
      {quotes.map((quote, i) => {
        return (
          <div className={"text-center " + styles.quote} key={i}>
            <blockquote className="blockquote">
              <em>&quot;{quote.text}&quot;</em>
            </blockquote>
            - {quote.source}
          </div>
        );
      })}
    </div>
  );
};

export default Quotes;
