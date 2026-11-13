# ASSET_INVENTORY.md

## Источники и правила переноса

Проект: PREMIUM DIGITAL PORTFOLIO 2026. Исходный репозиторий: https://github.com/nalyd45l-bit/salary-increase-portfolio . Прочитанный коммит: `b348ed09b8afa035a427efbf8dd173b2f5194d48`.

Материалы скопированы в отдельный новый проект. Старый репозиторий не изменялся. Каждый из 32 файлов каталога assets проверен по SHA-256; копии побайтно совпадают. Полный машиночитаемый реестр: [reference/asset-manifest.json](reference/asset-manifest.json).

Существующие изображения считаются исходными предоставленными материалами, а не независимо проверенными необработанными снимками интерфейсов. Презентационные коллажи не переименовываются в новые скриншоты и не перерисовываются. Надписи внутри них сохраняются.

## Материалы четырёх проектов

| Проект | Оригинальный материал | Производная копия в старом проекте | Использование |
| --- | --- | --- | --- |
| Аналитика ТС ПИОТ | `piot-original.webp`, 1600×924 | `project-1.webp`, 720 px по ширине | Существующий презентационный материал интерфейса на компьютере и телефоне |
| Python-бот проверки ФН | `fn-bot-original.webp`, 622×365 | Отдельная уменьшенная копия не найдена | Снимок Google Таблицы с номерами, статусами и типами ФН |
| LIFE PAY ERP | `erp-portal-original.webp`, 1600×900 | `project-3.webp`, 720 px по ширине | Существующая презентация платформы, включая направления в доработке |
| Передача заявок | `partner-intake-original.webp`, 1600×900 | `project-4.webp`, 720 px по ширине | Существующая схема: веб-форма → обработка → Google Таблица |

Путь ко всем указанным файлам: `public/source-materials/assets/`. Нумерация на старых изображениях сохранена: например, ERP подписана «Проект 4», передача заявок — «Проект 02». Она отличается от нового порядка кейсов; пиксели исходников не изменяются.

Дополнительно сохранены `esp-original.webp` (материал ESP-пилота), портрет `dmitry-kozlov-cf7163d559.jpg` (753×921), оба файла логотипа LIFE PAY и старый favicon.

## Все изображения и иконки из assets старого проекта

| Файл относительно assets | Размер / длительность | Байты |
| --- | --- | ---: |
| `dmitry-kozlov-cf7163d559.jpg` | 753×921; 0.040 с | 92625 |
| `erp-portal-original.webp` | 1600×900 | 193382 |
| `esp-original.webp` | 960×540 | 32438 |
| `favicon.svg` | — | 164 |
| `fn-bot-original.webp` | 622×365 | 25784 |
| `lifepay-logo-BlyhidjW.svg` | — | 3851 |
| `lifepay-logo.png` | 235×77 | 21618 |
| `media/account-poster.webp` | 1280×720 | 45314 |
| `media/fn36-poster.webp` | 1280×720 | 25378 |
| `media/hero-poster.webp` | 1280×720 | 40702 |
| `media/payment-poster.webp` | 1280×720 | 52304 |
| `partner-intake-original.webp` | 1600×900 | 96408 |
| `piot-original.webp` | 1600×924 | 77498 |
| `project-1.webp` | 720×416 | 19020 |
| `project-3.webp` | 720×405 | 44564 |
| `project-4.webp` | 720×405 | 23350 |

## Все видео старого проекта

Роли: `source-*` — исходные предоставленные ролики; `*-loop` — уже существующие в старом проекте подготовленные версии; `*-mobile` — уже существующие мобильные варианты. Ничего из этого не перекодировано при переносе.

