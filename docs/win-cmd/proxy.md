---
title: Проксі
description: Налаштування проксі-сервера
author: Дмитро Баклай
created: 25.06.2022
category: Інтерпретатор командного рядка
---

# Налаштування проксі-сервера

Налаштування проксі-сервера за допомогою команди **[netsh](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/netsh 'Microsoft Dosc')**.
Службова програма командного рядка, яка дозволяє відображати або змінювати мережеву конфігурацію комп'ютера, або локально, або віддалено.

### Тунелювати весь інтернет-трафік через проксі

```
netsh winhttp set proxy proxy-server="http://proxy:port" bypass-list="127.0.0.1;localhost"
```

- `proxy-server` адреса проксі-сервера
- `bypass-list` список винятків, розділених `;`

### Переглянути поточні налаштування проксі

```
netsh winhttp show proxy
```

### Скинути всі налаштування проксі

```
netsh winhttp reset proxy
```
