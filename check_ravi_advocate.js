const mysql = require('mysql2/promise');

async function checkRaviAdvocate() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ABCD',
    database: 'advocate_casebook'
  });

  try {
    console.log('=== CHECKING RAVI CLIENT ADVOCATE ASSIGNMENT ===');
    const [raviClients] = await pool.execute('SELECT c.*, a.name as advocate_name, a.username as advocate_username FROM clients c LEFT JOIN advocates a ON c.advocate_id = a.id WHERE LOWER(TRIM(c.name)) = LOWER(TRIM("Ravi"))');
    if (raviClients.length > 0) {
      raviClients.forEach(c => {
        console.log(`Ravi Client Details:`);
        console.log(`- ID: ${c.id}`);
        console.log(`- Name: ${c.name}`);
        console.log(`- Advocate ID: ${c.advocate_id || 'NULL'}`);
        console.log(`- Advocate Name: ${c.advocate_name || 'Not Assigned'}`);
        console.log(`- Advocate Username: ${c.advocate_username || 'Not Assigned'}`);
      });
    } else {
      console.log('No client named Ravi found');
    }

    console.log('\n=== ALL ADVOCATES ===');
    const [advocates] = await pool.execute('SELECT * FROM advocates');
    advocates.forEach(a => console.log(`ID ${a.id}: ${a.name} (${a.username})`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    pool.end();
  }
}

checkRaviAdvocate();
