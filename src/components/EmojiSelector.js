import { useState } from "react";

const EMOJIS = [
  "😀","😂","😍","🥰","😎","🤔","😢","😡","👍","👎",
  "❤️","🔥","🎉","✨","💯","🙏","👀","💀","🤣","😭",
  "😊","😇","🤩","😘","😋","😜","🤪","🤑","🤗","😴",
  "😷","🤒","🥳","🧐","😤","😈","👿","💩","🤡","👻",
  "🐶","🐱","🐭","🐸","🐵","🐔","🐧","🦊","🐻","🐼",
  "🍎","🍕","🍔","🍟","🌮","🍜","🍣","🍩","🍪","🎂",
  "⚽","🏀","🎮","🎯","🎲","🎸","🎹","🎤","🎧","🏆",
  "🌍","🌈","⭐","🌙","☀️","❄️","🌊","🌸","🌺","🍀"
];

function EmojiSelector({ onSelect }) {
  return (
    <div className="emoji__picker">
      {EMOJIS.map((emoji) => (
        <span
          key={emoji}
          className="emoji__item"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiSelector;