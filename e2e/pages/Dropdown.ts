import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class DropdownPage extends BasePage {
  readonly countryInput: Locator
  readonly currencyText: Locator
  readonly noOptionsMessage: Locator
  readonly clearButton: Locator

  constructor(page: Page) {
    super(page)
    this.countryInput = page.getByLabel('Select Country').first()
    // On précise le texte de départ pour être plus sélectif
    this.currencyText = page.locator('h6.MuiTypography-root', {
      hasText: 'Currency:',
    })
    this.noOptionsMessage = page.getByText('No options')
    this.clearButton = page.getByLabel('Clear') // MUI ajoute souvent cet aria-label
  }

  async open() {
    await this.page.goto('/concepts/dropdown#try-it-yourself')
  }

  async selectCountry(country: string) {
    await this.countryInput.fill(country)
    // On précise que le nom doit être EXACT
    const option = this.page.getByRole('option', { name: country, exact: true })
    await option.waitFor({ state: 'visible' })
    await option.click()
  }

  async verifyCurrency(expectedCurrency: string) {
    // On utilise une regex pour plus de souplesse sur les espaces
    await expect(this.currencyText).toHaveText(
      new RegExp(`Currency: ${expectedCurrency}`)
    )
  }

  async clearSelection() {
    // On s'assure que le bouton est cliquable (MUI peut le cacher)
    await this.countryInput.hover()
    if (await this.clearButton.isVisible()) {
      await this.clearButton.click()
    }
  }
}
