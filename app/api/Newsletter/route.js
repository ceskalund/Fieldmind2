// app/api/Newsletter/route.js
export async function POST(request) {
    console.log('Newsletter API called');
    
    try {
      const { email } = await request.json();
      console.log('Email received:', email);
  
      if (!email) {
        return Response.json({ error: 'Email is required' }, { status: 400 });
      }
  
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
      }
  
      // Validate environment variables
      if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX || !process.env.MAILCHIMP_AUDIENCE_ID) {
        console.error('Missing required Mailchimp environment variables');
        return Response.json({ error: 'Server configuration error' }, { status: 500 });
      }
  
      const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`;
      
      // Create base64 encoded auth string for Basic Auth
      const auth = Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['website_signup'],
          merge_fields: {
            SIGNUP_SOURCE: 'Website Newsletter'
          }
        }),
      });
  
      const data = await response.json();
      console.log('Mailchimp response:', data);
  
      if (response.ok) {
        return Response.json({ 
          success: true, 
          message: 'Successfully subscribed! Check your email for a welcome message.' 
        });
      }
  
      // Handle specific Mailchimp API errors
      switch (data.title) {
        case 'Member Exists':
          return Response.json({ 
            error: 'This email is already subscribed to our newsletter!' 
          }, { status: 400 });
        
        case 'Invalid Resource':
          return Response.json({ 
            error: 'Please enter a valid email address' 
          }, { status: 400 });
        
        case 'API Key Invalid':
          console.error('Invalid Mailchimp API key');
          return Response.json({ 
            error: 'Server configuration error' 
          }, { status: 500 });
        
        case 'Resource Not Found':
          console.error('Invalid Mailchimp audience ID');
          return Response.json({ 
            error: 'Server configuration error' 
          }, { status: 500 });
        
        default:
          console.error('Mailchimp API Error:', data);
          return Response.json({ 
            error: data.detail || 'Failed to subscribe. Please try again.' 
          }, { status: response.status });
      }
  
    } catch (error) {
      console.error('Network Error:', error);
      return Response.json({ 
        error: 'Unable to connect to the newsletter service. Please try again later.' 
      }, { status: 500 });
    }
  }