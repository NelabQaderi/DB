import { InstructorsResponse } from "@/app/instructors/page";

export class InstructorsAPICalls {
    
    constructor(private accessToken: string) {}

    addInstructor = async (newInsData: InstructorsResponse) => {

        const body = {
            name: newInsData.name,
            fathername: newInsData.fathername,
            email: newInsData.email,
            phone_number: newInsData.phone_number,
            percentage: newInsData.percentage
        }

        const response = await fetch("http://localhost:3001/instructors", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    updateInstructor = async (updateInsData: InstructorsResponse) => {

        const body = {
            name: updateInsData.name,
            fathername: updateInsData.fathername,
            email: updateInsData.email,
            phone_number: updateInsData.phone_number,
            percentage: updateInsData.percentage
        }

        const response = await fetch(`http://localhost:3001/instructors/${updateInsData.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    getInstructors = async () => {
        const response = await fetch("http://localhost:3001/instructors", {
            method: "GET",
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    getOneInstructor = async (id: string) => {
        const response = await fetch(`http://localhost:3001/instructors/${id}`, {
            method: "GET",
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    deleteInstructor = async (id: string) => {
        const response = await fetch(`http://localhost:3001/instructors/${id}`, {
            method: "DELETE",
            headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }
}
