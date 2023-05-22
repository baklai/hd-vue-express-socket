import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useNavigation = defineStore('navigation', () => {
  const Router = useRouter();

  const navigation = ref([
    {
      items: [
        getRoute('home'),
        {
          title: 'Docs of helpdesk',
          url: '/docs',
          icon: 'docs',
          target: '_blank',
          description: 'Docs of the technical support'
        }
      ]
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
          ...getRoute('helpdesk-live-log'),
          items: [getRoute('helpdesk-live-log-requests'), getRoute('helpdesk-live-log-statistics')]
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
      items: [
        getRoute('core-dashboard'),
        getRoute('core-log-audit'),
        getRoute('core-options'),
        getRoute('core-users')
      ]
    }
  ]);

  function getRoute(name) {
    const routes = Router.getRoutes();
    const route = routes.find((item) => item.name === name);
    return { title: route.meta.title, to: route.path, icon: route.name };
  }

  return { navigation };
});
