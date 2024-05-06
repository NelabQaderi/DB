import { Installment } from "@/app/students/[id]/page";


export class InstallmentsAPICalls {
    
    constructor(private accessToken: string) {}

    addInstallments = async (installment: Installment) => {
        const response = await fetch("http://localhost:3001/installments", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
            body: JSON.stringify(installment),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    getInstallmentsWithAllDetails = async (id: string) => {
        const response = await fetch(`http://localhost:3001/installments/student/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    getInstallment = async (id: string) => {
        const response = await fetch(`http://localhost:3001/installments/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    updateInstallment = async (
        updatedInstallment: { id: string, installment_type: string, installment_amount: number, installment_date: Date, }) => {
        const body = {
            installment_type: updatedInstallment.installment_type,
            installment_amount: updatedInstallment.installment_amount,
            installment_date: updatedInstallment.installment_date
        }
        const response = await fetch(`http://localhost:3001/installments/${updatedInstallment.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    receivedInstallment = async (id: string) => {
        const response = await fetch(`http://localhost:3001/installments/received/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    getMonthlyReport = async (dates:{start_date: string, end_date: string}) => {
        const response = await fetch(`http://localhost:3001/users/report`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`  
            },
            body: JSON.stringify(dates),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }
}
