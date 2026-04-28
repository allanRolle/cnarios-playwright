import { test } from '../fixtures/fixtures'

test.describe('Timepicker Component', () => {
  test.describe('Happy Paths', () => {
    ;(test('Should book an appointment at a valid time and show success message', async ({
      timepickerPage,
    }) => {
      const validTime = '10:00'
      await timepickerPage.bookAppointment(validTime)
      await timepickerPage.expectSuccessMessage(validTime)
      await timepickerPage.verifyConfirmationAppearance()
    }),
      test('Book appointment at exact opening time (9:00)', async ({
        timepickerPage,
      }) => {
        const openingTime = '09:00'
        await timepickerPage.bookAppointment(openingTime)
        await timepickerPage.expectSuccessMessage(openingTime)
      }),
      test('Book appointment at exact closing time (18:00)', async ({
        timepickerPage,
      }) => {
        const closingTime = '18:00'
        await timepickerPage.bookAppointment(closingTime)
        await timepickerPage.expectSuccessMessage(closingTime)
      }))
  })
  test.describe('Negative paths and edge cases', () => {
    ;(test('Book appointment before opening time (08:59) should show error message', async ({
      timepickerPage,
    }) => {
      const beforeOpeningTime = '08:59'
      await timepickerPage.bookAppointment(beforeOpeningTime)
      await timepickerPage.expectErrorMessage(beforeOpeningTime)
      await timepickerPage.verifyErrorAppearance()
    }),
      test('Book appointment after closing time (18:01) should show error message', async ({
        timepickerPage,
      }) => {
        const afterClosingTime = '18:01'
        await timepickerPage.bookAppointment(afterClosingTime)
        await timepickerPage.expectErrorMessage(afterClosingTime)
      }))
  })
})
