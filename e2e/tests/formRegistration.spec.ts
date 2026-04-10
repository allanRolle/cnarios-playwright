import { test, expect } from '../fixtures/fixtures'
import { testData } from '../data/formRegistrationData'

test.describe('Form Registration', () => {
  for (const [index, data] of testData.entries()) {
    test(`should test scenario ${index + 1}: ${data.testCase}`, async ({
      formRegistrationPage,
    }) => {
      // 1. Reset the form before each test case
      await formRegistrationPage.clickResetButton()

      // 2. Fill in the form fields
      await formRegistrationPage.setName(data.name)
      await formRegistrationPage.setEmail(data.email)
      await formRegistrationPage.setPhoneNumber(data.phoneNumber)
      await formRegistrationPage.setEvent(data.event)
      await formRegistrationPage.setNumberOfTickets(data.numberOfTickets)

      // 3. Logic based on expected status
      if (data.expectedStatus === 'reset') {
        await formRegistrationPage.clickResetButton()

        // Verifications
        await expect(formRegistrationPage.nameInput).toHaveValue('')
        await expect(formRegistrationPage.emailInput).toHaveValue('')
        await expect(formRegistrationPage.phoneNumberInput).toHaveValue('')
        await expect(formRegistrationPage.eventSelectInput).toHaveText('')
        await expect(formRegistrationPage.ticketsInput).toHaveValue('1')
        await expect(formRegistrationPage.registerButton).toBeDisabled()
      } else if (data.expectedStatus === 'valid') {
        await formRegistrationPage.clickRegisterButton()

        // Modal Verifications
        await expect(formRegistrationPage.confirmationModal).toBeVisible()
        await expect(formRegistrationPage.confirmName).toHaveText(data.name)
        await expect(formRegistrationPage.confirmEmail).toHaveText(data.email)
        await expect(formRegistrationPage.confirmPhone).toHaveText(
          data.phoneNumber
        )
        await expect(formRegistrationPage.confirmEvent).toHaveText(data.event)
        await expect(formRegistrationPage.confirmTotalTickets).toHaveText(
          `${data.numberOfTickets}`
        )

        // Tickets List logic
        const tickets = formRegistrationPage.confirmTicketsListItem
        await expect(tickets).toHaveCount(data.numberOfTickets)

        // Unique ID check
        const ticketTexts = await tickets.allTextContents()
        const uniqueIds = new Set(ticketTexts)
        expect(uniqueIds.size).toBe(ticketTexts.length)

        if (data.shouldConfirm) {
          await formRegistrationPage.clickConfirmButton()
          await expect(formRegistrationPage.confirmationModal).toBeHidden()

          // Verify form is reset after confirmation
          await expect(formRegistrationPage.nameInput).toHaveValue('')
          await expect(formRegistrationPage.eventSelectInput).toHaveText('')
          await expect(formRegistrationPage.ticketsInput).toHaveValue('1')
        } else {
          await formRegistrationPage.clickCloseModalButton()
          await expect(formRegistrationPage.confirmationModal).toBeHidden()
        }
      } else {
        // Negative Paths
        await expect(formRegistrationPage.registerButton).toBeDisabled()

        if (data.errorField === 'event') {
          // Playwright est plus stable, on peut tenter de réactiver l'assertion
          await expect(
            formRegistrationPage.errorMessageEventField
          ).toBeVisible()
          await expect(
            formRegistrationPage.errorMessageEventField
          ).toContainText(data.errorMessage!)
        } else {
          await expect(formRegistrationPage.errorMessage).toBeVisible()
          await expect(formRegistrationPage.errorMessage).toContainText(
            data.errorMessage!
          )
        }
      }
    })
  }
})
