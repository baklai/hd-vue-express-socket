// const contextPath = import.meta.env.BASE_URL;

// export default class NodeService {
//     getTreeTableNodes() {
//         return fetch(contextPath + 'demo/data/treetablenodes.json')
//             .then((res) => res.json())
//             .then((d) => d.root);
//     }

//     getTreeNodes() {
//         return fetch(contextPath + 'demo/data/treenodes.json')
//             .then((res) => res.json())
//             .then((d) => d.root);
//     }
// }

import { useToast } from 'primevue/usetoast';

export default (host) => [
    {
        label: 'Options',
        items: [
            { label: 'New', icon: 'pi pi-fw pi-plus', command: () => {} },
            { label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr' }
        ]
    },
    { label: 'ICMP Ping', icon: 'pi pi-fw pi-search', command: () => onPing(host) },
    { label: 'RDP Connect', icon: 'pi pi-fw pi-times', command: () => getRDPClient(host) },
    { label: 'VNC Connect', icon: 'pi pi-fw pi-search', command: () => getVNCClient(host) },
    { label: 'IP to clipboard', icon: 'pi pi-fw pi-times', command: () => copyIPtoClipboard(host) }
];
