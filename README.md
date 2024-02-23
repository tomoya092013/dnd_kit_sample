### frontend

```
docker-compose run frontend bash
npm install

※（コンテナ内でバージョン確認）
node -v
  → v18.17.1
npm -v
  → 9.6.7

コンテナぬける
exit
```

### コンテナ起動

```
docker-compose up
```

- frontend アクセス
  loclahost:4000

# モジュールの追加や CLI を使用する場合

```
コンテナ内で各種インストール
docker-compose exec frontend bash
```
