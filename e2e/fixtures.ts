import { test as base } from '@playwright/test'
import { ButtonPage } from './pages/ButtonPage'

type MyFixtures = {
  buttonPage: ButtonPage
}

export const test = base.extend<MyFixtures>({
  buttonPage: async ({ page }, use) => {
    const buttonPage = new ButtonPage(page)
    await page.goto('/concepts/button#try-it-yourself')
    await use(buttonPage)
  },
})

export { expect } from '@playwright/test'
