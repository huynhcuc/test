<script setup>
import { ref } from 'vue';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';

const message = ref('');

async function onCreateContact(addedContact) {
    try {
        await contactsService.createContact(addedContact);
        message.value = 'Liên hệ được thêm thành công.';
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm
            @submit:contact="onCreateContact"
        />
        <p>{{ message }}</p>
    </div>
</template>