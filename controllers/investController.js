// const UserModel = require('../models/User');
// const InvestModel = require('../models/invest');
// const plansModel = require('../models/plansModel');





// // Function to add 0.4% of the money invested after every 24 hours
// const addInterest = async (userId, planId, amount) => {
//     // Assuming you have a function to get the user's account balance
//     const user = await UserModel.findById(userId);

//     const plan = await plansModel.findById(planId);

//     // Calculate interest
//     const interest = amount * plan.percentageInterest; // 0.4% of the amount

//     // Add interest to the user's account balance
//     user.acctBalance += interest;
//     await user.save();

//     // Log the interest transaction
//     const interestTransaction = new depositModel({
//         user: userId,
//         amount: interest,
//         total: user.acctBalance
//     });
//     await interestTransaction.save();

//     // Log the interest transaction in history
//     const interestHistory = new historyModel({
//         userId,
//         transactionType: 'Interest',
//         amount: interest
//     });
//     await interestHistory.save();

//     // Log a notification message for the user
//     const notificationMessage = `Hi ${user.userName}, you earned ${interest} interest on your ${coin} deposit.`;
//     const message = new msgModel({
//         userId,
//         msg: notificationMessage
//     });
//     await message.save();
// };



// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount } = req.body;

//         // Find the user and check if they have enough balance
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (user.accountBalance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }

//         // Deduct the amount from the user's balance
//         user.accountBalance -= amount;
//         await user.save();

//         // Create the investment record
//         const investment = new InvestModel({
//             plan: planId,
//             amount: amount,
//             transactionType: user.transactionType
//         });
//         await investment.save();

//         // Update the user's total investment
//         user.totalInvestment += amount;
//         await user.save();

//         user.investmentPlan.push(investment._id)

//          // Save the transfer id to the user
//          user.Transactions.push(investment._id);
//          await user.save();
 
//          // Create a transaction history for the user and save
//          const History = new historyModel({
//              userId: user._id,
//              transactionType: investment.transactionType,
//              amount: `${amount}`,
//          });
//          await History.save();
 
//          // Create a notification message for the user and save
//          if (investment) {
//              const msg = `Hi ${user.fullName}, you just invested ${amount}.`;
//              const message = new msgModel({
//                  userId: user._id,
//                  msg
//              });
//              await message.save();
//          }
//           // Call the function to add interest after 24 hours
//             setInterval(() => {
//                 addInterest(userId, newAmount, planId);
//             },24 * 60 * 60  * 1000);


//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// const InterestModel = require('../models/InterestModel');
// const UserModel = require('../models/User');
// const InvestModel = require('../models/investModel');
// const PlansModel = require('../models/plansModel');
// const { addDays } = require('date-fns');
// const userPlanModel = require('../models/userPlanModel');
// const luxon = require('luxon')

// // Function to add 0.4% of the money invested after every 24 hours
// const addInterest = async (userId, planId, totalDailyInterest) => {
//     try {
//         const user = await UserModel.findById(userId);
//         const plan = await PlansModel.findById(planId);
//         if (!user || !plan) {
//             throw new Error('User or plan not found');
//         }
         
//         const interest = plan.percentageInterest  // Calculate interest

//         user.accountBalance += parseFloat(interest); // Add interest to the user's account balance
//         await user.save();

//         user.totalProfit += parseFloat(interest) ; // Add interest to the user's account balance
//         await user.save();

//         totalDailyInterest += parseFloat(interest);

//         // Log the interest transaction
//         const interestTransaction = new InterestModel({
//             user: userId,
//             plan: planId,
//             amount: interest,
//             transactionType: 'Interest',
//         });
//         await interestTransaction.save()


//         user.Transactions.interests.push(interestTransaction._id);

//         await user.save();

//         // Log the interest transaction in history
//         const history = new historyModel({
//             userId,
//             transactionType: 'Interest',
//             amount: interest
//         });
//         await history.save();

//         // Log a notification message for the user
//         const notificationMessage = `Hi ${user.fullName}, you earned ${interest} interest on your ${plan.planName} investment.`;
//         const message = new MsgModel({
//             userId,
//             msg: notificationMessage
//         });
//         await message.save();



//         // Find the investment using the investmentId and update its Interests array
//         const { investment } = interestTransaction;
//         const myInvest = await InvestModel.findById(investment);
//         if (myInvest) {
//             myInvest.Interests.push(interestTransaction._id);
//             await myInvest.save();
//         } else {
//             throw new Error('Investment not found');
//         }


//     } catch (error) {
//         console.error('Error adding interest:', error);
//     }
// };

// exports.makeInvestment = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { planId, amount } = req.body;

//         const user = await UserModel.findById(userId);
//         const plan = await PlansModel.findById(planId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (!plan) {
//             return res.status(404).json({ message: 'plan not found' });
//         }

//         if (user.accountBalance < amount) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }
//         if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
//             return res.status(400).json({ message: `Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}` });
//         }

//         // Deduct the amount from the user's balance
//         user.accountBalance -= amount;
//         await user.save();


//         const { DateTime } = require('luxon');

//             // Get the current date and time
//             const currentDate = DateTime.now();

//             // Format the current date and time as a string
//             const formattedDate = currentDate.toLocaleString({
//             weekday: "short",
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit"
//             });
//         const formattedDateTime = DateTime.fromFormat(formattedDate, "EEE, MMM d, yyyy, h:mm a");

//         // Add 6 days to the formatted date
//         const endDateFormatted = formattedDateTime.plus({ days: plan.durationDays });
        
//         const endDate = endDateFormatted.toLocaleString({
//             weekday: "short",
//             month: "short",
//             day: "2-digit",
//             year: "numeric"
//           });

