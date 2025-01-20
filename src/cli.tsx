import React from 'react';
import { formattedRender } from './render';

import { Prompt, Purpose, Instructions } from './index';

// Test data
const MyPrompt = () => {
  return (
    <Prompt>
      Please do something cool:
      <Purpose>To do what you are told</Purpose>
      <Instructions instructions={['Do something', 'Do something else']} />
    </Prompt>
  );
};

// Render the component to string
const output = formattedRender(<MyPrompt />);

// Output the formatted result
console.log(output);
