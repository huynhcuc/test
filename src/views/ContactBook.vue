<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import ContactCard from '@/components/ContactCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import ContactList from '@/components/ContactList.vue';
import contactsService from '@/services/contacts.service';

const $router = useRouter();

const contacts = ref([]);
const activeIndex = ref(-1);
const searchText = ref('');

// Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
const contactsAsStrings = computed(() =>
    contacts.value.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join('');
    })
);

// Trả về các contact có chứa thông tin cần tìm kiếm.
const filteredContacts = computed(() => {
    if (!searchText.value) return contacts.value;
    return contacts.value.filter((contact, index) =>
        contactsAsStrings.value[index].includes(searchText.value)
    );
});

const activeContact = computed(() => {
    if (activeIndex.value < 0) return null;
    return filteredContacts.value[activeIndex.value];
});

const filteredContactsCount = computed(() => filteredContacts.value.length);

async function retrieveContacts() {
    try {
        const contactsList = await contactsService.getAllContacts();
        contacts.value = contactsList.sort((current, next) =>
        current.name.localeCompare(next.name)
    );
    } catch (error) {
        console.log(error);
    }
}

function refreshList() {
    retrieveContacts();
    activeIndex.value = -1;
}

async function onDeleteContacts() {
    if (confirm('Bạn muốn xóa tất cả Liên hệ?')) {
        try {
            await contactsService.deleteAllContacts();
            refreshList();
        } catch (error) {
            console.log(error);
        }
    }
}

function goToAddContact() {
    $router.push({ name: 'contact.add' });
}

onMounted(() => refreshList());

// Giám sát các thay đổi của biến searchText.
// Bỏ chọn phần tử đang được chọn trong danh sách.
watch(searchText, () => (activeIndex.value = -1));
</script>

<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>

        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book" />
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>
                Không có liên hệ nào.
            </p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button
                    class="btn btn-sm btn-primary"
                    @click="refreshList()"
                >
                    <i class="fas fa-redo" /> Làm mới
                </button>

                <button
                    class="btn btn-sm btn-success"
                    @click="goToAddContact"
                >
                    <i class="fas fa-plus" /> Thêm mới
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="onDeleteContacts"
                >
                    <i class="fas fa-trash" /> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card" />
                </h4>
                <ContactCard :contact="activeContact" />
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact.id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit" /> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>