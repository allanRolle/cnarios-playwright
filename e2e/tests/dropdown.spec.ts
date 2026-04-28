import { test, expect } from '../fixtures/fixtures'

test.describe('Dropdown Component', () => {
  test.describe('Happy Paths', () => {
    ;(test('Selecting a country should display the correct currency', async ({
      dropdownPage,
    }) => {
      await dropdownPage.selectCountry('United States')
      await dropdownPage.verifyCurrency('USD')
    }),
      test('Clearing the selection should reset the currency display', async ({
        dropdownPage,
      }) => {
        await dropdownPage.selectCountry('United States')
        await dropdownPage.verifyCurrency('USD')
        await dropdownPage.clearSelection()
        await dropdownPage.verifyCurrency('---')
      }),
      test('Search for a country by typing in the dropdown input should filter the options', async ({
        dropdownPage,
      }) => {
        await dropdownPage.countryInput.fill('United')
        await expect(dropdownPage.page.getByRole('option')).toHaveCount(3)
        await expect(dropdownPage.page.getByRole('option')).toHaveText([
          /United States/,
          /United Kingdom/,
          /United Arab Emirates/,
        ])
      }),
      test('Load component with no country selected initially', async ({
        dropdownPage,
      }) => {
        await dropdownPage.verifyCurrency('---')
      }),
      test('Select a country, navigate to different tab and go back to the dropdown to check if selected country is still present', async ({
        dropdownPage,
      }) => {
        await dropdownPage.selectCountry('United States')
        await dropdownPage.verifyCurrency('USD')
        await dropdownPage.page.goto('/concepts/dropdown#concept') // Navigation vers une autre page
        await dropdownPage.page.goBack() // Retour à la page du dropdown
        await dropdownPage.verifyCurrency('USD') // Vérification que la sélection est toujours là
      }),
      test('Empty list - Clear list after partial entry', async ({
        dropdownPage,
      }) => {
        const searchTerm = 'United'
        await dropdownPage.countryInput.fill(searchTerm)
        await expect(dropdownPage.page.getByRole('option')).toHaveCount(3)
        await dropdownPage.clearSelection()
        await dropdownPage.countryInput.click()
        for (let i = 0; i < searchTerm.length; i++) {
          await dropdownPage.countryInput.press('Backspace')
        }
        await expect(dropdownPage.page.getByRole('option')).toHaveCount(29)
      }),
      test('Unique selection - Pick a valid country, then select another one and verify that the first one is deselected', async ({
        dropdownPage,
      }) => {
        await dropdownPage.selectCountry('United States')
        await dropdownPage.verifyCurrency('USD')
        await dropdownPage.selectCountry('France')
        await dropdownPage.verifyCurrency('EUR')
      }))
  })
  test.describe('Negative paths', () => {
    ;(test("Type a country ('Atlantide' or '12345') not present in the list and verify that 'No options' message is displayed", async ({
      dropdownPage,
    }) => {
      await dropdownPage.countryInput.fill('Atlantide')
      await expect(dropdownPage.noOptionsMessage).toBeVisible()
      await dropdownPage.countryInput.fill('12345')
      await expect(dropdownPage.noOptionsMessage).toBeVisible()
    }),
      test('Test special characters in search like a script tag or an emoji and verify that the component does not break and no options are displayed', async ({
        dropdownPage,
      }) => {
        await dropdownPage.countryInput.fill('<script>alert("XSS")</script>')
        await expect(dropdownPage.noOptionsMessage).toBeVisible()
        await dropdownPage.countryInput.fill('😀')
        await expect(dropdownPage.noOptionsMessage).toBeVisible()
      }),
      test('Test blank spaces in search and verify that "No options" message is displayed', async ({
        dropdownPage,
      }) => {
        await dropdownPage.countryInput.fill('   ')
        await expect(dropdownPage.noOptionsMessage).toBeVisible()
      }))
  })
})
