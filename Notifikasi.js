const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const ok = ch.assertQueue('PemesananRestoran', { durable: false });
            return ok.then(() => {
                console.log('Mencari Pemesanan di Restoran yang Masuk!');

            }).then(() => {
                return ch.consume('PemesananRestoran', msg => console.log('Pemesanan di Restoran Masuk: ', msg.content.toString()));
            });
        });
    })
    .catch(console.warn);
