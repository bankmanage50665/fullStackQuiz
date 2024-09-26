const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const questionController = require("../controller/question_controller");

router.post(
  "/add",
  [
    check("question").not().isEmpty(),
    check("options").isLength({ min: 2 }),
    check("answer").not().isEmpty(),
    check("category").not().isEmpty(),
  ],
  questionController.createQuestion
);
router.get("/allQuestions", questionController.getAllQuestions);
router.get("/:id", questionController.quizById)
router.patch("/:id", questionController.editQuiz)
router.delete("/:id", questionController.deleteQuestion)

module.exports = router;
