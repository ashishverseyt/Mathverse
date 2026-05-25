/**
 * Quizzes Database
 * Interactive quizzes to test knowledge
 */

const quizzes = [
  {
    id: 'quiz001',
    moduleId: 'mod001',
    title: 'Introduction to Algebra Quiz',
    description: 'Test your understanding of basic algebraic concepts',
    difficulty: 'beginner',
    timeLimit: 15,
    questions: [
      {
        id: 'q001',
        type: 'multiple_choice',
        question: 'What is the solution to x + 5 = 12?',
        options: [
          { id: 'opt1', text: 'x = 5', correct: false },
          { id: 'opt2', text: 'x = 7', correct: true },
          { id: 'opt3', text: 'x = 17', correct: false },
          { id: 'opt4', text: 'x = 2.4', correct: false }
        ],
        explanation: 'Subtract 5 from both sides: x = 12 - 5 = 7'
      },
      {
        id: 'q002',
        type: 'multiple_choice',
        question: 'Solve: 2x - 3 = 9',
        options: [
          { id: 'opt1', text: 'x = 3', correct: false },
          { id: 'opt2', text: 'x = 6', correct: true },
          { id: 'opt3', text: 'x = 4.5', correct: false },
          { id: 'opt4', text: 'x = 12', correct: false }
        ],
        explanation: 'Add 3 to both sides: 2x = 12. Then divide by 2: x = 6'
      },
      {
        id: 'q003',
        type: 'short_answer',
        question: 'What is the value of 3x + 2 when x = 4?',
        correctAnswer: '14',
        explanation: 'Substitute x = 4: 3(4) + 2 = 12 + 2 = 14'
      },
      {
        id: 'q004',
        type: 'multiple_choice',
        question: 'Which expression is equivalent to 2(x + 3)?',
        options: [
          { id: 'opt1', text: '2x + 3', correct: false },
          { id: 'opt2', text: '2x + 6', correct: true },
          { id: 'opt3', text: 'x + 6', correct: false },
          { id: 'opt4', text: '2x + 2', correct: false }
        ],
        explanation: 'Using distributive property: 2(x + 3) = 2x + 6'
      },
      {
        id: 'q005',
        type: 'multiple_choice',
        question: 'Solve for x: x/2 = 5',
        options: [
          { id: 'opt1', text: 'x = 2.5', correct: false },
          { id: 'opt2', text: 'x = 10', correct: true },
          { id: 'opt3', text: 'x = 5', correct: false },
          { id: 'opt4', text: 'x = 7', correct: false }
        ],
        explanation: 'Multiply both sides by 2: x = 5 × 2 = 10'
      }
    ]
  },
  {
    id: 'quiz002',
    moduleId: 'mod002',
    title: 'Quadratic Equations Quiz',
    description: 'Test your knowledge of quadratic equations and the quadratic formula',
    difficulty: 'intermediate',
    timeLimit: 25,
    questions: [
      {
        id: 'q006',
        type: 'multiple_choice',
        question: 'What is the discriminant of x² + 5x + 6 = 0?',
        options: [
          { id: 'opt1', text: '1', correct: true },
          { id: 'opt2', text: '0', correct: false },
          { id: 'opt3', text: '-4', correct: false },
          { id: 'opt4', text: '49', correct: false }
        ],
        explanation: 'Δ = b² - 4ac = 5² - 4(1)(6) = 25 - 24 = 1'
      },
      {
        id: 'q007',
        type: 'multiple_choice',
        question: 'Factor: x² - 4',
        options: [
          { id: 'opt1', text: '(x - 2)(x + 2)', correct: true },
          { id: 'opt2', text: '(x - 4)(x + 1)', correct: false },
          { id: 'opt3', text: '(x - 2)(x - 2)', correct: false },
          { id: 'opt4', text: 'Cannot be factored', correct: false }
        ],
        explanation: 'This is a difference of squares: x² - 4 = (x - 2)(x + 2)'
      },
      {
        id: 'q008',
        type: 'short_answer',
        question: 'What are the roots of x² + 5x + 6 = 0?',
        correctAnswer: '-2, -3',
        explanation: 'Factor: (x + 2)(x + 3) = 0, so x = -2 or x = -3'
      },
      {
        id: 'q009',
        type: 'multiple_choice',
        question: 'How many real solutions does x² + 2x + 1 = 0 have?',
        options: [
          { id: 'opt1', text: '0', correct: false },
          { id: 'opt2', text: '1', correct: true },
          { id: 'opt3', text: '2', correct: false },
          { id: 'opt4', text: 'Infinitely many', correct: false }
        ],
        explanation: 'Discriminant Δ = 4 - 4 = 0, so there is exactly 1 repeated real root'
      }
    ]
  },
  {
    id: 'quiz003',
    moduleId: 'mod003',
    title: 'Trigonometry Basics Quiz',
    description: 'Test your understanding of trigonometric ratios',
    difficulty: 'intermediate',
    timeLimit: 20,
    questions: [
      {
        id: 'q010',
        type: 'multiple_choice',
        question: 'In a right triangle, sin(θ) = 3/5. What is cos(θ)?',
        options: [
          { id: 'opt1', text: '4/5', correct: true },
          { id: 'opt2', text: '3/4', correct: false },
          { id: 'opt3', text: '5/3', correct: false },
          { id: 'opt4', text: '2/5', correct: false }
        ],
        explanation: 'Using Pythagorean theorem: 3² + 4² = 5², so cos(θ) = 4/5'
      },
      {
        id: 'q011',
        type: 'multiple_choice',
        question: 'What is sin(30°)?',
        options: [
          { id: 'opt1', text: '1/2', correct: true },
          { id: 'opt2', text: '√3/2', correct: false },
          { id: 'opt3', text: '√2/2', correct: false },
          { id: 'opt4', text: '1', correct: false }
        ],
        explanation: 'sin(30°) = 1/2 is a standard angle value to memorize'
      },
      {
        id: 'q012',
        type: 'short_answer',
        question: 'What is tan(45°)?',
        correctAnswer: '1',
        explanation: 'In a 45-45-90 triangle, opposite = adjacent, so tan(45°) = 1'
      }
    ]
  },
  {
    id: 'quiz004',
    moduleId: 'mod005',
    title: 'Statistics Quiz',
    description: 'Test your understanding of mean, median, mode, and standard deviation',
    difficulty: 'beginner',
    timeLimit: 20,
    questions: [
      {
        id: 'q013',
        type: 'short_answer',
        question: 'Find the mean of: 2, 4, 6, 8',
        correctAnswer: '5',
        explanation: 'Mean = (2 + 4 + 6 + 8) / 4 = 20 / 4 = 5'
      },
      {
        id: 'q014',
        type: 'short_answer',
        question: 'Find the median of: 1, 3, 5, 7, 9',
        correctAnswer: '5',
        explanation: 'When sorted, the middle value (3rd of 5) is 5'
      },
      {
        id: 'q015',
        type: 'short_answer',
        question: 'Find the mode of: 2, 2, 3, 3, 3, 4, 5',
        correctAnswer: '3',
        explanation: 'The value 3 appears most frequently (3 times)'
      },
      {
        id: 'q016',
        type: 'multiple_choice',
        question: 'In a normal distribution, approximately what percentage of data is within 1 standard deviation of the mean?',
        options: [
          { id: 'opt1', text: '50%', correct: false },
          { id: 'opt2', text: '68%', correct: true },
          { id: 'opt3', text: '95%', correct: false },
          { id: 'opt4', text: '99.7%', correct: false }
        ],
        explanation: 'The empirical rule states that about 68% falls within 1 SD'
      }
    ]
  }
];

module.exports = quizzes;
