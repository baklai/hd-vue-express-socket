import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useTool = defineStore('tool', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  async function getCommandPING({
    host = '127.0.0.1',
    numeric,
    bufferSize,
    numberOfEchos,
    TTL,
    timeout = 3,
    IPV6,
    IPV4
  }) {
    try {
      return await helpdesk.emit('tool:command:ping', { host, timeout }, 30000);
    } catch (err) {
      error.setError(err);
    }
  }

  async function getScriptInspector(payload) {
    try {
      return await helpdesk.emit('tool:script:inspector', { ...payload });
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
