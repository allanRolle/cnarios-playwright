import { test, expect } from '../fixtures/fixtures'

test.describe('Button Component', () => {
  test.describe('Happy Paths', () => {
    test("Button text and icon should change to 'Following' with a check icon", async ({
      buttonPage,
    }) => {
      await expect(buttonPage.followButton).toBeVisible()
      await expect(buttonPage.buttonIcon).toHaveClass(/add-person-icon/)
      await expect(buttonPage.followButton).toHaveText('Follow')
      await buttonPage.clickFollowButton()
      await buttonPage.verifyStatus('Following')
      await expect(buttonPage.buttonIcon).toHaveClass(/done-icon/)
    })
    test("Tooltip should display 'Click to follow' or 'Click to unfollow' based on state", async ({
      buttonPage,
    }) => {
      await Promise.all([
        buttonPage.followButton.hover(),
        expect(buttonPage.tooltip).toBeVisible(),
      ])

      await expect(buttonPage.tooltip).toHaveText('Follow')
      await buttonPage.clickFollowButton()
      await Promise.all([
        buttonPage.followButton.hover(),
        expect(buttonPage.tooltip).toHaveText('Unfollow'),
      ])
    })
    test("'Processing...' should appear before state changes and the button should be disabled during this time", async ({
      buttonPage,
    }) => {
      await buttonPage.clickFollowButton()
      await Promise.all([
        expect(buttonPage.followButton).toBeDisabled(),
        buttonPage.verifyStatus('Processing...'),
      ])
      await expect(buttonPage.followButton).toBeEnabled({ timeout: 10000 })
      await buttonPage.verifyStatus('Following')
    })
    test("Button should return to Follow state after clicking 'Following'", async ({
      buttonPage,
    }) => {
      await buttonPage.clickFollowButton()
      await buttonPage.verifyStatus('Following')
      await buttonPage.clickFollowButton()
      await buttonPage.verifyStatus('Follow')
    })
    test('The selected suggestion card should be removed from the visible list', async ({
      buttonPage,
    }) => {
      const initialCards = await buttonPage.page.locator('.css-12nllm1').count()
      await buttonPage.clickRemoveButton()
      await expect(buttonPage.page.locator('.css-12nllm1')).toHaveCount(
        initialCards - 1
      )
    })
  })
  test.describe('Negative paths and edge cases', () => {
    test('Rapidly clicking the Follow button should not cause inconsistent states', async ({
      buttonPage,
    }) => {
      await buttonPage.clickFollowButton()
      await buttonPage.clickFollowButton()
      await buttonPage.verifyStatus('Processing...')
      await expect(buttonPage.followButton).toBeDisabled()
      await expect(buttonPage.followButton).toBeEnabled({ timeout: 10000 })
      const status = await buttonPage.followButton.textContent()
      expect(['Follow', 'Following']).toContain(status)
    })
    test('Unable to follow if button is desabled', async ({ buttonPage }) => {
      await expect(buttonPage.disabledButton).toBeDisabled()
      await buttonPage.disabledButton.click({ force: true })
      await expect(buttonPage.disabledButton).toBeDisabled()
    })
    test('Ignore clicks near button (missed clicks) should not trigger state changes', async ({
      buttonPage,
    }) => {
      const initialStatus = await buttonPage.followButton.textContent()
      await buttonPage.page.mouse.click(
        (await buttonPage.followButton.boundingBox())!.x - 10,
        (await buttonPage.followButton.boundingBox())!.y + 10
      )
      await buttonPage.verifyStatus(initialStatus as 'Follow' | 'Following')
    })
    test('Button remains functional when visually hidden', async ({
      buttonPage,
    }) => {
      await buttonPage.followButton.evaluate((button) => {
        button.style.opacity = '0'
      })
      await buttonPage.clickFollowButton()
      await buttonPage.verifyStatus('Following')
    })
  })
})
