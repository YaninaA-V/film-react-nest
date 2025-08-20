# FILM!

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` 
* `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/practicum`.  

MongoDB должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.

## Деплой проекта 

Проект успешно запущен на удаленном сервере и доступен по следующим ссылкам:

### Основные приложения
- **Сайт** http://filmnest.nomorepartiessbs.ru/
- **API** http://filmnest.nomorepartiessbs.ru/api/afisha/films

### Инструменты администрирования
- **PgAdmin:** http://filmnest.nomorepartiessbs.ru:8080
  - Логин: `filmnest@localhost.net`
  - Пароль: `filmnest`

### БД
- **Хост:** `filmnest.nomorepartiessbs.ru`
- **Порт:** `5432` (доступен только через SSH tunnel)
- **База:** `film_nest_db`
- **Пользователь:** `user_for_film`

### SSH доступ 
ssh yanina@filmnest.nomorepartiessbs.ru

## Используемые технологии

- Frontend: React + Vite + TypeScript

- Backend: NestJS + PostgreSQL

- Infrastructure: Docker + Docker Compose

- Deployment: Yandex Cloud VM

- Domain: domain.nomoreparties.site




