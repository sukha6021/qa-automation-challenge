/**
 * appointment.cy.js
 * 
 * Diese Datei enthält die Testfälle für die Terminplanung in der Anwendung.
 * Die Tests sind in einer Describe-Gruppe zusammengefasst, die den Namen "Terminplanung" trägt.
 * 
 * Es gibt zwei Haupttests:
 * 
 * 1. Der erste Test überprüft, ob die aktuellen Termindetails korrekt angezeigt werden.
 *    - Er besucht die Anwendung und validiert, dass die angezeigten Details (Datum, Uhrzeit,
 *      Aufgabe, Name, Alter und Geschlecht des Technikers) den erwarteten Werten entsprechen.
 * 
 * 2. Der zweite Test simuliert das Verschieben eines Termins:
 *    - Er klickt auf die Schaltfläche "Termin verschieben", um neue Terminoptionen anzuzeigen.
 *    - Es wird überprüft, dass genau drei neue Terminoptionen verfügbar sind.
 *    - Eine der neuen Optionen wird zufällig ausgewählt, und die entsprechenden Details (Datum,
 *      Uhrzeit und Name des Technikers) werden extrahiert.
 *    - Anschließend wird auf die ausgewählte Option geklickt, und es wird validiert, dass die
 *      neuen Termindetails nach dem Verschieben korrekt angezeigt werden.
 * 
 * Die Datei verwendet die `AppointmentPage`-Klasse, um den Code zu strukturieren und die
 * Interaktionen mit der Benutzeroberfläche zu kapseln, was die Wartbarkeit und Lesbarkeit des
 * Tests verbessert.
 */

import AppointmentPage from "../../pages/AppointmentPage";

describe("Terminplanung", () => {
  const appointmentPage = new AppointmentPage();

  beforeEach(() => {
    appointmentPage.visit();
  });

  it("zeigt den aktuellen Termin an", () => {
    // Überprüfen, dass die aktuellen Termindetails korrekt angezeigt werden
    appointmentPage.getAppointmentDetails().within(() => {
      cy.get("h3")
        .invoke("text")
        .then((date) => {
          cy.log("Aktuelles Datum:", date); 
          expect(date).to.be.a("string").and.to.not.be.empty; // Überprüfen, dass das Datum existiert
        });

      cy.get("p").then(($paragraphs) => {
        const timeRange = $paragraphs[0].innerText;
        const task = $paragraphs[1].innerText;

        // Log und Assertion für dynamische Inhalte
        cy.log("Aktueller Zeitraum:", timeRange);
        cy.log("Aktuelle Aufgabe:", task);

        // Assertions durchführen
        expect(timeRange).to.contain("Zeitraum:");
        expect(task).to.contain("Durchzuführende Arbeit:"); 
      });

      cy.get(".technician-details").within(() => {
        cy.contains("Ihr Servicetechniker"); // Techniker-Label validieren
        cy.get("p").then(($techDetails) => {
          const name = $techDetails[0].innerText;
          const age = $techDetails[1].innerText;
          const gender = $techDetails[2].innerText;

          // Log und Assertion für Techniker-Details
          cy.log("Techniker Name:", name);
          cy.log("Techniker Alter:", age);
          cy.log("Techniker Geschlecht:", gender);

          expect(name).to.contain("Name:"); 
          expect(age).to.contain("Alter:");
          expect(gender).to.contain("Geschlecht:"); 
        });
      });
    });
  });

  it('erlaubt es dem Benutzer, den Termin zu verschieben und zeigt die korrekten neuen Details an', () => {
    // Schritt 1: Auf die Schaltfläche "Verschieben" klicken, um neue Optionen anzuzeigen
    cy.get('.btn-reschedule').click();
  
    // Schritt 2: Überprüfen, dass drei neue Terminoptionen präsentiert werden
    cy.get('.reschedule-options .btn-option').should('have.length', 3).then(($options) => {
        // Schritt 3: Generiere einen zufälligen Index basierend auf der Anzahl der Optionen
        const randomIndex = Math.floor(Math.random() * $options.length);
        const $selectedOption = $options.eq(randomIndex); 
        
        // Schritt 4: Erfasse die ausgewählten Termindetails
        const selectedAppointmentText = $selectedOption.text(); 
      
        // Reguläre Ausdrücke, um Datum, Uhrzeit und den Namen des Technikers zu extrahieren
        const dateMatch = selectedAppointmentText.match(/(\d{4}-\d{2}-\d{2})/); // Datum extrahieren
        const timeMatch = selectedAppointmentText.match(/(\d{2}:\d{2} - \d{2}:\d{2})/); // Uhrzeit extrahieren
        const technicianMatch = selectedAppointmentText.match(/Techniker:\s*(.+?)\s*\(\d+\s*Jahre\s*alt,\s*\w+\)/); // Name des Technikers extrahieren

        const selectedAppointment = {
            date: dateMatch ? dateMatch[0] : '',
            time: timeMatch ? timeMatch[0] : '', 
            technician: technicianMatch ? technicianMatch[1].trim() : '' 
        };

        cy.log('Ausgewählter Termin:', selectedAppointment);
  
        // Schritt 5: Klicke auf die ausgewählte Verschiebeoption
        cy.wrap($selectedOption).click();
  
        // Schritt 6: Überprüfen, dass die neuen Termindetails nach der Verschiebung korrekt angezeigt werden
        cy.get('.appointment-item').within(() => {
            cy.contains(selectedAppointment.date);     
            cy.contains(selectedAppointment.time);      
            cy.contains('Ihr Servicetechniker');     
            cy.contains(`Name: ${selectedAppointment.technician}`); 
        });
    });
  });
});
