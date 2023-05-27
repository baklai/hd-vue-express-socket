import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useStatistic = defineStore('statistic', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  async function network() {
    try {
      return await helpdesk.emit('statistic:network');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function request() {
    try {
      return await helpdesk.emit('statistic:request');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function inspector() {
    try {
      return await helpdesk.emit('statistic:inspector');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function dashboard() {
    try {
      return await helpdesk.emit('statistic:dashboard');
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { network, request, inspector, dashboard };
});
