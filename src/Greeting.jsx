import { useState } from 'react';

function Greeting(props) {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <h2>Hello {props.name}, welcome to react</h2>
      <button onClick={() => setLikes(likes + 1)}>
        Likes: {likes}
      </button>
    </div>
  );
}

export default Greeting;