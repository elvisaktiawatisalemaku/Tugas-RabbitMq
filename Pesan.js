const amqp = require('amqplib');

console.log("Masukkan Pesanan di Restoran:");
process.stdin.once('data', (chunk) => {
    let pesanan = chunk.toString().trim();
    console.log("Pesananmu adalah : " + pesanan + "!");

    console.log("Jumlah Orang:");
    process.stdin.once('data', (chunk) => {
        let jumlah = chunk.toString().trim();
        console.log("Jumlah : " + jumlah + " orang");

        amqp.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel().then(ch => {
                    const q = 'PemesananRestoran';
                    const msg = pesanan + " - " + jumlah + " orang";

                    const ok = ch.assertQueue(q, { durable: false });
                    return ok.then(() => {
                        ch.sendToQueue(q, Buffer.from(msg));
                        return ch.close();
                    });
                }).finally(() => conn.close());
            }).catch(console.warn);
    });
});
