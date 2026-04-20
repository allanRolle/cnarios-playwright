import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class RadioButtonPage extends BasePage {
  readonly scoreText: Locator
  readonly submitButton: Locator
  readonly tryAgainButton: Locator
  readonly statusText: Locator

  constructor(page: Page) {
    super(page)
    this.submitButton = page.getByRole('button', { name: 'Submit' })
    this.tryAgainButton = page.getByRole('button', { name: 'Try Again' })
    this.scoreText = page.getByText(/Your Score:\s*\d+\s*\/\s*\d+/i)
    this.statusText = page.getByText(/Status:\s*(Pass|Fail)/i)
  }

  async open() {
    await this.page.goto('/concepts/radio#try-it-yourself')
  }

  async selectAnswer(answerText: string) {
    await this.page
      .locator('label')
      .getByText(answerText, { exact: true })
      .click()
  }

  async verifyScore(expectedScore: string) {
    const escapedScore = expectedScore.replace(/\//g, '\\/')
    const scoreRegex = new RegExp(`Your Score:\\s*${escapedScore}`, 'i')
    await expect(this.page.getByText(scoreRegex)).toBeVisible()
  }

  async verifyStatus(expectedStatus: string) {
    const statusRegex = new RegExp(`s*${expectedStatus}`, 'i')
    await expect(this.page.getByText(statusRegex)).toBeVisible()
  }

  async clickSubmit() {
    await this.submitButton.click()
  }

  async clickTryAgain() {
    await this.tryAgainButton.click()
  }
}
