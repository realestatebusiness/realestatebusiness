import twilio, { Twilio } from 'twilio';

let twilioClient: twilio.Twilio | null = null;

const initializeTwilio = (): twilio.Twilio | null => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SID;
    console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
    console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
    console.log('TWILIO_VERIFY_SID:', process.env.TWILIO_VERIFY_SID);


    if (!accountSid || !authToken || !verifySid) {
        console.error('Missing required Twilio credentials');
        return null;
    }

    try {
        const client = twilio(accountSid, authToken);
        console.log('Twilio client initialized successfully');
        return client;
    } catch (error) {
        console.error('Failed to initialize Twilio client:', error);
        return null;
    }
};

twilioClient = initializeTwilio();
export default twilioClient;