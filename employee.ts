export class Employee {
    public id: number;
    public name: string;
    public status: string;
    public tel: number;
    public email: string;

    constructor(id: number, name: string, status: string, tel: number, email: string) {
        this.id = id;
        this.name = name;
        this.status = status;

        // Adding constraints to telephone (tel)
        if (tel.toString().length !== 10) {
            throw new Error('Telephone number must be 10 digits long.');
        }
        this.tel = tel;

        // Adding constraints to email
        if (!this.isValidEmail(email)) {
            throw new Error('Invalid email address.');
        }
        this.email = email;
    }

    private isValidEmail(email: string): boolean {
        // Use a regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
