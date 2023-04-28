<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import TerminalService from 'primevue/terminalservice';

onMounted(() => {
  TerminalService.on('command', commandHandler);
});

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler);
});

const commandHandler = (text) => {
  let response;
  let argsIndex = text.indexOf(' ');
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString();
      break;

    case 'greet':
      response = 'Hola ' + text.substring(argsIndex + 1);
      break;

    case 'random':
      response = Math.floor(Math.random() * 100);
      break;

    case 'ping':
      response = 'Ping Ok';
      break;

    default:
      response = 'Unknown command: ' + command;
  }

  TerminalService.emit('response', response);
};
</script>

<template>
  <div className="col-12">
    <div className="card h-full">
      <h1>{{ $t('ICMP Ping') }}</h1>
      <div>
        <p>Enter "date" to display the current date, "greet {0}" for a message and "random" to get a random number.</p>
        <Terminal
          welcomeMessage="Helpdesk [Version 10.0.22621.1413] \n (c) Корпорация Майкрософт (Microsoft Corporation). Все права защищены."
          prompt="HELPDESK$&nbsp;"
          class="dark-demo-terminal"
          aria-label="Helpdesk Terminal Service"
        />
      </div>

      <div>
        <p>
          -c &lt;количество> или --count=&lt;количество>: Позволяет указать количество пинг-запросов, которые будут
          отправлены. Например, "ping -c 5 google.com" отправит 5 пинг-запросов на сервер google.com и завершится.
        </p>

        <p>
          -s &lt;размер> или --size=&lt;размер>: Позволяет указать размер пакета данных, который будет отправлен в
          пинг-запросе. Например, "ping -s 100 google.com" отправит пинг-запросы с пакетами данных размером 100 байт.
        </p>

        <p>
          -i &lt;интервал> или --interval=&lt;интервал>: Позволяет указать интервал между отправкой пинг-запросов в
          секундах. Например, "ping -i 2 google.com" отправит пинг-запросы на сервер google.com с интервалом 2 секунды
          между ними.
        </p>

        <p>
          -t или --no-timestamps: Отключает вывод временных меток в результатах ping. Это может быть полезно, если не
          требуется вывод времени отклика в результатах.
        </p>

        <p>
          -v или --verbose: Включает подробный вывод результатов ping, включая информацию о каждом отправленном пакете и
          времени отклика.
        </p>

        <p>
          -r или --random: Отправляет пинг-запросы с случайным содержимым в пакетах данных. Это может помочь в
          обнаружении проблем, связанных с кэшированием на промежуточных узлах сети.
        </p>

        <p>-h или --help: Выводит справку о доступных ключах и их описании для команды ping.</p>
      </div>

      <div>dflghlkdfh</div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.dark-demo-terminal) {
  background-color: #212121;
  color: #ffffff;
}

::v-deep(.dark-demo-terminal .p-terminal-command) {
  color: #80cbc4;
}

::v-deep(.dark-demo-terminal .p-terminal-prompt) {
  color: #ffd54f;
}

::v-deep(.dark-demo-terminal .p-terminal-response) {
  color: #9fa8da;
}
</style>
