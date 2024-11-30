export default function QuizDetailModal({ data, openModal, setOpenModal }) {
  const calculateAverage = (results) => {
    const totalPoints = results.reduce((acc, result) => acc + result.points, 0);
    return (totalPoints / results.length).toFixed(2);
  };

  const passingScore = Math.ceil(data.questions.length * 0.6); // Example: 60% of total points

  return (
    <dialog id="modal1" className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <span>
          <h3 className="font-bold text-lg">{data.title} <span className="text-primary"> #{data.code.toUpperCase()}</span></h3>
        </span>
        <p className="py-4">
          <span className="font-bold">Average score:</span>{" "}
          <span className="text-primary">{data.results.length > 0 ? calculateAverage(data.results) : "0.00"}</span>
        </p>
        <p>
          <span className="font-bold">Passing score:</span>{" "}
          <span className="text-primary">{passingScore}</span>
        </p>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((result) => (
                <tr
                  key={result.id}
                  className={
                    result.points >= passingScore ? "bg-success text-white" : ""
                  }
                >
                  <td>{result.name}</td>
                  <td>{result.points} / {data.questions.length}</td>
                  <td>
                    {result.points >= passingScore ? (
                      <span className="text-xl">✅ Passed</span>
                    ) : (
                      <span className="text-xl">❌ Failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <button onClick={() => setOpenModal(false)} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
