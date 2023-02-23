import { inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/error';

export const useAPIChannel =  {
    const axios : inject('axios');
    const error : useErrorStore();

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
};
