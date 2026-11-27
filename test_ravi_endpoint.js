const fetch = require('node-fetch');

async function testRaviEndpoint() {
  try {
    console.log('Testing Ravi endpoint...');
    const response = await fetch('http://localhost:5000/clients/staff/Ravi');
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Clients returned:', data.length);
    console.log('Client names:', data.map(c => c.name));
    console.log('Full response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testRaviEndpoint();
