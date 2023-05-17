import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useTool = defineStore('tool', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  async function getCommandPING(payload) {
    try {
      return await helpdesk.emit('tool:command:ping', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getScriptInspector(payload) {
    try {
      return await helpdesk.emit('tool:script:inspector', {});
    } catch (err) {
      error.setError(err);
    }
  }

  async function getLinkPING({ host }) {
    try {
      return await helpdesk.emit('tool:link:ping', { host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getLinkRDP({ host }) {
    try {
      return await helpdesk.emit('tool:link:rdp', { host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getLinkVNC({ host }) {
    try {
      return await helpdesk.emit('tool:link:vnc', { host });
    } catch (err) {
      error.setError(err);
    }
  }

  return { getCommandPING, getScriptInspector, getLinkPING, getLinkRDP, getLinkVNC };
});
