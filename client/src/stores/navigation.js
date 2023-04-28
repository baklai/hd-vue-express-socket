import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useNavigationStore = defineStore('navigation', () => {
  const router = useRouter();

  const navigation = ref([
    {
      items: [getRoute('home'), getRoute('docs')]
    },
    {
      title: 'Applications',
      items: [
        getRoute('calendar-events'),
        {
          ...getRoute('network-info'),
          items: [
            getRoute('network-channels'),
            getRoute('network-ip-address'),
            getRoute('network-vpn-clients'),
            getRoute('network-statistics')
          ]
        },
        {
          ...getRoute('operational-journal'),
          items: [getRoute('operational-journal-requests'), getRoute('operational-journal-statistics')]
        },
        {
          ...getRoute('pc-sys-inspector'),
          items: [getRoute('pc-sys-inspector-reports'), getRoute('pc-sys-inspector-statistics')]
        },
        getRoute('ping-icmp')
      ]
    },
    {
      title: 'Administration',
      separator: false,
      items: [getRoute('core-dashboard'), getRoute('core-log-audit'), getRoute('core-options'), getRoute('core-users')]
    }
  ]);

  function getRoute(name) {
    const routes = router.getRoutes();
    const route = routes.find((item) => item.name === name);
    return { title: route.meta.title, to: route.path, icon: route.name };
  }

  return { navigation };
});
