import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class TimepickerPage extends BasePage {
  readonly timeInput: Locator
  readonly confirmButton: Locator
  readonly successMessage: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.timeInput = page.locator('input[type="time"]')
    this.confirmButton = page.getByRole('button', { name: /confirm/i })
    this.successMessage = page.locator('.MuiAlert-colorSuccess')
    this.errorMessage = page.locator('.MuiAlert-colorError')
  }

  async open() {
    await this.page.goto('/concepts/timepicker#try-it-yourself')
  }

  /**
   * Remplit le champ heure et confirme
   * @param time format "HH:mm" (ex: "10:00")
   */
  async bookAppointment(time: string) {
    await this.timeInput.fill(time)
    await this.confirmButton.click()
  }

  /**
   * Vérifie si le message de succès contient l'heure attendue
   */
  async expectSuccessMessage(time: string) {
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toContainText(
      `Appointment successfully booked at ${time}`
    )
  }

  /**
   * Vérifie si le message d'erreur contient l'heure hors limites
   */
  async expectErrorMessage(time: string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(
      `Selected time ${time} is outside of salon hours (09:00 to 18:00)`
    )
  }
  /**
   * Capture l'aspect visuel du message d'erreur et l'enregistre
   * dans le dossier personnalisé assets/screenshots.
   */
  async verifyErrorAppearance() {
    await this.errorMessage.waitFor({ state: 'visible' })
    await expect(this.errorMessage).toHaveScreenshot('error-alert-style.png', {
      threshold: 0.2,
    })
  }

  async verifyConfirmationAppearance() {
    await this.successMessage.waitFor({ state: 'visible' })
    await expect(this.successMessage).toHaveScreenshot(
      'confirmation-alert.png',
      {
        threshold: 0.2,
      }
    )
  }
}
