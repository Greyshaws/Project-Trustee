const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel");
const signer = require('../signer');
const { subStatus, M5, M10, M30, H1, M2 } = require('../utils');

const creditorAction = async (period) => {
    try {
        const subscriptions = await Subscription.find({ period, status: subStatus.checked });
        console.log(subscriptions)
        await checkWillStatus(subscriptions)

    } catch (e) {
        console.error(e)
    }
}

async function checkWillStatus(subscriptions) {
    for await (const sub of subscriptions) {

        const status = await signer.getTrustStatus(sub.address);
      
        console.log(status)
        
        if (status[0] && status[1]) {
            // bulk transfer
        }

    }
}

cron.schedule(M2, async () => {

    console.log("running creditor 2 minites")

    await creditorAction(0)

});


cron.schedule(M5, async () => {

    console.log("running creditor 5 minites")

    await creditorAction(0)

});

cron.schedule(M10, async () => {

    console.log("running creditor 10 minites")

    await creditorAction(1)

});

cron.schedule(M30, async () => {

    console.log("running creditor 30 minites")

    await creditorAction(2)

});

cron.schedule(H1, async () => {

    console.log("running creditor 1 hour")

    await creditorAction(3)

});

cron.schedule('0 * * * *', async () => {

    console.log("running creditor 1 hour")

    await creditorAction(4)

});

cron.schedule('0 * * * *', async () => {

    console.log("running creditor 1 hour")

    await creditorAction(5)

});

