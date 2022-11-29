const cron = require('node-cron');
const Test = require("../model/testModel")



cron.schedule('* * * * *', async () => {

    console.log("Testing...")

    try {
        await Test.create({address: "0000000"})
    } catch (e) {
        console.error(e)
    }

});
