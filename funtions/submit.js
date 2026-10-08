export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const full_name = formData.get('full_name') || formData.get('name') || 'N/A';
    const company_name = formData.get('company_name') || formData.get('company') || 'N/A';
    const country = formData.get('country') || 'N/A';
    const email = formData.get('email') || 'N/A';
    const phone = formData.get('phone') || formData.get('whatsapp') || 'N/A';
    const message = formData.get('message') || formData.get('inquiry') || 'N/A';
    const product = formData.get('product') || 'General Inquiry';

    const textBody = `NEW INQUIRY - nolindoglobal.com

Product: ${product}
Name: ${full_name}
Company: ${company_name}
Country: ${country}
Email: ${email}
WA/Phone: ${phone}
Message: ${message}

Time: ${new Date().toISOString()}
`;

    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ 
          to: [{ email: 'export@nolindoglobal.com', name: 'Nolindo Export' }] 
        }],
        from: { email: 'noreply@nolindoglobal.com', name: 'Nolindo Website' },
        subject: `[INQUIRY] ${product} - ${full_name} (${company_name})`,
        content: [{ type: 'text/plain', value: textBody }],
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
