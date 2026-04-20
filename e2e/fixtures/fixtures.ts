import { test as base } from '@playwright/test'
import { ButtonPage } from '../pages/ButtonPage'
import { FormRegistrationPage } from '../pages/FormRegistrationPage'
import { CheckboxPage } from '../pages/CheckboxPage'
import { RadioButtonPage } from '../pages/RadioButtonPage'

type MyFixtures = {
  buttonPage: ButtonPage
  formRegistrationPage: FormRegistrationPage
  checkboxPage: CheckboxPage
  radioButtonPage: RadioButtonPage
}

export const test = base.extend<MyFixtures>({
  buttonPage: async ({ page }, use) => {
    const buttonPage = new ButtonPage(page)
    await buttonPage.open()
    await use(buttonPage)
  },
  formRegistrationPage: async ({ page }, use) => {
    const formRegistrationPage = new FormRegistrationPage(page)
    await formRegistrationPage.open()
    await use(formRegistrationPage)
  },
  checkboxPage: async ({ page }, use) => {
    const checkboxPage = new CheckboxPage(page)
    await checkboxPage.open()
    await use(checkboxPage)
  },
  radioButtonPage: async ({ page }, use) => {
    const radioButtonPage = new RadioButtonPage(page)
    await radioButtonPage.open()
    await use(radioButtonPage)
  },
})

export { expect } from '@playwright/test'
