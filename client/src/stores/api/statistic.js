import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

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

  async function ticket() {
    try {
      return await helpdesk.emit('statistic:ticket');
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

  return { network, ticket, inspector, dashboard };
});