//         // Create the investment record
//         const investment = new InvestModel({
//             user: userId,
//             plan: planId,
//             amount: amount,
//             endDate,
//             totalDailyInterest : 0
//         });
//         await investment.save();

       
                
//         investment.user = userId

//         plan.investment = investment._id;
//         await plan.save();


//         // Create a new userPlan document for each investment
//         const userPlan = new userPlanModel({
//             plan: planId,
//             user: userId,
//             investment: [investment._id] 
//         });



//         await userPlan.save();
//         // Save the transfer id to the user
//         user.Transactions.investments.push(investment._id);
//         user.investmentPlan.push(userPlan._id);



//         // Update the user's total investment
//         user.totalInvestment += parseFloat(amount);
//         await user.save();


// // Schedule interest calculation based on the plan's duration
// const expirationDate = addDays(new Date(), plan.durationDays);
// const timeUntilExpiration = expirationDate - Date.now();
// const interval = 1000; // 24 hours in milliseconds

// // Calculate the initial delay until the next 24-hour interval
// const initialDelay = timeUntilExpiration % interval;

// // Add interest immediately
// addInterest(userId, planId, amount, investment.totalDailyInterest);

// // Schedule interest calculation every 24 hours until the expiration date
// setInterval(() => {
//     addInterest(userId, planId, amount, investment.totalDailyInterest);
// }, interval);



//         res.status(200).json({ message: 'Investment successful', data: investment });
//     } catch (error) {
//         console.error('Error making investment:', error);
//         res.status(500).json({ error: error.message });
//     }
// };



const cron = require('node-cron');
const InterestModel = require('../models/InterestModel');
const UserModel = require('../models/User');
const InvestModel = require('../models/investModel');
const PlansModel = require('../models/plansModel');
const userPlanModel = require('../models/userPlanModel');
const luxon = require('luxon');
const { DateTime } = luxon;

// Function to add interest based on the invested amount
const addInterest = async (investmentId) => {
    try {
        const investment = await InvestModel.findById(investmentId).populate('user plan');
        if (!investment || !investment.user || !investment.plan) {
            throw new Error('Investment, user, or plan not found');
        }

        const user = investment.user;
        const plan = investment.plan;

        // Check if the investment has expired
        const currentDate = DateTime.now();
        const endDate = DateTime.fromJSDate(investment.endDate);
        if (currentDate > endDate) {
            if (global.cronJobs[investmentId]) {
                global.cronJobs[investmentId].stop();
                delete global.cronJobs[investmentId];
                console.log(`⏹️ Stopped cron job for expired investment: ${investmentId}`);
            }
            return;
        }

        const interestAmount = (investment.amount * plan.percentageInterest) / 100;

        // Update user
        user.accountBalance += interestAmount;
        user.totalProfit += interestAmount;

        if (!user.Transactions) user.Transactions = { interests: [] };
        if (!Array.isArray(user.Transactions.interests)) {
            user.Transactions.interests = [];
        }

        // Update investment
        investment.totalDailyInterest += interestAmount;
        if (!Array.isArray(investment.Interests)) {
            investment.Interests = [];
        }

        // Create interest transaction
        const interestTransaction = new InterestModel({
            user: user._id,
            plan: plan._id,
            investment: investment._id,
            amount: interestAmount,
            transactionType: 'Interest',
        });
        await interestTransaction.save();

        // Append transaction to user & investment
        user.Transactions.interests.push(interestTransaction._id);
        investment.Interests.push(interestTransaction._id);

        // Save both
        await Promise.all([
            user.save(),
            investment.save()
        ]);

        console.log(`✅ Interest added for investment ${investmentId}: ${interestAmount}`);
        
        // You can trigger user notifications here if needed

    } catch (error) {
        console.error('❌ Error adding interest:', error.message || error);
    }
};




const makeInvestment = async (req, res) => {
    try {
        const { userId } = req.params;
        const { planId, amount } = req.body;

        const user = await UserModel.findById(userId);
        const plan = await PlansModel.findById(planId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        if (user.accountBalance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        if (amount < plan.minimumDeposit || amount > plan.maximumDeposit) {
            return res.status(400).json({ message: `Amount must be between ${plan.minimumDeposit} and ${plan.maximumDeposit}` });
        }

        // Deduct the amount from the user's balance
        user.accountBalance -= amount;
        await user.save();

        const currentDate = DateTime.now();
        const endDate = currentDate.plus({ days: plan.durationDays });

        // Create the investment record
        const investment = new InvestModel({
            user: userId,
            plan: planId,
            amount: amount,
            endDate: endDate.toJSDate(),
            totalDailyInterest: 0
        });
        await investment.save();

        // Create a new userPlan document for each investment
        const userPlan = new userPlanModel({
            plan: planId,
            user: userId,
            investment: [investment._id] 
        });
        await userPlan.save();

        // Update user's investments and total investment
        user.Transactions.investments.push(investment._id);
        user.investmentPlan.push(userPlan._id);
        user.totalInvestment += parseFloat(amount);
        await user.save();

        // Schedule interest calculation using cron
        const cronJob = cron.schedule('0 0 * * *', () => { // Runs every day at midnight
            addInterest(investment._id);
        });

        // const cronJob = cron.schedule('*/2 * * * *', () => { // Runs every 2 minutes
        //     addInterest(investment._id);
        // });

        // Store the cron job reference
        global.cronJobs[investment._id] = cronJob;

        res.status(200).json({ message: 'Investment successful', data: investment });
    } catch (error) {
        console.error('Error making investment:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addInterest,
    makeInvestment
    // ... other exports if needed
};