| Файл | Размер / длительность | Байты |
| --- | --- | ---: |
| `media/account-loop.mp4` | 1280×720; 9.250 с | 1143360 |
| `media/account-mobile.mp4` | 854×480; 9.250 с | 510204 |
| `media/fn36-loop.mp4` | 1280×720; 9.250 с | 1167628 |
| `media/fn36-mobile.mp4` | 854×480; 9.250 с | 530153 |
| `media/hero-loop.mp4` | 1280×720; 14.167 с | 1457848 |
| `media/hero-mobile.mp4` | 854×480; 14.167 с | 672598 |
| `media/payment-loop.mp4` | 1280×720; 14.167 с | 2307274 |
| `media/payment-mobile.mp4` | 854×480; 14.167 с | 1082023 |
| `media/source-account.mp4` | 1280×720; 10.027 с | 4067852 |
| `media/source-fn.mp4` | 1280×720; 10.027 с | 4061503 |
| `media/source-payment.mp4` | 1920×1080; 14.930 с | 8818458 |
| `media/source-terminal.mp4` | 1920×1080; 14.930 с | 5879448 |

Четыре сюжета старого проекта: кассовый терминал (`source-terminal`), фискальный накопитель (`source-fn`), оплата (`source-payment`), личный кабинет с аналитикой (`source-account`). Это иллюстративные видео, а не доказательства реальных платежей, личности или достигнутой выручки.

## Два новых утверждённых видео

| Файл нового проекта | Файл из чата | Параметры | SHA-256 |
| --- | --- | --- | --- |
| `public/videos/introduction.mp4` | `gemini_generated_video_79245921.mp4` | 1280×720; 10.027 с; 4425413 байт | `85dc5bf19ae7d8d86e8cd8b0230860455c9c691063064459cf745fae6b0f7e0f` |
| `public/videos/professional-growth.mp4` | `gemini_generated_video_7619daf2.mp4` | 1280×720; 10.027 с; 9034102 байт | `2001de92425fb2e45277465b69bc1a53061041d0706c0ffe3b6e001e81d616de` |

Оба новых файла сохранены без изменения видеоряда и контейнера. MP4 уже содержат moov перед медиаданными — дополнительная перестановка контейнера не требовалась. Отдельные вертикальные версии не предоставлены. Мобильная композиция выполняется CSS-кадрированием; это не новый ролик. Постеры `public/images/*-poster.jpg` извлечены из кадра на третьей секунде и являются производными материалами, а не оригинальными скриншотами проектов.

## Шрифты

Manrope: `manrope-cyrillic.woff2`, `manrope-latin.woff2`, `manrope-latin-ext.woff2`. Сохранена исходная лицензия `Manrope-OFL.txt`. Оригиналы находятся в `public/source-materials/assets/fonts/`; рабочие копии — `public/assets/fonts/`. Шрифты обслуживаются локально.

## Логотипы и иконки

Оригинальные файлы LIFE PAY: `lifepay-logo-BlyhidjW.svg` и `lifepay-logo.png`. Рабочая копия SVG: `public/icons/lifepay-logo.svg`. Логотипы СДЭК, АБ ИнБев Эфес, Wildberries и Армада-Авто в исходном репозитории не найдены. Они не заменены выдуманными логотипами.

Для нового раздела навыков добавлены брендовые SVG из Simple Icons: Excel, Google Sheets, Python, HTML5, CSS3, JavaScript, Google Apps Script, SAP, Streamlit, OpenAI, Gemini и Claude. Источник: `https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/<slug>.svg`; для Claude — текущая версия `simple-icons@latest`. Локальные копии: `public/icons/technologies/`. Simple Icons — сторонний каталог векторных знаков, а не официальный сайт каждого вендора. Файлы не перерисованы; лицензия CC0 и оговорки о товарных знаках — в [reference/ICON_SOURCES.md](reference/ICON_SOURCES.md).

Для обобщённых понятий (WMS, TMS, ERP, прогноз, генерация) используются текстовые обозначения, а не фиктивные фирменные логотипы. Иконки интерфейса — Lucide, лицензия ISC; это элементы нового интерфейса. Старые контактные SVG сохранены внутри `reference/source-snapshot/index.html`.

