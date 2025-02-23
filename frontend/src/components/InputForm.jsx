import { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex justify-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about ShopTalk..."
          className="w-1/2 px-6 py-3 rounded-l-lg border-2 border-blue-500 focus:outline-none focus:border-purple-600 text-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300 text-lg"
        >
          Get Answer
        </button>
      </div>
    </form>
  );
};

export default InputForm;