SELECT 'CREATE DATABASE zinventory'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'zinventory')\gexec