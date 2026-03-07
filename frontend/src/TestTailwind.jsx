const TestTailwind = () => {
  return (
    <div className="p-8">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        ✅ If this has blue background and white text, Tailwind is WORKING!
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-green-500 p-4 rounded text-white">Green Box</div>
        <div className="bg-red-500 p-4 rounded text-white">Red Box</div>
      </div>
    </div>
  );
};

export default TestTailwind;