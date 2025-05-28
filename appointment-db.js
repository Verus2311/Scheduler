// Appointment Database Module
const appointmentDB = {
    // Get all appointments from localStorage
    getAllAppointments() {
        const appointments = localStorage.getItem('appointments');
        return appointments ? JSON.parse(appointments) : [];
    },

    // Get a single appointment by ID
    getAppointment(id) {
        const appointments = this.getAllAppointments();
        return appointments.find(appointment => appointment.id === id);
    },

    // Add a new appointment
    addAppointment(appointment) {
        const appointments = this.getAllAppointments();
        const newAppointment = {
            ...appointment,
            id: Date.now().toString(), // Generate unique ID
            created_at: new Date().toISOString(),
            status: appointment.status || 'pending'
        };
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        return newAppointment;
    },

    // Update an existing appointment
    updateAppointment(id, updatedAppointment) {
        const appointments = this.getAllAppointments();
        const index = appointments.findIndex(appointment => appointment.id === id);
        
        if (index === -1) {
            throw new Error('Appointment not found');
        }

        appointments[index] = {
            ...appointments[index],
            ...updatedAppointment,
            id: id // Preserve the original ID
        };

        localStorage.setItem('appointments', JSON.stringify(appointments));
        return appointments[index];
    },

    // Delete an appointment
    deleteAppointment(id) {
        const appointments = this.getAllAppointments();
        const filteredAppointments = appointments.filter(appointment => appointment.id !== id);
        
        if (filteredAppointments.length === appointments.length) {
            throw new Error('Appointment not found');
        }

        localStorage.setItem('appointments', JSON.stringify(filteredAppointments));
    },

    // Get appointments by date range
    getAppointmentsByDateRange(startDate, endDate) {
        const appointments = this.getAllAppointments();
        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date_sched);
            return appointmentDate >= startDate && appointmentDate <= endDate;
        });
    },

    // Get appointments by status
    getAppointmentsByStatus(status) {
        const appointments = this.getAllAppointments();
        return appointments.filter(appointment => appointment.status === status);
    },

    // Get appointments by therapist
    getAppointmentsByTherapist(therapist) {
        const appointments = this.getAllAppointments();
        return appointments.filter(appointment => 
            appointment.therapists.includes(therapist)
        );
    },

    // Get appointments by service
    getAppointmentsByService(service) {
        const appointments = this.getAllAppointments();
        return appointments.filter(appointment => 
            appointment.services.some(s => s.name === service)
        );
    },

    // Update appointment status
    updateAppointmentStatus(id, status) {
        const appointment = this.getAppointment(id);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        return this.updateAppointment(id, { ...appointment, status });
    },

    // Get today's appointments
    getTodayAppointments() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.getAppointmentsByDateRange(today, tomorrow);
    },

    // Get upcoming appointments
    getUpcomingAppointments() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return this.getAppointmentsByDateRange(today, nextMonth);
    },

    // Get past appointments
    getPastAppointments() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return this.getAppointmentsByDateRange(lastMonth, today);
    },

    // Clear all appointments (for testing/reset)
    clearAllAppointments() {
        localStorage.removeItem('appointments');
    }
};

export default appointmentDB; 