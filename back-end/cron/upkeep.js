const cron = require('node-cron');
const Subscription = require("../model/subscriptionModel")



cron.schedule('* * * * *', async () => {

  try {


    await Subscription.insertMany(newSubscriptions)


  } catch (e) {
    console.error(e)
  }


});
