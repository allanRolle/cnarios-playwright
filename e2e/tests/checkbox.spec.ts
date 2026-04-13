import { test, expect } from '../fixtures/fixtures'

test.describe('Checkbox Component', () => {
  test.describe('Happy Paths and Edge Cases', () => {
    test('Select one category and view filtered news', async ({
      checkboxPage,
    }) => {
      await checkboxPage.selectCategories(['Technology'])
      await checkboxPage.savePreferences()
      await checkboxPage.verifyArticlesMatchPreferences(['Technology'])
    })
  })
  test('Select multiple categories and view filtered news', async ({
    checkboxPage,
  }) => {
    await checkboxPage.selectCategories(['Sports', 'Business'])
    await checkboxPage.savePreferences()
    await checkboxPage.verifyArticlesMatchPreferences(['Sports', 'Business'])
  })
  test('Select all categories and view all news', async ({ checkboxPage }) => {
    await checkboxPage.selectCategories([
      'Technology',
      'Sports',
      'Business',
      'Science',
      'Health',
      'Entertainment',
    ])
    await checkboxPage.savePreferences()
    await checkboxPage.verifyArticlesMatchPreferences([
      'Technology',
      'Sports',
      'Business',
      'Science',
      'Health',
      'Entertainment',
    ])
  })
  test('Open and close preference dialog without changes', async ({
    checkboxPage,
  }) => {
    await checkboxPage.setPreferencesButton.click()
    await expect(checkboxPage.categoryDialog).toBeVisible()
    await checkboxPage.categoryDialog
      .getByRole('button', { name: 'Done' })
      .click()
    await expect(checkboxPage.categoryDialog).not.toBeVisible()
    await checkboxPage.verifyArticlesMatchPreferences(['Technology', 'Sports'])
  })
  test('Open preference dialog, select a category, unselect same category, select same category and click on "done"', async ({
    checkboxPage,
  }) => {
    await checkboxPage.setPreferencesButton.click()
    await expect(checkboxPage.categoryDialog).toBeVisible()
    await checkboxPage.unSelectAllCategories()
    await checkboxPage.categoryTechnology.check()
    await expect(checkboxPage.categoryTechnology).toBeChecked()
    await checkboxPage.categoryTechnology.uncheck()
    await expect(checkboxPage.categoryTechnology).not.toBeChecked()
    await checkboxPage.categoryTechnology.check()
    await expect(checkboxPage.categoryTechnology).toBeChecked()
    await checkboxPage.savePreferences()
    await checkboxPage.verifyArticlesMatchPreferences(['Technology'])
  })
  test('Open preference dialog, select a category, click on "done" and open dialog again to verify that the category is still selected', async ({
    checkboxPage,
  }) => {
    await checkboxPage.setPreferencesButton.click()
    await expect(checkboxPage.categoryDialog).toBeVisible()
    await checkboxPage.unSelectAllCategories()
    await checkboxPage.categorySports.check()
    await expect(checkboxPage.categorySports).toBeChecked()
    await checkboxPage.savePreferences()
    await checkboxPage.verifyArticlesMatchPreferences(['Sports'])
    await checkboxPage.setPreferencesButton.click()
    await expect(checkboxPage.categoryDialog).toBeVisible()
    await expect(checkboxPage.categorySports).toBeChecked()
  })
  test('Open preference dialog, select a category, click outside the dialog to close it and verify that the category is still selected', async ({
    checkboxPage,
  }) => {
    await checkboxPage.setPreferencesButton.click()
    await expect(checkboxPage.categoryDialog).toBeVisible()
    await checkboxPage.unSelectAllCategories()
    await checkboxPage.categoryBusiness.check()
    await expect(checkboxPage.categoryBusiness).toBeChecked()
    await Promise.all([
      checkboxPage.page.mouse.click(0, 0), // Click en dehors du dialog
      expect(checkboxPage.categoryDialog).not.toBeVisible(),
    ])
    await checkboxPage.verifyArticlesMatchPreferences(['Business'])
  })
  test.describe('Negative paths and Edge Cases', () => {
    test('Unselect all categories and verify that no news is displayed and message is shown', async ({
      checkboxPage,
    }) => {
      await checkboxPage.setPreferencesButton.click()
      await expect(checkboxPage.categoryDialog).toBeVisible()
      await checkboxPage.unSelectAllCategories()
      await checkboxPage.savePreferences()
      await expect(checkboxPage.articleCards).toHaveCount(0)
      await expect(checkboxPage.noNewsMessage).toBeVisible()
    })
    test('Click multiple times on the button "done" and verify that the preferences are saved only once', async ({
      checkboxPage,
    }) => {
      await checkboxPage.setPreferencesButton.click()
      await expect(checkboxPage.categoryDialog).toBeVisible()
      await checkboxPage.unSelectAllCategories()
      await checkboxPage.categoryHealth.check()
      await expect(checkboxPage.categoryHealth).toBeChecked()
      await Promise.all([
        checkboxPage.saveButton.click(),
        checkboxPage.saveButton.click(),
        checkboxPage.saveButton.click(),
      ])
      await checkboxPage.verifyArticlesMatchPreferences(['Health'])
    })
  })
})
