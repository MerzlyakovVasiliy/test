# Тестовая задача A SWISS GROUP

## Описание

Данное React-приложение позволяет добавлять, редактировать и управлять пользователями, используя API и локальное хранилище. Интерфейс включает форму добавления/редактирования пользователя и таблицу со списком пользователей с возможностью сортировки и поиска.

## Функциональность

- Форма добавления/редактирования пользователя:
  - Выбор пользователя из списка (с бесконечной прокруткой и фильтрацией);
  - Выбор пола и соответствующей роли;
  - Выбор даты рождения (с ограничением по возрасту);
  - Валидация полей формы (при `onBlur` и перед отправкой);
  - Автоматический фокус на первом ошибочном поле при валидации;
  - Отправка данных на сервер.
- Таблица пользователей:
  - Отображение списка пользователей с возможностью сортировки;
  - Поиск по фамилии;
  - Возможность редактирования и удаления пользователя (с подтверждением).
- Общие условия:
  - Анимации интерактивных элементов;
  - Индикаторы загрузки при взаимодействии с API;
  - Модальные окна для подтверждений и уведомлений о статусе операций;
  - Данные сохраняются в `localStorage`.

## Технологии

- React (с хуками);
- React Router;
- Redux Toolkit (для управления состоянием);
- Axios (для работы с API);
- TypeScript;
- Tailwind CSS (для стилизации);
- React Hook Form + Yup (для валидации форм);
- React Query (для кеширования данных API);
- Framer Motion (для анимаций).

## Установка и запуск

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```
3. Запустите приложение:
   ```sh
   npm run dev
   ```

## Деплой

Приложение опубликовано по адресу: [Ссылка на приложение](https://merzlyakovvasiliy.github.io/test/)

## API

Используемый API описан в Swagger: [Swagger UI](https://reqres.in/api-docs/)

## Макет Figma

Используемый макет в Figma: [Figma](https://www.figma.com/design/rAa3XzzbPr2YgBVXfqF8cm/Test?node-id=0-1&p=f&t=qYLk5aKwq1tEJLZ2-0)

