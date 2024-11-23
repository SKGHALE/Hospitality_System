const otpStore = {}; // Temporary in-memory store for OTPs

// Generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Mock function to send OTP (use Twilio or similar service in production)
function sendOtp(mobile, otp) {
  console.log(`Sending OTP ${otp} to mobile: ${mobile}`);
}

// Store OTP in memory
function storeOtp(mobile, otp) {
  otpStore[mobile] = otp;
  setTimeout(() => delete otpStore[mobile], 300000); // OTP expires in 5 minutes
}

// Verify OTP
function verifyOtp(mobile, otp) {
  return otpStore[mobile] === otp;
}

module.exports = { generateOtp, sendOtp, storeOtp, verifyOtp };
