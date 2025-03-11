import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI API Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure it's set in .env
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_API_KEY) {
  console.error('❌ ERROR: OpenAI API key is missing. Set OPENAI_API_KEY in your .env file.');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// ShopTalk Information (Preloaded Data)
const SHOPTALK_DATA = `
1. What is ShopTalk App?
ShopTalk is an extremely simplified version of workplace collaboration tool, particularly targeted towards MSMB business owners, leadership & teams. The objective is to build on established customer behaviour, like making calls, sending messages etc. ShopTalk accomplishes this by simply separating communication activity into 3 silos: personal, business, team.

By providing appropriate cloud connectivity teams can attach relevant price quotes, media, invoices, forms for data collection, order status in real-time & send it to customers in a way that fits the dominant behaviour.

2. Who is the target customer?
Though we are primarily focusing on helping small & medium businesses engage with customers, and collaborate among internal teams, ShopTalk can be used by business team of 1, to 1000+. 

We are happy to work with large enterprises in integrating with the large-scale systems via ShopTalk Enterprise Integration Framework.

3. What features does the ShopTalk Business App offer?
A brief overview of ShopTalk features is as follows:
- Messaging: Real-time communication through text, voice, and video calls.
- File Sharing: Share documents, images, videos, and other files securely within the app.
- Project Management: Organize tasks, set deadlines, and track progress on projects.
- Collaboration Tools: Collaborate with team members in real-time, share ideas, and work together effectively.
- Calendar Integration: Sync schedules and set reminders for important events or deadlines.
- Security: Robust security measures to protect sensitive business information.
- Customization: Tailor the app to fit your business needs with customizable features.

4. How can I get ShopTalk Business App?
You can download ShopTalk Business App from Google Play Store (the Apple AppStore release is in works). Simply search for "ShopTalk" or click here to download the app. It'd take 2 min to setup your team & get started.

5. Is ShopTalk App suitable for small businesses?
Yes, ShopTalk app is designed to cater to the needs of businesses of all sizes. Whether you run a small startup or a large enterprise, the app's features are scalable and adaptable to various business requirements.

6. Is ShopTalk App secure?
Yes, security is a top priority for ShopTalk App. The application employs robust encryption protocols and security measures to ensure that your business data and communications remain private and protected.

7. Can I invite external collaborators or clients to use ShopTalk?
At the moment ShopTalk does not have collaboration with "guest" members external to the team.

8. How user-friendly is ShopTalk app?
ShopTalk is designed with user-friendliness in mind. Its intuitive interface makes it easy for users to navigate through different features, communicate effectively, and collaborate with minimal learning curve. This is primarily due to app being designed around established user behaviour.

9. Is customer support available for ShopTalk app?
Multiple avenues are available for Support & Help. There are in-app help, & YouTube videos as a baseline. There is email support & phone support based on subscription tier. Finally there's paid support available on a per incidence basis.

10. Are there different subscription plans available for ShopTalk app?
Yes, ShopTalk app offers various subscription plans with different features and functionalities, including a FREE tier. Users can choose a plan based on their business needs and upgrade or downgrade as necessary.

11. Can I use ShopTalk app on multiple devices?
ShopTalk app is designed to be used on a single device per user, on which the SIM with the mobile number used for registration is installed. You can switch to different device, when you move your SIM to another device. The app would stop working on the older device.

12. Is ShopTalk compatible with different devices?
Right now ShopTalk is available on Android devices. iPhone & Desktop versions are in development.

13. How can I provide feedback or report issues with the app?
ShopTalk has a feedback section within the app. You can use this to report issues, suggest improvements, or seek assistance from the support team.

14. Is ShopTalk available in multiple languages and countries?
ShopTalk currently works in India. We'll be expanding to other countries in coming months. Multi-lingual support is also in the works.

15. Can I try ShopTalk before committing to a subscription?
Absolutely. ShopTalk is FREE to try all the features. Upon end of Trial period, there's still a version available to use for Free.
`;

// API Endpoint to Handle User Queries
app.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    // Build the message history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant that answers questions about ShopTalk App. Use the following information to answer questions accurately:\n\n${SHOPTALK_DATA}`,
      },
      { role: 'user', content: prompt },
    ];

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo', // Change to 'gpt-4' or 'gpt-4o' if available
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Send AI Response
    res.status(200).json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error('❌ Error fetching response:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch the answer. Please try again later.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
