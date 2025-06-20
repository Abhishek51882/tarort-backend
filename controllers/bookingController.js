const Booking = require("../models/Booking");
const transporter = require("../utils/mailer");

exports.createBooking = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            dob,
            placeOfBirth,
            timeOfBirth,
            currentCity,
            questions,
            serviceId,
            serviceName,
            amount
        } = req.body;

        // Save booking if needed
        // const booking = await Booking.create(req.body);
        console.log(req.body)
        res.status(201).json({ message: "Booking created successfully!" });
        

        (async () => {
            try {
                // =========================
                // ✨ Client Email
                // =========================
                await transporter.sendMail({
                    from: `"Divine Sspirit Tarot Team" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: `🌸 Thankyou for reaching-Your Booking will be confirmed within 24hrs after screenshot of payment - ${serviceName}`,
                    html: `
                        <div style="font-family: 'Segoe UI', sans-serif; background: #fff8f0; padding: 30px; color: #333;">
                            <h1 style="color: #d63384;">🕉️ Thank You, ${name}!</h1>
                            <p style="font-size: 16px;">We are delighted to confirm your <strong>${serviceName}</strong> session.</p>
                           
                            <blockquote style="font-style: italic; color: #666; margin: 20px 0;">
                                "Healing is a matter of time, but it is sometimes also a matter of opportunity." — Hippocrates
                            </blockquote>
                           
                            <h3 style="margin-top: 30px; color: #6f42c1;">🗓️ Booking Details</h3>
                            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                                <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
                                <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                                <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
                                <tr><td><strong>Date of Birth:</strong></td><td>${dob}</td></tr>
                                <tr><td><strong>Time of Birth:</strong></td><td>${timeOfBirth}</td></tr>
                                <tr><td><strong>Place of Birth:</strong></td><td>${placeOfBirth}</td></tr>
                                <tr><td><strong>Current City:</strong></td><td>${currentCity}</td></tr>
                                <tr><td><strong>Service:</strong></td><td>${serviceName}</td></tr>
                                <tr><td><strong>Amount Paid:</strong></td><td>₹${amount}</td></tr>
                                <tr><td><strong>Your Questions:</strong></td><td>${questions || 'N/A'}</td></tr>
                            </table>

                            <p style="margin-top: 30px;">Our team will contact you soon to guide you through the process. For any urgent queries, feel free to reach out at <a href="tel:+919034060726">9034060726</a>.</p>

                            <div style="margin-top: 40px; text-align: center;">
                                <p style="font-size: 18px; font-weight: bold; color: #20c997;">✨ Awaken Your Energy. Embrace the Divine. ✨</p>
                            </div>

                            <p style="color: #999; margin-top: 40px;">With gratitude,<br><strong>Divine Sspirit Tarot Team</strong></p>
                            <p style="font-size: 16px; font-weight: bold; color: #6f42c1; text-align: center;">Sheenam Goel</p>
                            </div>
                    `
                });

                // =========================
                // 📩 Admin Notification
                // =========================
                await transporter.sendMail({
                    from: `"Booking Bot" <${process.env.EMAIL_USER}>`,
                    to: process.env.EMAIL_USER,
                    subject: `🔔 New Booking: ${name} - ${serviceName}`,
                    html: `
                        <div style="font-family: 'Segoe UI', sans-serif; background: #f5f5f5; padding: 25px; color: #222;">
                            <h2 style="color: #d63384;">📥 New Booking Received</h2>
                            <p><strong>Service:</strong> ${serviceName} (ID: ${serviceId})</p>
                            <table style="margin-top: 20px; width: 100%; border-collapse: collapse;">
                                <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
                                <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                                <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
                                <tr><td><strong>Date of Birth:</strong></td><td>${dob}</td></tr>
                                <tr><td><strong>Time of Birth:</strong></td><td>${timeOfBirth}</td></tr>
                                <tr><td><strong>Place of Birth:</strong></td><td>${placeOfBirth}</td></tr>
                                <tr><td><strong>Current City:</strong></td><td>${currentCity}</td></tr>
                                <tr><td><strong>Client Questions:</strong></td><td>${questions || 'N/A'}</td></tr>
                                <tr><td><strong>Amount:</strong></td><td>₹${amount}</td></tr>
                            </table>

                            <p style="margin-top: 30px; font-size: 14px; color: #555;">
                                Please reach out to the client as soon as possible to begin the session process.
                            </p>

                            <p style="color: #999;">— Divine Booking System</p>
                        </div>
                    `
                });

                console.log("Emails sent successfully!");
            } catch (emailError) {
                console.error("Error sending emails:", emailError);
            }
        })();

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
};