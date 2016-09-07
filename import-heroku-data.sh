heroku pg:backups capture --app logoquizz
curl -o latest.dump `heroku pg:backups public-url --app logoquizz`
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d logoquiz latest.dump
rm latest.dump