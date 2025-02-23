import React from 'react';
import Loading from './Loading';

const AnswerDisplay = ({ answer, loading }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Answer:</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;