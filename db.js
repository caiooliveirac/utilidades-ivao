const mysqlx = require('@mysql/xdevapi');

const config = { schema: 'atp', table: 'aeronaves', user: process.env.DB_USER }

mysqlx.getSession({ user: config.user })
    .then(session => {
        return session.sql(`create database if not exists ${config.schema}`)
            .execute()
            .then(() => {
                return session.sql(`create table if not exists ${config.schema}.${config.table} (idaeronave TINYINT UNSIGNED NOT NULL, nome VARCHAR(45), tipo VARCHAR(5), fabricante VARCHAR(45))`)
                    .execute()
            })
            .then(() => {
                const table = session.getSchema(config.schema).getTable(config.table);

                return table.insert('nome', 'tipo', 'fabricante')
                    .values('Embraer 190', 'E190', 'Embraer')
                    .execute()
                    .then(() => {
                        return table.select('nome', 'tipo','fabricante')
                            .execute()
                    })
                    .then(res => {
                        console.log(res.fetchOne()); 
                    })
                    
                    .then(() => {
                        return table.select('nome', 'fabricante')
                            .where('nome = :v')
                            .bind('v', 'Airbus A320')
                            .execute()
                    })
                    .then(res => {
                        console.log(res.fetchOne()); 
                    })
                    
                    .then(() => {
                        return table.select()
                            .execute()
                    })
                    .then(res => {
                        console.log(res.fetchAll()); // []
                    });
            })
            .then(() => {
                return session.sql(`SELECT * FROM ${config.schema}.${config.table}`)
                    .execute();
            })
            
            .then(() => {
                return session.close();
            });
    });