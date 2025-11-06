const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Subscription = require("./models/Subscription");
const User = require("./models/User");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Reminder job connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Setup Mailtrap transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // Gmail uses SSL on port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


// Reminder Function
const sendReminders = async () => {
  const today = new Date();
  const next3Days = new Date();
  next3Days.setDate(today.getDate() + 3);

  try {
    console.log("🔍 Checking for upcoming subscriptions...");
    console.log("🗓 Today:", today.toISOString());
    console.log("🗓 Next 3 days:", next3Days.toISOString());

    const subscriptions = await Subscription.find({
      endDate: { $lte: next3Days, $gte: today },
    }).populate("userId");

    console.log("📦 Subscriptions found:", subscriptions.length);

    if (subscriptions.length === 0) {
      console.log("⚠️ No upcoming subscriptions found in this date range.");
    }

    for (const sub of subscriptions) {
      const user = sub.userId;
      console.log("➡ Processing:", sub.serviceName, "for user:", user ? user.email : "No user linked");

      if (!user || !user.email) {
        console.log("⚠️ Skipping: no valid user or email found.");
        continue;
      }

      const mailOptions = {
        from: "SubTrackr Reminder <no-reply@subtrackr.com>",
        to: user.email,
        subject: `Reminder: ${sub.serviceName} subscription is expiring soon`,
        text: `Hi ${user.name},\n\nYour ${sub.serviceName} subscription will expire on ${new Date(sub.endDate).toDateString()}.\n\nAmount: ₹${sub.amount}\nCategory: ${sub.category}\n\nRenew it soon to avoid interruption!\n\n- SubTrackr Team`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Reminder sent to ${user.email} for ${sub.serviceName}`);
        console.log("📨 Mailtrap message ID:", info.messageId);
      } catch (emailErr) {
        console.error("❌ Failed to send email to", user.email, ":", emailErr.message);
      }
    }
  } catch (err) {
    console.error("❌ Error sending reminders:", err);
  }
};

// Schedule the job (every minute for testing)
cron.schedule("* * * * *", sendReminders);

console.log("⏰ Reminder system started...");

// Run immediately for testing
sendReminders();
