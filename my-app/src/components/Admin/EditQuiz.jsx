import { useNavigate, useParams, Form, json, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
export default function EditQuiz() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmiting, setIsSubmiting] = useState(null)

    const navigate = useNavigate()
    const questionId = useParams().id
    const data = useLoaderData()

    const quizQuestion = data.question
    useEffect(() => {
        setQuestion(quizQuestion.question)
        setOptions(quizQuestion.options)
        setAnswer(quizQuestion.answer)

    }, [])



    const [newOption, setNewOption] = useState(''); // State for new option

    const handleAddOption = () => {
        setOptions([...options, newOption]); // Add new option to the state
        setNewOption(''); // Clear new option input
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...options]; // Copy the options array
        updatedOptions.splice(index, 1); // Remove the option at the given index
        setOptions(updatedOptions); // Update the state with modified options
    };

    const handleSubmit = async (e) => {

        const formData = new FormData()
        const formElements = e.target.elements

        e.preventDefault();
        const questionData = {
            question: question,
            options: options,
            answer: answer,
            category: formElements.category.value
        }


        setIsSubmiting(true)
        try {

            const response = await fetch(`http://localhost/questions/${questionId}`, {
                method: 'PATCH',
                body: JSON.stringify(questionData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resData = await response.json()

            if (!response.ok) {
                throw new Error(resData.message)
            }
            console.log(resData)
        } catch (err) {
            setIsSubmiting(false)
            throw json({ message: "Field to create question , Please try again later." }, { status: 500 })
        }

        setIsSubmiting(false)
        navigate("/")

    };


    async function handleQuestionDelete() {

        try {
            const response = await fetch(`http://localhost/questions/${questionId}`, {
                method: 'DELETE',
            })

            const resData = await response.json()
            console.log(resData)
        } catch (err) {

            throw json({ message: "Field to delete question, Please try again later." }, { status: 500 })
        }

        navigate("/")
    }


    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800">Update Quiz Question</h2>
                <Form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
                    <input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {options.map((opt, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={opt}

                                onChange={(e) => {
                                    const updatedOptions = [...options];
                                    updatedOptions[index] = e.target.value;
                                    setOptions(updatedOptions);
                                }}

                                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="btn-remove-option"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Add Option"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full"
                        />
                        <button type="button" onClick={handleAddOption} className="btn-add-option">
                            Add Option
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}

                        className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="hidden" // Assuming file input styling is handled elsewhere
                    />
                    <label htmlFor='category'>Category </label>
                    <input
                        type="text"
                        placeholder="category"
                        id='category'
                        name='category'
                        defaultValue={quizQuestion && quizQuestion.category}

                        className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <button type="submit" className="btn-add-quiz">
                        {isSubmiting ? 'Submiting...' : 'Save  Quiz'}
                    </button>


                </Form>

                <button className="btn-add-quiz" onClick={handleQuestionDelete}>
                    Delete
                </button>
            </div>
        </>
    )
}

export async function loader({ req, params }) {
    const quizId = params.id


    try {
        const response = await fetch(`http://localhost/questions/${quizId}`)
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(resData.message)
        }
        // console.log(resData)
        return resData

    } catch (err) {
        throw json({ message: "Field to fetch question, Please try again later." }, { status: 500 })
    }

}