
### 1. Клонируйте репозиторий

Сначала клонируйте репозиторий на свою машину:

```bash
git clone https://github.com/ayankz/Rsignal-chat-ui
cd Rsignal-chat-ui
```

### 2. Соберите Docker-образ

Для того чтобы собрать Docker-образ проекта, выполните следующую команду:

```bash
docker build -t rsignal-chat-ui .
```

Это создаст Docker-образ с тегом `rsignal-chat-ui` на основе Dockerfile в корневой директории проекта.

### 3. Запустите контейнер
После того как образ будет собран, вы можете запустить его в контейнере с помощью следующей команды:
```bash
docker run -d -p 8080:80 rsignal-chat-ui
```
### 4. Запустите без контейнера
```bash
git clone https://github.com/ayankz/Rsignal-chat-ui
cd Rsignal-chat-ui
npm install
npm run dev
```
