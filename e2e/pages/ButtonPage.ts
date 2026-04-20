import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class ButtonPage extends BasePage {
  readonly followButton: Locator
  readonly removeButton: Locator
  readonly disabledButton: Locator
  readonly buttonIcon: Locator
  readonly tooltip: Locator

  constructor(page: Page) {
    super(page)
    this.followButton = page.locator('.css-15q2cw4').nth(1).locator('button')
    this.disabledButton = page.locator('.css-15q2cw4').nth(0).locator('button')
    this.removeButton = page
      .locator('.css-12nllm1')
      .nth(1)
      .locator('.css-xz9haa')
    this.buttonIcon = this.followButton.locator('svg')
    this.tooltip = page.locator('.css-1ydfzmo')
  }

  async open() {
    await this.page.goto('/concepts/button#try-it-yourself')
  }

  async clickFollowButton() {
    await this.followButton.click()
  }

  async clickRemoveButton() {
    await this.removeButton.click()
  }

  async verifyStatus(status: 'Follow' | 'Processing...' | 'Following') {
    await expect(this.followButton).toHaveText(status)
  }
}
