import { test, expect } from '../fixtures/fixtures'

test.describe('Date Picker Component', () => {
  test.describe('Happy Paths & edge cases', () => {
    ;(test('Should open the date picker dialog when "Add Employment" button is clicked', async ({
      datePickerPage,
    }) => {
      await datePickerPage.openDatePicker()
      await expect(datePickerPage.datePickerTitle).toBeVisible()
      await expect(datePickerPage.mandatoryFieldsAlert).toBeVisible()
      await expect(datePickerPage.companyNameInput).toBeVisible()
      await expect(datePickerPage.startDateInput).toBeVisible()
      await expect(datePickerPage.endDateInput).toBeVisible()
      await expect(datePickerPage.addButton).toBeVisible()
      await expect(datePickerPage.addButton).toBeDisabled()
    }),
      test('Add a valid employment entry and verify it appears in the list', async ({
        datePickerPage,
      }) => {
        await datePickerPage.openDatePicker()
        await datePickerPage.fillEmploymentDetails(
          'Tech Company',
          '2020-01-01',
          '2022-12-31'
        )
        await expect(datePickerPage.addButton).toBeEnabled()
        await datePickerPage.addButton.click()
        await datePickerPage.verifyEmploymentIsListed(
          'Tech Company',
          '2020-01-01'
        )
        await datePickerPage.verifyEmploymentCount(1)
      }),
      test('Add multiple non-overlapping employment records and verify they are all listed', async ({
        datePickerPage,
      }) => {
        const employments = [
          { company: 'Company A', start: '2018-01-01', end: '2019-12-31' },
          { company: 'Company B', start: '2020-01-01', end: '2021-12-31' },
          { company: 'Company C', start: '2022-01-01', end: '2023-12-31' },
        ]
        for (const emp of employments) {
          await datePickerPage.openDatePicker()
          await datePickerPage.fillEmploymentDetails(
            emp.company,
            emp.start,
            emp.end
          )
          await datePickerPage.addButton.click()
        }
        for (const emp of employments) {
          await datePickerPage.verifyEmploymentIsListed(emp.company, emp.start)
        }
        await datePickerPage.verifyEmploymentCount(3)
      }),
      test('Add employment with same start and end date and verify it is listed', async ({
        datePickerPage,
      }) => {
        await datePickerPage.openDatePicker()
        await datePickerPage.fillEmploymentDetails(
          'One Day Job',
          '2021-05-01',
          '2021-05-01'
        )
        await datePickerPage.addButton.click()
        await datePickerPage.verifyEmploymentIsListed(
          'One Day Job',
          '2021-05-01'
        )
      }),
      test('Open employment modal and cancel without saving - no new entry should be added', async ({
        datePickerPage,
      }) => {
        const initialCount = await datePickerPage.employmentListItems.count()
        await datePickerPage.openDatePicker()
        await datePickerPage.page.mouse.click(0, 0) // Click en dehors du modal pour le fermer
        await datePickerPage.verifyEmploymentCount(initialCount)
        await expect(datePickerPage.employmentHistoryTitle).not.toBeVisible()
      }),
      test('Delete an employment entry and verify it is removed from the list', async ({
        datePickerPage,
      }) => {
        await datePickerPage.openDatePicker()
        await datePickerPage.fillEmploymentDetails(
          'Delete Me Inc.',
          '2019-01-01',
          '2020-01-01'
        )
        await datePickerPage.addButton.click()
        await datePickerPage.verifyEmploymentIsListed(
          'Delete Me Inc.',
          '2019-01-01'
        )
        const initialCount = await datePickerPage.employmentListItems.count()
        await datePickerPage.deleteEmployment('Delete Me Inc.')
        await datePickerPage.verifyEmploymentCount(initialCount - 1)
      }))
    test.describe('Negative paths and edge cases', () => {
      ;(test('Try adding overlapping employment dates and verify that an error message is displayed', async ({
        datePickerPage,
      }) => {
        await datePickerPage.openDatePicker()
        await datePickerPage.fillEmploymentDetails(
          'Overlap Inc.',
          '2020-01-01',
          '2021-12-31'
        )
        await datePickerPage.addButton.click()
        await datePickerPage.openDatePicker()
        await datePickerPage.fillEmploymentDetails(
          'Overlap Too Inc.',
          '2021-01-01',
          '2022-12-31'
        )
        await datePickerPage.addButton.click()
        await expect(datePickerPage.employmentOverlapAlert).toBeVisible()
      }),
        test('Try adding a job without selecting any dates and verify that the add button remains disabled', async ({
          datePickerPage,
        }) => {
          await datePickerPage.openDatePicker()
          await datePickerPage.companyNameInput.fill('No Dates Inc.')
          await expect(datePickerPage.addButton).toBeDisabled()
        }))
    })
  })
})
