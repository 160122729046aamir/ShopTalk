import { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import InputForm from './components/InputForm';
import AnswerDisplay from './components/AnswerDisplay';
import Footer from './components/Footer';

function App() {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/ask', { prompt: input });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setAnswer('Failed to fetch the answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <InputForm onSubmit={handleSubmit} />
        <AnswerDisplay answer={answer} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}

export default App;