import { ClassesResponse } from "@/app/classes/page";

export class ClassesAPICalls {
    
    constructor(private accessToken: string) {}

    addClass = async (updateClassData: ClassesResponse) => {

        const body = {
            class_name: updateClassData.class_name,
            instructor_id: updateClassData.instructor_id,
            class_duration: updateClassData.class_duration,
            start_date: updateClassData.start_date,
            start_time: updateClassData.start_time,
            class_fee: updateClassData.class_fee,
            class_fee_currency: updateClassData.class_fee_currency
        }

        const response = await fetch(`http://localhost:3001/classes`, {
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

    getClasses = async () => {
        const response = await fetch("http://localhost:3001/classes", {
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

    getOneClass = async (id: string) => {
        const response = await fetch(`http://localhost:3001/classes/${id}`, {
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

    deleteClass = async (id: string) => {
        const response = await fetch(`http://localhost:3001/classes/${id}`, {
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

    updateClass = async (updateClassData: ClassesResponse) => {

        const body = {
            class_name: updateClassData.class_name,
            instructor_id: updateClassData.instructor_id,
            class_duration: updateClassData.class_duration,
            start_date: updateClassData.start_date,
            start_time: updateClassData.start_time,
            class_fee: updateClassData.class_fee,
            class_fee_currency: updateClassData.class_fee_currency
        }

        const response = await fetch(`http://localhost:3001/classes/${updateClassData.id}`, {
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
}