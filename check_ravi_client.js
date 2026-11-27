const mysql = require('mysql2/promise');

async function checkClients() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ABCD',
    database: 'advocate_casebook',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    console.log('=== ALL CLIENTS ===');
    const [allClients] = await pool.execute('SELECT c.*, a.name as advocate_name, a.username as advocate_username FROM clients c LEFT JOIN advocates a ON c.advocate_id = a.id');
    allClients.forEach(c => console.log(`ID ${c.id}: ${c.name} - Advocate: ${c.advocate_name || 'None'} (${c.advocate_username || 'None'})`));

    console.log('\n=== ADVOCATES ===');
    const [advocates] = await pool.execute('SELECT * FROM advocates');
    advocates.forEach(a => console.log(`ID ${a.id}: ${a.name} (${a.username})`));

    console.log('\n=== CHECKING FOR RAVI ===');
    const [raviClients] = await pool.execute('SELECT c.*, a.name as advocate_name, a.username as advocate_username FROM clients c LEFT JOIN advocates a ON c.advocate_id = a.id WHERE LOWER(TRIM(c.name)) = LOWER(TRIM("Ravi"))');
    if (raviClients.length > 0) {
      raviClients.forEach(c => console.log(`Found Ravi: ID ${c.id}, Advocate: ${c.advocate_name || 'None'} (${c.advocate_username || 'None'})`));
    } else {
      console.log('No client named Ravi found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

checkClients();
