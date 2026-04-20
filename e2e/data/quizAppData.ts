export const quizAppData = [
  {
    name: 'Scenario Fail - No Selection (0/4)',
    answers: [],
    expectedScore: '0 / 4',
    expectedStatus: 'Fail',
  },
  {
    name: 'Scenario Fail Score (0/4)',
    answers: [
      'navigate().refresh()',
      'To close the browser',
      'Class Name',
      'To stop execution permanently',
    ],
    expectedScore: '0 / 4',
    expectedStatus: 'Fail',
  },
  {
    name: 'Scenario Partial Score (1/4)',
    answers: [
      'get(url)',
      'To close the browser',
      'XPath',
      'To refresh the browser',
    ],
    expectedScore: '1 / 4',
    expectedStatus: 'Fail',
  },
  {
    name: 'Scenario Partial Score (2/4)',
    answers: [
      'get(url)',
      'To locate a single web element',
      'Class Name',
      'To refresh the browser',
    ],
    expectedScore: '2 / 4',
    expectedStatus: 'Fail',
  },
  {
    name: 'Scenario Partial Score (3/4)',
    answers: [
      'get(url)',
      'To locate a single web element',
      'ID',
      'To refresh the browser',
    ],
    expectedScore: '3 / 4',
    expectedStatus: 'Pass',
  },
  {
    name: 'Scenario Perfect Score (4/4)',
    answers: [
      'get(url)',
      'To locate a single web element',
      'ID',
      'To provide explicit wait until a condition is met',
    ],
    expectedScore: '4 / 4',
    expectedStatus: 'Pass',
  },
]
