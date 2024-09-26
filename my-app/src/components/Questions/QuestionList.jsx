import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom";
import "../Admin/style.css"


import { json, useLoaderData } from "react-router-dom"
export default function QuestionsList() {

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const activeType = searchParams.get('type');
    const data = useLoaderData();
    const questions = data.questions;

    function handleAnswer(id, index) {
        const question = questions.find((question) => question.id === id);
        const isCorrect = question.answer.toLowerCase() === question.options[index].toLowerCase();

        setSelectedAnswers(prevState => ({
            ...prevState,
            [id]: { index, isCorrect }
        }));
    }

    function getOptionStyle(questionId, optionIndex) {
        const selected = selectedAnswers[questionId];
        if (!selected || selected.index !== optionIndex) {
            return 'bg-slate-800';
        }
        return selected.isCorrect ? 'bg-green-500' : 'bg-red-500';
    }
    const clearFilter = () => {
        setSearchParams({});
    };


    const filterQuiz = activeType ? questions.filter((questions) => questions.category.toLowerCase() === activeType) : questions






    const filterButtonClass = (type) => `
        px-4 py-2 rounded-full font-medium transition-colors duration-200
        ${activeType === type
            ? 'bg-blue-500 text-white'
            : 'bg-white text-blue-500 hover:bg-blue-100'}
      `;

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    <div className="flex justify-center space-x-4 mb-6">
                        <Link to={`?type=science`} className={filterButtonClass('science')}>Science</Link>
                        <Link to={`?type=math`} className={filterButtonClass('math')}>Math</Link>
                        <Link to={`?type=bio`} className={filterButtonClass('bio')}>Bio</Link>
                        <button onClick={clearFilter} className="px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200">
                            Clear filter
                        </button>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-8">Quiz App</h1>

                    <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                        <ul className="space-y-6">
                            {filterQuiz.map((question, index) => (
                                <li key={index} className="border-b pb-6">
                                    <h3 className="text-xl font-semibold mb-3">Q. {index + 1}: {question.question}</h3>
                                    <ul className="space-y-2 mb-4">
                                        {question.options.map((option, optionIndex) => (
                                            <li
                                                key={optionIndex}
                                                onClick={() => handleAnswer(question.id, optionIndex)}
                                                className={`
                            py-2 px-4 rounded-md font-medium cursor-pointer text-white transition-colors duration-200
                            ${getOptionStyle(question.id, optionIndex)}
                          `}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to={`${question.id}/edit`}
                                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        Edit Quiz
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>

    )

}

export async function loader() {

    try {
        const response = await fetch("http://localhost/questions/allQuestions")
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(resData.message)
        }
        return resData
    } catch (err) { throw json({ message: "Field to fetch questions, Please try again later" }, { status: 500 }) }


}