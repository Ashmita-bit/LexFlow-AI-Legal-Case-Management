import fetch from 'node-fetch';

async function testInvoice() {
  try {
    const response = await fetch('http://localhost:5000/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client: "John Doe",
        amount: 500,
        amount_to_pay: 500,
        status: "Pending",
        case_description: "Test case",
        description: "Test invoice"
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testInvoice();
