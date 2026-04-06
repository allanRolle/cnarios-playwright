# cnarios-playwright

Challenges from the website cnarios.com

# [Cnarios](https://www.cnarios.com/) in Playwright

<p>🚀 Challenges and real-world scenarios to learn automation using Playwright</p>
<img src='./assets/00-cnarios.png' width='100%'/>

## What is Cnarios ?

<p>📋 Cnarios is a free platform for testers to practice automation using real-life scenarios, industry-standard test cases, and bug-finding challenges. Learn concepts, sharpen your skills, and prepare for interviews — all in one place.</p>

👉 [www.cnarios.com](https://www.cnarios.com/)

## Challenges

<p>Each challenge will include positive test cases, negative test cases, and edge cases.</p>

<details>
    <summary>Button</summary><br/>
    <p>😎👌🔥 Positive Scenarios</p>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected Result</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Click Follow button when enabled</td>
            <td>Button text and icon should change to 'Following' with a check icon</td>
            <td>Positive</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Tooltip visibility on hover</td>
            <td>Tooltip should display 'Click to follow' or 'Click to unfollow' based on state</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Follow button shows 'Processing...' text</td>
            <td>'Processing...' should appear before state changes and the button should be disabled</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Click Unfollow (toggle back)</td>
            <td>Button should return to Follow state after click</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Remove a suggestion card</td>
            <td>The selected suggestion card should be removed from the visible list</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>   
    </table>
    <p>🚨❗🚫 Negative Scenarios and Edge Cases</p>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected result / risk identified</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Unable to follow if button is desabled</td>
            <td>Button text should not change on click if button is desabled</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr> 
        <tr>
            <td>Ignore clicks near button (missed clicks)</td>
            <td>User action is not precise</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Unable to follow if button is clicked multiple times (spam/debounce)</td>
            <td>Button is put under stress</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr> 
        <tr>
            <td>Button remains functional when visually hidden</td>
            <td>Button is visually hidden</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>  
    </table>
    <p>🏞️ 📸 🗺️ Visuel du composant sous test:</p>
    <img src='./assets/buttons.png' alt='buttons' width='100%'>
</details>

<details>
    <summary>Form</summary><br/>
    <p>😎👌🔥 Positive Scenarios</p>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected Result</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Submit form with valid data</td>
            <td>Form should submit successfully, loader should appear, and confirmation dialog should display with generated ticket IDs</td>
            <td>Positive</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Verify Reset button functionality</td>
            <td>All fields should be cleared and tickets reset to 1</td>
            <td>Positive</td>
            <td>Low</td>
        </tr>
        <tr>
            <td>Multiple tickets generate unique IDs</td>
            <td>Confirmation dialog should display as many ticket IDs as number of tickets entered, all unique</td>
            <td>Positive</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Close modal to return to form without losing already entered data</td>
            <td>Clicking on the button 'Close' does not submit form, nor reset any fields</td>
            <td>Positive</td>
            <td>Low</td>
        </tr>
        <tr>
            <td>Confirm event registration</td>
            <td>Clicking on the button 'Confirm' submits the form, and resets all fields</td>
            <td>Positive</td>
            <td>High</td>
        </tr>
    </table> 
    <p>🚨❗🚫 Negative Scenarios and Edge Cases</p>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected Result</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Submit form with missing required fields</td>
            <td>Register button should remain disabled until all fields are filled correctly</td>
            <td>Negative</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Invalid name format validation</td>
            <td>Register button should remain disabled and error message is visible "Enter at least 3 characters"</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Invalid email format validation</td>
            <td>Register button should remain disabled and error message is visible "Enter a valid email address"</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Invalid phone number format validation</td>
            <td>Register button should remain disabled and error message is visible "Enter a valid phone (7-15 digits)"</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Tickets less than 1</td>
            <td>Register button should remain disabled and error message is visible "Enter an integer between 1 and 10"</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
    </table> 
    <p>🏞️ 📸 🗺️ Visuel du composant sous test:</p>
    <img src="./assets/form.png">
</details>

## 🗂️ Struture du projet

<pre>
    .
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 cnarios-playwright.yaml   # Pipeline CI/CD pour Playwright
├── 📁 assets/                           # Ressources statiques
├── 📁 e2e/                              # Cœur des tests de bout en bout
│   ├── 📁 concepts/                     # Dossier des spécifications (specs)
│   │   ├── 📄 button.spec.ts            # Tests pour les boutons
│   │   └── 📄 formRegistration.spec.ts  # Tests pour le formulaire
│   ├── 📁 pages/                        # Page Object Model (POM)
│   │   ├── 📄 BasePage.ts               # Classe parente avec méthodes communes
│   │   ├── 📄 ButtonPage.ts             # Logique de la page boutons
│   │   └── 📄 FormRegistration.ts       # Logique de la page formulaire
│   ├── 📄 fixtures.ts                   # Extension du test Playwright (injection des pages)
│   └── 📄 formRegistrationData.ts       # Données de test ou types TS
├── 📁 node_modules/                     # Dépendances NPM
├── 📁 playwright-report/                # Rapports générés après exécution
│   ├── 📁 data/
│   ├── 📁 trace/                        # Traces zip pour le debugging profond
│   └── 📄 index.html                    # Rapport HTML interactif (Playwright Report)
├── 📁 test-results/                     # Artefacts de tests (screenshots/vidéos d'échec)
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 playwright.config.ts              # Configuration globale (browsers, timeouts, etc.)
└── 📄 README.md
</pre>
