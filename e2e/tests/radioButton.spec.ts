import { test, expect } from '../fixtures/fixtures'
import { quizAppData } from '../data/quizAppData'

test.describe('Radio Button Component', () => {
  test.describe('Data-driven scenarios', () => {
    for (const [index, data] of quizAppData.entries()) {
      test(`should test scenario ${index + 1}: ${data.name}`, async ({
        radioButtonPage,
      }) => {
        for (const answer of data.answers) {
          await radioButtonPage.selectAnswer(answer)
        }
        await radioButtonPage.clickSubmit()
        await radioButtonPage.verifyStatus(data.expectedStatus)
        await radioButtonPage.verifyScore(data.expectedScore)
      })
    }
  })
  test.describe('Quiz Lifecycle & State', () => {
    test('should reset the quiz and allow retaking it', async ({
      radioButtonPage,
    }) => {
      // Select some answers and submit
      await radioButtonPage.selectAnswer('get(url)')
      await radioButtonPage.selectAnswer('To locate a single web element')
      await radioButtonPage.clickSubmit()

      // Verify score and status
      await radioButtonPage.verifyStatus('Fail')
      await radioButtonPage.verifyScore('2 / 4')

      // Click Try Again
      await radioButtonPage.clickTryAgain()

      // Verify that the quiz is reset - no answers selected, score and status not visible
      await expect(radioButtonPage.submitButton).toBeVisible()
      await expect(radioButtonPage.statusText).not.toBeVisible()
      await expect(radioButtonPage.scoreText).not.toBeVisible()
    })
    ;(test('Select one answer, then select another answer from the same question and verify selection changes', async ({
      radioButtonPage,
    }) => {
      const text1 = 'get(url)'
      const text2 = 'navigate().refresh()'

      await radioButtonPage.selectAnswer(text1)

      await radioButtonPage.selectAnswer(text2)

      const firstAnswerInput = radioButtonPage.page.getByLabel(text1)
      const secondAnswerInput = radioButtonPage.page.getByLabel(text2)

      await expect(firstAnswerInput).not.toBeChecked()
      await expect(secondAnswerInput).toBeChecked()
    }),
      test('Quiz resets if user leaves the page and comes back', async ({
        radioButtonPage,
      }) => {
        await radioButtonPage.selectAnswer('get(url)')
        await radioButtonPage.clickSubmit()
        await radioButtonPage.verifyStatus('Fail')
        await radioButtonPage.verifyScore('1 / 4')

        // Simulate leaving the page and coming back
        await radioButtonPage.page.reload()

        // Verify that the quiz is reset - no answers selected, score and status not visible
        await expect(radioButtonPage.submitButton).toBeVisible()
        await expect(
          radioButtonPage.page.getByLabel('get(url)')
        ).not.toBeChecked()
        await expect(radioButtonPage.statusText).not.toBeVisible()
        await expect(radioButtonPage.scoreText).not.toBeVisible()
      }))
  })
})
