import { StudentUpdateType } from "@/app/students/[id]/page";

export class StudentsAPICalls {
    
    constructor(private accessToken: string) {}
    
    getStudents = async () => {
        const response = await fetch("http://localhost:3001/students", {
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

    getStudent = async (id: string) => {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
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

    deleteStudent = async (id: string) => {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
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

    addStudent = async (newStudentData: FormData) => {
        const response = await fetch("http://localhost:3001/students", {
            method: "POST",
            body: newStudentData,
            headers: {
                "Authorization": `Bearer ${this.accessToken}`  
            }
        })

        if (!response.ok) {
            throw new Error("Failed to fetch data!!!")
        }

        const fetchedData = await response.json();
        return fetchedData;
    }

    updateStudent = async (updatedStudent: StudentUpdateType, id: string) => {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedStudent),
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
