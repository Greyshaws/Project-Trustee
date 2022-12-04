const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel")
const signer = require('../signer');
const { subStatus, cronConfig } = require('../utils');

const MAX_QUERY = 15
const CONTRACT = process.env.CONTRACT

cron.schedule('* * * * *', async () => {

  console.log('Listening For New subscription');

  try {

    const index = Number((await Subscription.findOne({contract: CONTRACT}).sort("-index").select('index'))?.index) | 0

    const count = Number(await signer.checkSubscriptions())
  
    if (count > index) {

      const difference = count - index;

      let subscriptions = []

      if (difference > MAX_QUERY){
        subscriptions = await signer.getSubscriptions(index+ 1, index + MAX_QUERY);
      } else {
        subscriptions = await signer.getSubscriptions(index+ 1, count + 1)
      }

      const newSubscriptions = subscriptions.map((sub, i) => {
        return { contract: CONTRACT, address: sub[0], period: sub[1], price: sub[2], index: i + index + 1 }
      })

      await updateOldSubs(newSubscriptions)

      await Subscription.insertMany(newSubscriptions)

      console.log(newSubscriptions)

    }

  } catch (e) {
    console.error(e)
  }


}, cronConfig);


async function updateOldSubs (subscriptions) {
  for await (const sub of subscriptions) {
    await Subscription.updateMany({ status: subStatus.checked, address: sub.address, contract: CONTRACT }, { status: subStatus.renewed})
  }
}
