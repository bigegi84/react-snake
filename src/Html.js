import React from "react";
import Game from "./Game";

class Html extends React.Component {
  componentDidMount() {
    Game();
  }
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>HTML5 snake - Canvas Snake Game</title>
        </head>
        <body>
          <h1>html5-snake</h1>
          <p>
            <a href="http://en.wikipedia.org/wiki/HTML5">HTML5</a> variation of
            the classic
            <a href="http://en.wikipedia.org/wiki/Snake_(video_game)">
              snake game
            </a>.
          </p>
          <div>
            <canvas id="the-game" width="320" height="240" />
          </div>
          <p>Control snake with arrow keys, WASD, or HJKL (vim keys).</p>
          <p>New food may appear under snake, uncoil to reveal.</p>
          <p>Collect the food to grow and increase speed.</p>
          <p>
            &copy; 2013 - <a href="http://JDStraughan.com">JDStraughan.com</a> -{" "}
            <a href="https://github.com/JDStraughan/html5-snake">
              Source on GitHub
            </a>
          </p>
        </body>
      </html>
    );
  }
}
export default Html;