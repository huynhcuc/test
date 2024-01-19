import axios from 'axios';

function createContactsService () {
    const url = import.meta.env.VITE_APP_API_URL;
    const baseUrl = `${url}/api/contacts`;
    const api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

    async function getAllContacts() {
        return (await api.get(baseUrl)).data;
    }

    async function createContact(contact) {
        return (await api.post(baseUrl, contact)).data;
    }

    async function deleteAllContacts() {
        return (await api.delete(baseUrl)).data;
    }

    async function getContact(id) {
        return (await api.get(`${baseUrl}/${id}`)).data;
    }

    async function updateContact(id, contact) {
        return (await api.put(`${baseUrl}/${id}`, contact)).data;
    }

    async function deleteContact(id) {
        return (await api.delete(`${baseUrl}/${id}`)).data;
    }

    return {
            getAllContacts,
            deleteAllContacts,
            getContact,
            createContact,
            updateContact,
            deleteContact
        };
    }
    
export default createContactsService();