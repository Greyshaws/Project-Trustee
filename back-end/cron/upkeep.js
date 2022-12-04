const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel");
const { subStatus, M5, M10, M30, H1, M2, cronConfig } = require('../utils');

const CONTRACT = process.env.CONTRACT

const upkeepAction = async (period) => {
    try {
        await Subscription.updateMany({ contract: CONTRACT, period, status: subStatus.subscription, new: false }, { $set: { status: subStatus.checked } });
        await Subscription.updateMany({ contract: CONTRACT, period, status: subStatus.subscription, new: true }, { $set: { new: false } });
    } catch (e) {
        console.error(e)
    }
}

cron.schedule(M2, async () => {

    console.log("running upkeep 2 minites")

    await upkeepAction(0)

}, cronConfig);

cron.schedule(M5, async () => {

    console.log("running upkeep 5 minites")

    await upkeepAction(1)

}, cronConfig);

cron.schedule(M10, async () => {

    console.log("running upkeep 10 minites")

    await upkeepAction(2)

}, cronConfig);

cron.schedule(M30, async () => {

    console.log("running upkeep 30 minites")

    await upkeepAction(3)

}, cronConfig);

cron.schedule(H1, async () => {

    console.log("running upkeep 1 hour")

    await upkeepAction(4)

}, cronConfig);


// cron.schedule(H1, async () => {

//     console.log("running daily upkeep")

//     await upkeepAction(5)

// }, cronConfig);
