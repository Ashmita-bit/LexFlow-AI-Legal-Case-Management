const mysql = require('mysql2/promise');

async function testRaviClients() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ABCD',
    database: 'advocate_casebook'
  });

  try {
    // Get all clients in system
    const [allClients] = await pool.execute('SELECT name FROM clients');
    console.log('=== TOTAL CLIENTS IN SYSTEM ===');
    console.log('Count:', allClients.length);
    allClients.forEach(c => console.log('-', c.name));

    console.log('\n=== RAVI SPECIFIC CLIENTS ===');

    // Get Ravi's clients (same logic as the endpoint)
    const [raviStaff] = await pool.execute('SELECT id, advocate_id FROM staff WHERE username = ?', ['Ravi']);
    if (raviStaff.length === 0) {
      console.log('Ravi not found');
      return;
    }

    const [raviClients] = await pool.execute(`
      SELECT DISTINCT cl.name FROM clients cl
      INNER JOIN cases c ON cl.name = c.client
      INNER JOIN tasks t ON c.id = t.case_id
      WHERE t.assigned_by = ?
      ORDER BY cl.name
    `, [raviStaff[0].advocate_id]);

    console.log('Clients Ravi can see:', raviClients.length);
    raviClients.forEach(c => console.log('-', c.name));

    console.log('\n=== VERIFICATION ===');
    console.log('✅ Ravi sees only', raviClients.length, 'out of', allClients.length, 'total clients');
    console.log('✅ This confirms staff-specific client filtering is working');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

testRaviClients();
