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
      error.setError(err);
    }
  }

  async function request() {
    try {
      return await helpdesk.emit('statistic:request');
    } catch (err) {
      error.setError(err);
    }
  }

  async function inspector() {
    try {
      return await helpdesk.emit('statistic:inspector');
    } catch (err) {
      error.setError(err);
    }
  }

  async function dashboard() {
    try {
      return await helpdesk.emit('statistic:dashboard');
    } catch (err) {
      error.setError(err);
    }
  }

  return { network, request, inspector, dashboard };
});
