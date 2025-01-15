  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const loginWithPassword = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed.');
    }
    return data;
  } catch (error) {
    console.error('Error in loginWithPassword:', error);
    throw error;
  }
};

export const sendOtp = async (mobileNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send OTP.');
    }
    return data;
  } catch (error) {
    console.error('Error in sendOtp:', error);
    throw error;
  }
};

export const verifyOtp = async (mobileNumber, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber, otp }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed.');
    }
    return data;
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    throw error;
  }
};

export const registerUser = async (username, password, mobile) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, mobile }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed.');
    }
    return data;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};
