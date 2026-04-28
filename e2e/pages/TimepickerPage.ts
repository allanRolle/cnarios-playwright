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
    // 1. On s'assure que l'alerte d'erreur est bien affichée
    await this.errorMessage.waitFor({ state: 'visible' })

    // 2. Capture d'écran physique vers ton dossier spécifique
    // L'option 'path' est parfaitement supportée ici
    await this.errorMessage.screenshot({
      path: 'assets/screenshots/error-alert-style.png',
    })

    // 3. Assertion visuelle (Visual Testing)
    // On laisse Playwright gérer la comparaison dans son dossier de snapshots standard
    await expect(this.errorMessage).toHaveScreenshot('error-alert-style.png', {
      threshold: 0.2,
    })
  }

  /**
   * Capture l'aspect visuel du message de confirmation et l'enregistre
   * dans le dossier personnalisé assets/screenshots.
   */
  async verifyConfirmationAppearance() {
    // 1. On attend que l'alerte soit stable
    await this.successMessage.waitFor({ state: 'visible' })

    // 2. On effectue la capture d'écran brute vers ton dossier
    // Ici, l'option 'path' est 100% valide et reconnue par l'IDE
    await this.successMessage.screenshot({
      path: 'assets/screenshots/confirmation-alert-style.png',
    })

    // 3. (Optionnel) On fait une vérification visuelle classique Playwright
    // Si tu veux aussi que Playwright gère la comparaison de pixels
    await expect(this.successMessage).toHaveScreenshot('confirmation-alert.png')
  }
}
