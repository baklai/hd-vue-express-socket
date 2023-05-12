import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useTool = defineStore('tool', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function getVBS() {
    try {
      return await helpdesk.emit('tool:inspector');
    } catch (err) {
      error.setError(err);
    }
  }

  async function getRDP(host) {
    try {
      return await helpdesk.emit('tool:rdp', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getVNC(host) {
    try {
      return await helpdesk.emit('tool:vnc', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getPING(host) {
    try {
      return await helpdesk.emit('tool:ping', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  return { getVBS, getRDP, getVNC, getPING };
});
