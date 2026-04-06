import { test as base } from '@playwright/test'
import { ButtonPage } from './pages/ButtonPage'
import { FormRegistrationPage } from './pages/FormRegistration'

type MyFixtures = {
  buttonPage: ButtonPage
  formRegistrationPage: FormRegistrationPage
}

export const test = base.extend<MyFixtures>({
  buttonPage: async ({ page }, use) => {
    const buttonPage = new ButtonPage(page)
    await page.goto('/concepts/button#try-it-yourself')
    await use(buttonPage)
  },
  formRegistrationPage: async ({ page }, use) => {
    const formRegistrationPage = new FormRegistrationPage(page)
    await page.goto('/concepts/form#try-it-yourself')
    await use(formRegistrationPage)
  },
})

export { expect } from '@playwright/test'
