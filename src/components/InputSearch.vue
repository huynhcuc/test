<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    modelValue: { type: String, default: '' },
});

const $emit = defineEmits(['submit', 'update:modelValue']);

function updateModelValue(e) {
    $emit('update:modelValue', e.target.value);
}

function submit() {
    $emit('submit');
}
</script>

<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="Nhập thông tin cần tìm"
            :value="modelValue"
            @input="updateModelValue"
            @keyup.enter="submit"
        >
        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type="button"
                @click="submit"
            >
                <i class="fas fa-search" /> Tìm kiếm
            </button>
        </div>
    </div>
</template>