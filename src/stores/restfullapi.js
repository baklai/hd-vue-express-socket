import { inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/error';

export const useIPAddress = defineStore('ipaddress', () => {
    const axios = inject('axios');
    const error = useErrorStore();

    async function findAll(params) {
        try {
            const { data } = await axios.get('ipaddress', { params });
            return data;
        } catch (err) {
            error.setError(err);
        }
    }

    async function findOne(params) {
        try {
            const { data } = await axios.get('ipaddress', { params });
            return data;
        } catch (err) {
            error.setError(err);
        }
    }

    async function createOne(params) {
        try {
            const { data } = await axios.get('ipaddress', { params });
            return data;
        } catch (err) {
            error.setError(err);
        }
    }

    async function updateOne(params) {
        try {
            const { data } = await axios.get('ipaddress', { params });
            return data;
        } catch (err) {
            error.setError(err);
        }
    }

    async function removeOne(params) {
        try {
            const { data } = await axios.get('ipaddress', { params });
            return data;
        } catch (err) {
            error.setError(err);
        }
    }

    return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useAPIChannel = defineStore('api', () => {
    const axios = inject('axios');
    const error = useErrorStore();

    async function findAll(params) {
        try {
            const { data } = await axios.get('channel', { params });
            return data;
        } catch (err) {
            error.setError(err);
            return [];
        }
    }

    async function findOne(params) {
        try {
            const { data } = await axios.get('channel', { params });
            return data;
        } catch (err) {
            error.setError(err);
            return [];
        }
    }

    async function createOne(params) {
        try {
            const { data } = await axios.get('channel', { params });
            return data;
        } catch (err) {
            error.setError(err);
            return [];
        }
    }

    async function updateOne(params) {
        try {
            const { data } = await axios.get('channel', { params });
            return data;
        } catch (err) {
            error.setError(err);
            return [];
        }
    }

    async function removeOne(params) {
        try {
            const { data } = await axios.get('channel', { params });
            return data;
        } catch (err) {
            error.setError(err);
            return [];
        }
    }

    return { findAll, findOne, createOne, updateOne, removeOne };
});
