import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class DatePickerPage extends BasePage {
  readonly datePickerButton: Locator
  readonly datePickerTitle: Locator
  readonly mandatoryFieldsAlert: Locator
  readonly companyNameInput: Locator
  readonly startDateInput: Locator
  readonly endDateInput: Locator
  readonly addButton: Locator
  readonly employmentHistoryTitle: Locator
  readonly employmentListItems: Locator
  readonly employmentOverlapAlert: Locator
  constructor(page: Page) {
    super(page)
    this.datePickerTitle = page.getByRole('heading', { name: 'Add Employment' })
    this.datePickerButton = page.getByRole('button', {
      name: 'Add Employment',
    })
    this.mandatoryFieldsAlert = page.getByRole('alert')
    this.companyNameInput = page.getByLabel('Company Name *')
    this.startDateInput = page.getByLabel('Start Date *')
    this.endDateInput = page.getByLabel('End Date *')
    this.addButton = page.getByRole('button', { name: 'Add' })
    this.employmentHistoryTitle = page.getByRole('heading', {
      name: 'Employment History',
    })
    this.employmentListItems = page.locator(
      'div.MuiStack-root > div.MuiBox-root'
    )
    this.employmentOverlapAlert = page.getByText(
      'Overlapping employment detected. Please adjust the dates.'
    )
  }

  async open() {
    await this.page.goto('/concepts/datepicker#try-it-yourself')
  }

  async openDatePicker() {
    await this.datePickerButton.click()
  }

  async fillEmploymentDetails(company: string, start: string, end: string) {
    await this.companyNameInput.fill(company)
    await this.startDateInput.fill(start)
    await this.endDateInput.fill(end)
  }

  /**
   * Vérifie qu'une expérience spécifique est présente dans la liste
   * en s'assurant que le nom et la date sont dans le même bloc.
   * @param companyName Nom de l'entreprise à vérifier
   * @param startDate Date de début de l'expérience
   */
  async verifyEmploymentIsListed(companyName: string, startDate: string) {
    // On trouve le bouton delete qui est à côté du nom de l'entreprise
    const deleteButton = this.page
      .getByLabel('delete employment')
      .filter({ hasText: companyName }) // Si le texte est dans le parent du bouton

    // On remonte au parent commun pour vérifier la date
    const card = this.page
      .locator('div.MuiBox-root')
      .filter({ has: this.page.getByText(`Company: ${companyName}`) })
      .last() // Pour prendre le conteneur le plus proche du texte

    await expect(card).toContainText(`Start: ${startDate}`)
  }

  /**
   * Vérifie le nombre total d'expériences affichées
   */
  async verifyEmploymentCount(count: number) {
    const deleteButtons = this.page.getByLabel('delete employment')
    await expect(deleteButtons).toHaveCount(count)
  }

  /**
   * Supprime une expérience spécifique
   */
  async deleteEmployment(companyName: string) {
    const entry = this.page
      .locator('div.MuiBox-root')
      .filter({ hasText: companyName })
    await entry.getByLabel('delete employment').click()
  }
}
