# 📦 Guia Oficial — Geração de Novas Versões do APK (Android)

Este documento descreve o **processo completo e definitivo** para gerar novas versões do APK do aplicativo Android, **sem Android Studio**, utilizando apenas linha de comando.

Use este guia para qualquer nova versão do app (2.0, 3.0, 4.0…).

---

## 🧠 Visão Geral da Arquitetura

O aplicativo é composto por duas camadas:

1. **Camada Web (HTML / CSS / JavaScript)**  
   Responsável por toda a interface e lógica do app.

2. **Camada Android (Capacitor + Gradle)**  
   Responsável apenas por empacotar o app web e gerar o APK.

⚠️ O Android **não consome o código-fonte diretamente**, apenas os arquivos gerados na pasta `dist`.

---

## ✅ Passo a Passo Completo para Gerar uma Nova Versão

### 1️⃣ Atualizar o código do aplicativo
Implemente as melhorias e novas funcionalidades normalmente no código web.

Opcional (recomendado):
git add .
git commit -m "feat: nova versão do app"

### 2️⃣ Gerar os arquivos web (PASSO OBRIGATÓRIO)
Na raiz do projeto:
npm run build

Esse comando gera/atualiza a pasta:
dist/

❗ Se este passo for ignorado, o APK será gerado com a versão antiga do app.

### 3️⃣ Sincronizar os arquivos web com o Android
Ainda na raiz do projeto:
npx cap sync android

Esse comando:
- Copia os arquivos da pasta dist para o projeto Android
- Atualiza plugins e dependências automaticamente

### 4️⃣ Atualizar a versão do aplicativo
Abra o arquivo:
android/app/build.gradle

Localize o bloco:
defaultConfig {
    versionCode 1
    versionName "1.0"
}

Atualize para a nova versão, por exemplo:
versionCode 2
versionName "2.0"

📌 Regras importantes:
- versionCode deve sempre ser incrementado
- versionName é a versão exibida ao usuário

### 5️⃣ Limpar o build anterior (boa prática)
Entre na pasta android:
cd android

Execute:
.\gradlew clean

### 6️⃣ Gerar o APK da nova versão
Ainda na pasta android:
.\gradlew assembleDebug

## 📍 Localização do APK Gerado
Após o build ser concluído com sucesso, o APK estará disponível em:
android/app/build/outputs/apk/debug/app-debug.apk
