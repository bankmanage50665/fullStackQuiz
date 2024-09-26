const { validationResult } = require("express-validator");

const HttpError = require("../utils/HttpError");
const Question = require("../model/question_modal");

async function createQuestion(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return next(new HttpError("Question credentials are invalid", 500));
  }

  const { question, options, category, answer } = req.body;

  const createdQuestion = new Question({
    question,
    options,
    answer,
    category,
  });

  try {
    await createdQuestion.save();
  } catch (err) {
    return next(
      new HttpError("Field to created question, Please try again later.", 401)
    );
  }

  return res.status(201).json({
    message: "Question created successfully",
    questionId: createdQuestion.id,

    question: createQuestion,
  });
}

async function getAllQuestions(req, res, next) {
  let questions;

  try {
    questions = await Question.find();
  } catch (err) {
    return next(new HttpError("Field to fetch question list.", 500));
  }

  res.json({
    message: "List of questions fetch sucessfully.",
    questions: questions.map((questions) =>
      questions.toObject({ getters: true })
    ),
  });
}

async function quizById(req, res, next) {
  const questionId = req.params.id;
  try {
    findQuestionById = await Question.findById(questionId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find question by provided id. Please try again later.",
        500
      )
    );
  }

  if (!findQuestionById) {
    return next(new HttpError("Couldn't find question by provided id.", 500));
  }

  res.json({
    message: "Find question sucessfully.",
    question: findQuestionById.toObject({ getters: true }),
  });
}

async function editQuiz(req, res, next) {
  const questionId = req.params.id;
  const { question, options, answer, category } = req.body;
  let findQuestionForUpdate;
  try {
    findQuestionForUpdate = await Question.findById(questionId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find question for update. Please try again later.",
        500
      )
    );
  }

  if (!findQuestionForUpdate) {
    return next(new HttpError("Couldn't find question for update.", 500));
  }

  findQuestionForUpdate.question = question;
  findQuestionForUpdate.options = options;
  findQuestionForUpdate.answer = answer;
  findQuestionForUpdate.category = category;

  try {
    await findQuestionForUpdate.save();
  } catch (err) {
    return next(
      new HttpError("Field to update question, Please again later.", 500)
    );
  }

  res.json({
    message: "Question update sucessfully.",
    question: findQuestionForUpdate.toObject({ getters: true }),
  });
}

async function deleteQuestion(req, res, next) {
  const questionId = req.params.id;
  let findQuestionToDelete;

  try {
    findQuestionToDelete = await Question.findById(questionId);
  } catch (err) {
    return next(
      new HttpError(
        "Field to find question for delete. Please try again later.",
        500
      )
    );
  }

  if (!findQuestionToDelete) {
    return next(new HttpError("Couldn't find question for delete.", 500));
  }

  try {
    await findQuestionToDelete.deleteOne();
  } catch (err) {
    return next(
      new HttpError("Field to delete question, Please again later.", 500)
    );
  }

  res.json({
    message: "Question delete sucessfully.",
    question: findQuestionToDelete.toObject({ getters: true }),
  });
}

module.exports = {
  createQuestion,
  getAllQuestions,
  editQuiz,
  quizById,
  deleteQuestion,
};
