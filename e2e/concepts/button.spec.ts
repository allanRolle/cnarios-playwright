import { test, expect } from '../fixtures'

test.describe('Button Component', () => {
  test("Button text and icon should change to 'Following' with a check icon", async ({
    buttonPage,
  }) => {
    await buttonPage.verifyStatus('Follow')
    await Promise.all([
      buttonPage.followButton.click(),
      expect(buttonPage.followButton).toBeDisabled(),
      await buttonPage.verifyStatus('Processing...'),
    ])
    await expect(buttonPage.followButton).toBeEnabled({ timeout: 10000 })
    await buttonPage.verifyStatus('Following')
  })
})
