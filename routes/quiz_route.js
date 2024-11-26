// // quizroute.js

// const express = require("express");
// const router = express.Router();
// const quizController = require("../controller/quizcontroller");
// const authMiddleware = require("../middleware/authmiddleware");

// router.post("/submitQuiz", authMiddleware, async (req, res) => {
//   try {
//     const { userResponses } = req.body;
//     const userId = req.user._id; 

//     if (!userResponses || !Array.isArray(userResponses)) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Invalid request body" });
//     }

//     const userHasTakenQuiz = await quizController.hasUserTakenQuiz(userId);

//     if (userHasTakenQuiz) {
//       return res.status(400).json({
//         success: false,
//         error: "User has already taken the quiz. No reattempt allowed.",
//       });
//     }

//     const quizResults = await quizController.calculateQuizResults(
//       userResponses,
//       userId
//     );

//     res.json(quizResults);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });


// router.get("/quizResults", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming you have the user information in req.user
//     const quizResults = await quizController.getUserQuizResults(userId);

//     res.json({ success: true, quizResults });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// router.get("/totalUsers", authMiddleware, async (req, res) => {
//   try {
//     const totalUsers = await quizController.getTotalAttemptedUsers();
//     res.json({ success: true, totalUsers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizcontroller");
const authMiddleware = require("../middleware/authmiddleware");

// Submit Quiz API
router.post("/submitQuiz", authMiddleware, async (req, res) => {
  try {
    const { userResponses } = req.body;
    const userId = req.user._id;

    if (!userResponses || !Array.isArray(userResponses)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid request body" });
    }

    const userHasTakenQuiz = await quizController.hasUserTakenQuiz(userId);

    if (userHasTakenQuiz) {
      return res.status(400).json({
        success: false,
        error: "User has already taken the quiz. No reattempt allowed.",
      });
    }

    const quizResults = await quizController.calculateQuizResults(
      userResponses,
      userId
    );

    // Send quiz results back to the frontend
    res.json({ success: true, quizResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get Quiz Results API
router.get("/quizResults", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const quizResults = await quizController.getUserQuizResults(userId);

    if (!quizResults) {
      return res.status(404).json({ success: false, error: "Quiz results not found." });
    }

    res.json({ success: true, quizResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get Total Users Attempted API
router.get("/totalUsers", authMiddleware, async (req, res) => {
  try {
    const totalUsers = await quizController.getTotalAttemptedUsers();
    res.json({ success: true, totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
