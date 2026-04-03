import { test, expect } from '@playwright/test'

const TEST_EMAIL = `test_${Date.now()}@example.com`
const TEST_PASSWORD = 'password123'

test.describe('Todo App — full user journey', () => {
  test('sign up', async ({ page }) => {
    await page.goto('/signup')
    await page.fill('input[name="email"]', TEST_EMAIL)
    await page.fill('input[name="password"]', TEST_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    await expect(page.locator('text=My Tasks')).toBeVisible()
  })

  test('sign out and sign in', async ({ page }) => {
    // Sign up first
    await page.goto('/signup')
    await page.fill('input[name="email"]', TEST_EMAIL)
    await page.fill('input[name="password"]', TEST_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('/')

    // Sign out
    await page.click('button:has-text("Sign out")')
    await page.waitForURL('/login')

    // Sign back in
    await page.fill('input[name="email"]', TEST_EMAIL)
    await page.fill('input[name="password"]', TEST_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('/')
    await expect(page.locator('text=My Tasks')).toBeVisible()
  })

  test('create, complete, and delete a todo', async ({ page }) => {
    // Sign up
    await page.goto('/signup')
    await page.fill('input[name="email"]', TEST_EMAIL)
    await page.fill('input[name="password"]', TEST_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('/')

    // Create todo
    await page.fill('input[name="title"]', 'Buy milk')
    await page.click('button:has-text("Add")')
    await expect(page.locator('text=Buy milk')).toBeVisible()

    // Toggle complete
    await page.locator('[aria-label="Mark complete"]').first().click()
    await expect(page.locator('text=Done')).toBeVisible()

    // Delete todo — hover to reveal delete button
    await page.locator('text=Buy milk').hover()
    await page.locator('[aria-label="Delete task"]').first().click()
    await expect(page.locator('text=Buy milk')).not.toBeVisible({ timeout: 5000 })
  })

  test('unauthenticated user is redirected to /login', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL('/login')
    await expect(page.locator('text=Welcome back')).toBeVisible()
  })
})
