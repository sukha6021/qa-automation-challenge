# QA Automation Coding Challenge

Dieses Repository enthält eine Interview-Challenge für die Position des Senior QA Automation Engineers bei Ista Express.

## Die Challenge

Das Ziel dieser Challenge ist es...

1. deinen Ansatz für eine elegante E2E-Testlösung zu sehen
1. deine Vision einer perfekten CI/CD pipeline zu erfahren
1. deine QA-Automatisierungs-Skills zu testen

## Das Problem

Als Ista Express wollen wir unsere UI Tests automatisieren um unseren Entwicklungsprozess zu beschleunigen und die Qualität gleichbleibend zu gewährleisten.
Diese Tests sollen in unseren Entwicklungsprozess (Github flow) integriert werden.

Dieses Repository enthält eine einfache vue/node web App die stellvertretend für unsere UI's getestet werden soll. In dieser Anwendung können Kunden ihre Termine einsehen und verschieben.

## Akzeptanzkriterien

- Ein Nutzer kann seinen Termin einsehen mit den Daten
  - Aufgabe
  - Tag
  - Startzeit
  - Endzeit
  - Techniker
    - Name
    - Alter
    - Geschlecht
- Wenn der Nutzer auf "Termin verschieben" klickt, dann werden ihm 3 neue Optionen angeboten, von denen er sich eine aussuchen kann.
  Nachdem er seine Option ausgewählt hat, wird ihm von da an nur noch dieser Neue Termin angezeigt.

## Anforderungen

- Entwickle ein E2E Test setup, mit dem die Akzeptanzkriterien abdeckt werden.
- Mache dir Gedanken zu deinem idealen CI/CD Konzept in Hinsicht auf die QA Automation und Dokumentiere sie (in Markdown oder ähnlichem).
  Berücksichtige dabei, dass die Tests auch in die Pipelines der Backendservices integriert werden sollten.

**Bonus Punkte**

- Baue mit Github Actions eine pipeline um das Projekt zu bauen und zu starten und dann die Tests auszuführen, wenn ein Pull Request erstellt wird.
- Berücksichtige, wie das System skaliert, wenn die Anzahl der Tests sich erhöht.

## Getting Started

Um mit der Bearbeitung der Challenge anzufangen, **forke das Repo** in deinen persönlichen Bereich.

## Setup

```
npm run setup
```

## Starte die App lokal

Dieses Kommando startet den Client und den Server gleichzeitig. Dafür wird [concurrently](https://github.com/kimmobrunfeldt/concurrently) benutzt.

```
npm run start
```
=============================================================================
## Testing

## Tests

Dieses Projekt verwendet Cypress für End-to-End-Tests der Terminplanungsanwendung. Die Tests validieren die folgenden Funktionalitäten:

1. **Anzeige des aktuellen Termins**: Überprüft, ob die aktuellen Termindetails (Datum, Uhrzeit, Aufgabe, Name des Technikers, Alter und Geschlecht) korrekt angezeigt werden, wenn die Anwendung geladen wird.
2. **Verschieben von Terminen**: Testet die Fähigkeit der Benutzer, einen Termin zu verschieben, und stellt sicher, dass die neuen Termindetails nach der Auswahl korrekt angezeigt werden.

The tests are automated using **Cypress** for end-to-end browser interaction, with additional integration into **GitHub Actions** for continuous testing.

## Voraussetzungen

Stellen Sie sicher, dass die folgende Software auf Ihrem System installiert ist:

- **Node.js** (v16 oder höher)
  - Download: [Node. js](https://nodejs.org/)
- **Cypress** (v13)
  - Die Installation erfolgt über `npm` im Projekt.
- **Git** for cloning the repository.

## Installation

Klonen Sie das Repository und installieren Sie die erforderlichen Abhängigkeiten:

`https://github.com/sukha6021/qa-automation-challenge.git`\
`npm install`

## Tests lokal ausführen

### 1. Interaktiver Modus (öffnet den Cypress-Test-Runner):

`npx cypress open`


You can then select and run individual tests from the Cypress UI.

### 2. Headless-Modus (führt alle Tests im Terminal aus):

`npx cypress run`

Dies führt alle Tests headless mit dem Standardbrowser (z. B. Chrome) aus.

## Tests in CI/CD ausführen

Dieses Projekt verwendet GitHub Actions, um das Ausführen von Tests zu automatisieren, wann immer Code gepusht wird oder ein Pull-Request geöffnet wird. Die Konfiguration für die CI-Pipeline befindet sich in `.github/workflows/cypress.yml`.

Um Testergebnisse in CI anzuzeigen:
1. Gehen Sie zu Ihrem Repository auf GitHub.
2. Klicken Sie auf die Registerkarte "Actions".
3. Sie können eine Historie aller Testläufe und deren Status sehen.

## Cypress Dashboard-Integration

Dieses Projekt ist mit dem Cypress Dashboard integriert, um Testergebnisse über mehrere Durchläufe hinweg zu verfolgen. Das Cypress Dashboard ermöglicht es Ihnen:
- Die Testlaufhistorie anzuzeigen.
- Einzelne Testfehler und Protokolle zu inspizieren.
- Tests in CI aufzuzeichnen.

Um Testergebnisse im Cypress Dashboard aufzuzeichnen, verwenden Sie den folgenden Befehl:

`npx cypress run --record --key <your-dashboard-record-key>`


Ersetzen Sie  \`<your-dashboard-record-key>\` durch den tatsächlichen Schlüssel, den Sie von Ihrem Cypress Dashboard-Konto erhalten haben.

### Dashboard anzeigen
Sie können auf die aufgezeichneten Tests und Ergebnisse im [Cypress Dashboard]((https://cloud.cypress.io/projects/jj2id2/)) zugreifen. Das Dashboard bietet Einblicke in bestandene/fehlgeschlagene Tests und die Laufzeitumgebung.


## Verwendete Technologien

- **Cypress** v13 End-to-End-Tests.
- **JavaScript** für Testentwicklung.
- **GitHub Actions** für CI/CD-Automatisierung.
- **Cypress Dashboard** zur Testverfolgung und Berichterstattung.

## GitHub Actions Workflow

Dieses Projekt enthält eine GitHub Actions-Workflow-Datei, die sich in `.github/workflows/cypress.yml` befindet. Die Pipeline wird bei jedem Push oder Pull-Request zum main-Branch ausgelöst und führt automatisch Cypress-Tests aus.