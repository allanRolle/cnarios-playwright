import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ButtonPage extends BasePage {
  readonly followButton: Locator

  constructor(page: Page) {
    super(page)
    this.followButton = page.locator('.css-15q2cw4').nth(1).locator('button')
  }

  async clickFollowButton() {
    await this.followButton.click()
  }

  async verifyStatus(status: 'Follow' | 'Processing...' | 'Following') {
    await expect(this.followButton).toHaveText(status)
  }
}
