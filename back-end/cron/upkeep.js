const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel");
const { subStatus, M5, M10, M30, H1 } = require('../utils');

const upkeepAction = async (period) => {
    try {
        await Subscription.updateMany({ period, status: subStatus.subscription, isNew: false }, { $set: { status: subStatus.checked } });
        await Subscription.updateMany({ period, status: subStatus.subscription, isNew: true }, { $set: { isNew: false } });
    } catch (e) {
        console.error(e)
    }
}


cron.schedule(M5, async () => {

    console.log("running upkeep 5 minites")

    await upkeepAction(0)

});

cron.schedule(M10, async () => {

    console.log("running upkeep 10 minites")

    await upkeepAction(1)

});

cron.schedule(M30, async () => {

    console.log("running upkeep 30 minites")

    await upkeepAction(2)

});

cron.schedule(H1, async () => {

    console.log("running upkeep 1 hour")

    await upkeepAction(3)

});

// cron.schedule('0 * * * *', async () => {

//     console.log("running upkeep 1 hour")

//     await upkeepAction(4)

// });

// cron.schedule('0 * * * *', async () => {

//     console.log("running upkeep 1 hour")

//     await upkeepAction(5)

// });