class AppointmentPage {
    visit() {
        cy.visit('/'); // Basis-URL bei Bedarf anpassen
    }

    // Lokalisieren Sie den Abschnitt mit den Termindetails
    getAppointmentDetails() {
        return cy.get('.appointment-item');
    }

    // Neue Methode zum Abrufen der Termindetails
    getAppointmentDetailsText() {
        return this.getAppointmentDetails().invoke('text');
    }

    // Lokalisieren Sie die Schaltfläche "Termin verschieben"
    clickRescheduleButton() {
        cy.get('.btn-reschedule').click();
    }

    // Neue Methode zum Abrufen neuer Terminoptionen
    getNewAppointmentOptions() {
        return cy.get('.reschedule-options .btn-option');
    }

    // Wählen Sie eine neue Terminoption basierend auf dem sichtbaren Text aus
    selectAppointmentOption(optionText) {
        cy.contains(optionText).click();
    }
    
    // Validieren die neuen Termindetails
    validateNewAppointmentDetails(newAppointment) {
        this.getAppointmentDetails().within(() => {
            cy.contains(newAppointment.date);
            cy.contains(newAppointment.time);  
            cy.contains('Ihr Servicetechniker'); 
            cy.contains(`Name: ${newAppointment.technicianName}`);
            cy.contains(`Alter: ${newAppointment.technicianAge}`); 
            cy.contains(`Geschlecht: ${newAppointment.technicianGender}`);
        });
    }
}

export default AppointmentPage;
