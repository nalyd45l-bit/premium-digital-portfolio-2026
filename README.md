# PREMIUM DIGITAL PORTFOLIO 2026

Новый персональный сайт Дмитрия Козлова: логистика, аналитика, автоматизация и разработка цифровых решений.

Старый репозиторий `salary-increase-portfolio` использован только как источник подтверждённых материалов и не изменялся.

## Технологии

- React + TypeScript + Vite
- GSAP / ScrollTrigger и Three.js предусмотрены архитектурой
- адаптивный White Liquid Glass
- два исходных MP4 без изменения видеоряда
- редактируемые данные в `src/content/`

## Локальный запуск

```sh
npm ci
npm run dev
```

Проверка и production-сборка:

```sh
npm run check
npm run build
```

## Структура

- `src/sections/` — разделы сайта.
- `src/components/` — общие компоненты.
- `src/content/` — карьера, навыки, проекты и подтверждённые результаты.
- `src/styles/` — визуальная система и адаптивность.
- `public/videos/` — `introduction.mp4` и `professional-growth.mp4`.
- `public/source-materials/` — оригинальные материалы проектов.
- `ASSET_INVENTORY.md` — каталог ресурсов и ссылок.
- `CONTENT_AUDIT.md` — аудит подтверждённого контента.
- `TODO.md` — дальнейший план.
- `design-qa.md` — результаты проверки интерфейса.

## GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически собирает и публикует `dist` после push в `main`.

В настройках репозитория Pages должен использовать источник **GitHub Actions**.

## Интеграции

Форма работодателей не имитирует отправку: до настройки защищённого обработчика посетителю предлагаются email и Telegram. Инструкция по Google Apps Script и Cloudflare Turnstile находится в `integrations/README.md`.

Google Analytics 4 активируется только после добавления Measurement ID и согласия посетителя. Секретные ключи не хранятся во frontend.
