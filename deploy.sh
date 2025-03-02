git pull origin master
npm install
npm run build
#pm2 start npm --name "beereader-vite-preview" -- run preview
pm2 restart beereader-vite-preview
