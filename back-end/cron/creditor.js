const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel");
const signer = require('../signer');
const { subStatus, M5, M10, M30, H1, M2 } = require('../utils');

const CONTRACT = process.env.CONTRACT

const creditorAction = async (period) => {
    try {
        const subscriptions = await Subscription.find({ contract: CONTRACT, period, status: subStatus.checked,  });
        await checkWillStatus(subscriptions)
    } catch (e) {
        console.error(e)
    }
}

const increaseCounter = async (sub) => {
    try {
        await Subscription.updateOne({_id: sub._id}, {  $inc: { checkCount : 1 } } );
    } catch (e) {
        console.error(e)
    }
}

const settled = async (sub) => {
    try {
        await Subscription.updateOne({_id: sub._id}, {  status: subStatus.activated } );
    } catch (e) {
        console.error(e)
    }
}

async function checkWillStatus(subscriptions) {

    for await (const sub of subscriptions) {

        const status = await signer.getTrustStatus(sub.address);
        
        if (status[0] && status[1]) {

            try {
                await signer.bulkTransfers(sub.address)
                await settled(sub)
            } catch (e) {
                console.error(e)
                await increaseCounter(sub)
            }

        }

    }

}

cron.schedule(M2, async () => {

    console.log("running creditor 2 minites")

    await creditorAction(0)

});


cron.schedule(M5, async () => {

    console.log("running creditor 5 minites")

    await creditorAction(1)

});

cron.schedule(M10, async () => {

    console.log("running creditor 10 minites")

    await creditorAction(2)

});

cron.schedule(M30, async () => {

    console.log("running creditor 30 minites")

    await creditorAction(3)

});

cron.schedule(H1, async () => {

    console.log("running creditor 1 hour")

    await creditorAction(4)

});

// cron.schedule('0 * * * *', async () => {

//     console.log("running creditor 1 hour")

//     await creditorAction(6)

// });

// cron.schedule('0 * * * *', async () => {

//     console.log("running creditor 1 hour")

//     await creditorAction(7)

// });

