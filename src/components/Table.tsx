import React from "react";

const Table = ({ answers, playerName }) => {
  return (
    <>
      <div className="flex gap-5">
        <h2 className="font-bold text-xl">Quiz Ended</h2>
        <h2 className="font-bold text-lg">{playerName}'s Answers</h2>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      Your Answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((answer, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {answer.question}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        {answer.answer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
