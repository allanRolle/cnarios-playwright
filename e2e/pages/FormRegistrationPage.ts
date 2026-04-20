import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class FormRegistrationPage extends BasePage {
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly phoneNumberInput: Locator
  readonly ticketsInput: Locator
  readonly eventSelectInput: Locator
  readonly errorMessage: Locator
  readonly errorMessageEventField: Locator
  readonly registerButton: Locator
  readonly resetButton: Locator
  readonly confirmationModal: Locator
  readonly confirmName: Locator
  readonly confirmEmail: Locator
  readonly confirmPhone: Locator
  readonly confirmEvent: Locator
  readonly confirmTotalTickets: Locator
  readonly confirmTicketsList: Locator
  readonly confirmTicketsListItem: Locator
  readonly closeModalButton: Locator
  readonly confirmButton: Locator

  constructor(page: Page) {
    super(page)

    // Locators - On définit les sélecteurs dans le constructeur
    this.nameInput = page.locator("[data-testid='input-fullname']")
    this.emailInput = page.locator("[data-testid='input-email']")
    this.phoneNumberInput = page.locator("[data-testid='input-phone']")
    this.ticketsInput = page.locator("[data-testid='input-tickets']")
    this.eventSelectInput = page.locator(
      '[role="combobox"][aria-labelledby="select-event-label"]'
    )

    // Messages d'erreur
    this.errorMessage = page.locator('.Mui-error.css-nl47j')
    this.errorMessageEventField = page.locator("[data-testid='error-event']")

    // Boutons
    this.registerButton = page.locator("[data-testid='btn-submit']")
    this.resetButton = page.locator("[data-testid='btn-reset']")

    // Modal de confirmation et ses sous-éléments
    this.confirmationModal = page.locator('.css-gjytzw')
    this.confirmName = this.confirmationModal.locator(
      '[data-testid="confirm-fullname"]'
    )
    this.confirmEmail = this.confirmationModal.locator(
      '[data-testid="confirm-email"]'
    )
    this.confirmPhone = this.confirmationModal.locator(
      '[data-testid="confirm-phone"]'
    )
    this.confirmEvent = this.confirmationModal.locator(
      '[data-testid="confirm-event"]'
    )
    this.confirmTotalTickets = this.confirmationModal.locator(
      '[data-testid="confirm-tickets"]'
    )
    this.confirmTicketsList = this.confirmationModal.locator(
      "[data-testid='ticket-id-list']"
    )
    this.confirmTicketsListItem = this.confirmationModal.locator(
      "[data-testid='ticket-id-item']"
    )
    this.closeModalButton = this.confirmationModal.locator('.css-j7n7h8')
    this.confirmButton = this.confirmationModal.locator(
      "[data-testid='btn-confirm']"
    )
  }

  async open() {
    await this.page.goto('/concepts/form#try-it-yourself')
  }

  async setName(name: string) {
    await this.nameInput.fill(name) // fill() vide et tape automatiquement
  }

  async setEmail(email: string) {
    await this.emailInput.fill(email)
  }

  async setPhoneNumber(phone: string) {
    await this.phoneNumberInput.fill(phone)
  }

  async setEvent(eventName: string) {
    const isReset = eventName === '' || eventName === '-- Select --'

    // 1. Ouverture du Select
    await this.eventSelectInput.click()

    if (isReset) {
      // Simulation clavier : Home puis Enter
      await this.page.keyboard.press('Home')
      await this.page.keyboard.press('Enter')
    } else {
      // Simulation clavier : Tape le nom puis Enter
      // On utilise type() avec un délai pour simuler l'humain si nécessaire
      await this.page.keyboard.type(eventName, { delay: 50 })
      await this.page.keyboard.press('Enter')
    }

    // 2. Déclenchement de la validation (onBlur)
    // Cliquer sur le texte statique pour perdre le focus
    await this.page.getByText('Event Registration').first().click()

    // 3. Stabilisation (Assertion optionnelle intégrée)
    if (!isReset) {
      await expect(this.eventSelectInput).toContainText(eventName)
    }
  }

  async setNumberOfTickets(count: number) {
    await this.ticketsInput.fill(count.toString())
    await this.ticketsInput.blur()
  }

  async clickRegisterButton() {
    await this.registerButton.click()
  }

  async clickResetButton() {
    await this.resetButton.click()
  }

  async clickCloseModalButton() {
    await this.closeModalButton.click()
  }

  async clickConfirmButton() {
    await this.confirmButton.click()
  }
}
