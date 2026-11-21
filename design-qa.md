# Design QA

## Visual target

Утверждённый вариант №4 White Liquid Glass: прозрачный центр, тонкая серебряная кромка, единый светлый офисный фон без человека в обычных разделах и самостоятельные видеосцены только для знакомства и профессионального роста.

## Проверки

- Production build: passed (`npm run build`).
- Desktop viewport: 1440 × 900, passed.
- Wide desktop viewport: 1835 × 743, passed; лицо не обрезается.
- Mobile viewport: 390 × 844, passed.
- Горизонтальная прокрутка: отсутствует на desktop и mobile.
- Ошибки JavaScript в консоли: отсутствуют.
- Первый и второй исходные MP4 подключены без изменения видеоряда.
- Первое видео воспроизводится сразу; второе загружается отложенно и начинает воспроизведение при входе в экран роста.
- Локальные пути видео, изображений, иконок и PDF учитывают base GitHub Pages.
- Панели опыта, навыков, проектов, результатов и контактов используют единый прозрачный стеклянный материал.
- Блок «Обо мне» содержит только утверждённый заголовок; добавлен единый блок реальных задач.
- Лишний промежуточный баннер скрыт.
- `prefers-reduced-motion` и Save-Data учитываются видеокомпонентом.

## Снимки проверки

- Wide desktop hero: `/tmp/wide.png`
- Desktop hero: `/tmp/desktop.png`
- Desktop content: `/tmp/about.png`, `/tmp/career-office.png`, `/tmp/skills.png`
- Mobile hero: `/tmp/mobile-final.png`
- Mobile content: `/tmp/about-mobile.png`, `/tmp/mobile-career-play.png`

**final result: passed**
