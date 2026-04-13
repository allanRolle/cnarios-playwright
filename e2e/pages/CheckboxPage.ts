import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class CheckboxPage extends BasePage {
  readonly setPreferencesButton: Locator
  readonly categoryDialog: Locator
  readonly categoryTechnology: Locator
  readonly categorySports: Locator
  readonly categoryBusiness: Locator
  readonly categoryScience: Locator
  readonly categoryHealth: Locator
  readonly categoryEntertainment: Locator
  readonly saveButton: Locator
  readonly articleCards: Locator
  readonly articleCategories: Locator
  readonly noNewsMessage: Locator

  constructor(page: Page) {
    super(page)
    this.setPreferencesButton = page.getByRole('button', {
      name: 'Set preferences',
    })
    this.categoryDialog = page.getByRole('dialog', {
      name: 'Select News Categories',
    })
    this.categoryTechnology = page.getByLabel('Technology')
    this.categorySports = page.getByLabel('Sports')
    this.categoryBusiness = page.getByLabel('Business')
    this.categoryScience = page.getByLabel('Science')
    this.categoryHealth = page.getByLabel('Health')
    this.categoryEntertainment = page.getByLabel('Entertainment')
    this.saveButton = page.getByRole('button', { name: 'Done' })
    this.articleCards = page.locator('.css-12nllm1')
    // Localise spécifiquement le texte de la catégorie à l'intérieur des cartes
    this.articleCategories = this.articleCards.locator('.css-1na2cob')
    this.noNewsMessage = page.getByText(
      'No news to display. Select categories using "Set Preferences".'
    )
  }
  async getAllVisibleCategories(): Promise<string[]> {
    const texts = await this.articleCategories.allTextContents()
    // On nettoie le texte pour ne garder que le nom de la catégorie
    return texts.map((t) => t.replace('Category: ', '').trim())
  }

  async unSelectAllCategories() {
    const checkboxes = [
      this.categoryTechnology,
      this.categorySports,
      this.categoryBusiness,
      this.categoryScience,
      this.categoryHealth,
      this.categoryEntertainment,
    ]
    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        await checkbox.uncheck()
      }
    }
  }

  async selectCategories(categories: string[]) {
    await this.setPreferencesButton.click()
    await expect(this.categoryDialog).toBeVisible()
    await this.unSelectAllCategories()
    for (const category of categories) {
      const checkbox = this.page.getByLabel(category)
      await checkbox.check()
    }
  }

  async savePreferences() {
    await this.saveButton.click()
  }

  async verifyArticlesMatchPreferences(expectedCategories: string[]) {
    const visibleCategories = await this.getAllVisibleCategories()
    // On vérifie que chaque catégorie visible est dans les catégories attendues
    for (const category of visibleCategories) {
      expect(expectedCategories).toContain(category)
    }
  }
}
