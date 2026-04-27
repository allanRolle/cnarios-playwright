import { test as base } from '@playwright/test'
import { ButtonPage } from '../pages/ButtonPage'
import { FormRegistrationPage } from '../pages/FormRegistrationPage'
import { CheckboxPage } from '../pages/CheckboxPage'
import { RadioButtonPage } from '../pages/RadioButtonPage'
import { DatePickerPage } from '../pages/DatePickerPage'

type MyFixtures = {
  buttonPage: ButtonPage
  formRegistrationPage: FormRegistrationPage
  checkboxPage: CheckboxPage
  radioButtonPage: RadioButtonPage
  datePickerPage: DatePickerPage
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
  datePickerPage: async ({ page }, use) => {
    const datePickerPage = new DatePickerPage(page)
    await datePickerPage.open()
    await use(datePickerPage)
  },
})

export { expect } from '@playwright/test'