## Сохранённые скриншоты старого сайта и PDF

Каталог `reference/legacy-docs/` содержит существующие изображения проверки старого портфолио. Это снимки старого сайта, не новые снимки приложений:

- `portfolio-preview.pdf` — 4027306 байт.
- `preview-account.png` — 1113771 байт.
- `preview-continuous.png` — 844859 байт.
- `preview-desktop.png` — 928978 байт.
- `preview-finale.png` — 291326 байт.
- `preview-fn36-iphone.png` — 1390187 байт.
- `preview-fn36.png` — 1024722 байт.
- `preview-iphone.png` — 1165565 байт.
- `preview-payment.png` — 1067447 байт.
- `preview-profile-iphone.png` — 2643762 байт.
- `preview-profile.png` — 926658 байт.
- `preview-project.png` — 793446 байт.
- `preview-projects.png` — 123293 байт.
- `preview-responsibility.png` — 676698 байт.

Там же сохранены исходные QA-отчёты и SOURCES.md. Их утверждения читаются как исторические свидетельства, а не инструкции для нового проекта. Оригинальный PDF-резюме сохранён в `reference/resume/dmitry-kozlov-2026-11-13.pdf`, извлечённый текст — рядом. Каталог reference не входит в Vite public и не публикуется как ресурс сайта.

## Ссылки на приложения: свежая проверка

Проверка — обычный HTTP GET и чтение публичной HTML-страницы. Авторизация, отправка форм и создание реальных заявок не выполнялись. HTTP 200 не доказывает работоспособность серверных интеграций.

| Приложение | Адрес | Результат |
| --- | --- | --- |
| Аналитика ТС ПИОТ | https://nalyd45l-bit.github.io/piot-analytics/ | HTTP 200; существует страница входа с паролем. Внутренняя аналитика без авторизации не проверена |
| Передача заявок | https://life-pay-piot.tiiny.site/ | HTTP 200; в HTML найдены название формы, данные клиента, приоритет и параметры заявки. Реальная отправка не проверялась |
| Прежняя демонстрация ERP | https://life-pay-web-6a5k.vercel.app/ | HTTP 404; не представлять доступной демонстрацией |
| Бот ФН | Не найден | Публичный адрес отсутствует; использовать сохранённый скриншот и описание |
| Старое портфолио | https://nalyd45l-bit.github.io/salary-increase-portfolio/ | HTTP 200; источник материалов |

Сырые результаты: `reference/link-check.json`. Контакт автора: https://t.me/Kozlovcki . Подтверждённая личная почта из резюме — `diman232161@gmail.com`; рабочая `d.kozlov@life-pay.ru` присутствует в старом портфолио, но не выбирается основной для нового личного сайта.

## Прочие ссылки старого сайта

Это внешние источники прежнего раздела сравнения зарплат, а не проекты автора и не его достижения. Для нового личного портфолио не используются. Свежая проверка этих вакансий в текущую задачу не входила:

- https://dreamjob.ru/employers/303078/vakansii/139199875
- https://energybase.ru/vacancy/1169995
- https://finder.work/vacancies/37083599
- https://finder.work/vacancies/37734173
- https://finder.work/vacancies/37773448
- https://hh.ru/vacancy/139199875
- https://hh.ru/vacancy/139382843
- https://hh.ru/vacancy/139403870
- https://udalenka.work/vacancy/Spetsialist-podderzhki-pos-seti-ao-otp-bank-jsc-otp-bank/

Дополнительные источники происхождения: официальный SVG LIFE PAY `https://life-pay.ru/assets/lifepay-logo-BlyhidjW.svg`; Manrope `https://fonts.google.com/specimen/Manrope`; лицензия `https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt`. Прежний внешний визуальный референс из SOURCES.md не является ассетом и не перенесён: `https://www.instagram.com/reel/Dfnk8T2Mblw/`.
