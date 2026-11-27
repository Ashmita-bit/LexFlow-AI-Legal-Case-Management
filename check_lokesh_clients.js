import mysql from 'mysql2/promise';

async function checkLokeshClients() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'ABCD',
    database: 'advocate_casebook'
  });

  try {
    console.log('=== CHECKING LOKESH CLIENTS ===');

    // Get Lokesh's staff ID
    const [staffRows] = await pool.execute('SELECT id FROM staff WHERE username = ?', ['Lokesh']);
    if (staffRows.length === 0) {
      console.log('Lokesh not found');
      return;
    }
    const lokeshId = staffRows[0].id;
    console.log('Lokesh staff ID:', lokeshId);

    // Get all tasks assigned to Lokesh
    const [tasks] = await pool.execute('SELECT t.*, c.name as client_name, cs.title as case_title FROM tasks t LEFT JOIN clients c ON t.client_id = c.id LEFT JOIN cases cs ON t.case_id = cs.id WHERE t.assigned_to = ?', [lokeshId]);
    console.log('\nTasks assigned to Lokesh:', tasks.length);
    tasks.forEach(t => console.log(`  - Task ID ${t.id}: "${t.title}" - Client: ${t.client_name || 'None'} - Case: ${t.case_title || 'None'}`));

    // Get clients from direct task assignment
    const [clientsFromTasks] = await pool.execute('SELECT DISTINCT cl.* FROM clients cl INNER JOIN tasks t ON t.client_id = cl.id WHERE t.assigned_to = ?', [lokeshId]);
    console.log('\nClients from direct task assignment:', clientsFromTasks.length);
    clientsFromTasks.forEach(c => console.log(`  - ${c.name} (ID: ${c.id})`));

    // Get clients from case task assignment
    const [clientsFromCases] = await pool.execute('SELECT DISTINCT cl.* FROM clients cl INNER JOIN cases c ON cl.name = c.client INNER JOIN tasks t ON c.id = t.case_id WHERE t.assigned_to = ?', [lokeshId]);
    console.log('\nClients from case task assignment:', clientsFromCases.length);
    clientsFromCases.forEach(c => console.log(`  - ${c.name} (ID: ${c.id})`));

    // Combined query (same as the API endpoint)
    const [combinedClients] = await pool.execute(`
      SELECT DISTINCT cl.* FROM clients cl
      INNER JOIN tasks t ON t.client_id = cl.id
      WHERE t.assigned_to = ?
      UNION
      SELECT DISTINCT cl.* FROM clients cl
      INNER JOIN cases c ON cl.name = c.client
      INNER JOIN tasks t ON c.id = t.case_id
      WHERE t.assigned_to = ?
      ORDER BY name
    `, [lokeshId, lokeshId]);

    console.log('\nCombined clients (what API returns):', combinedClients.length);
    combinedClients.forEach(c => console.log(`  - ${c.name} (ID: ${c.id})`));

    // Check all clients and their advocate assignments
    console.log('\n=== ALL CLIENTS ===');
    const [allClients] = await pool.execute('SELECT c.*, a.name as advocate_name FROM clients c LEFT JOIN advocates a ON c.advocate_id = a.id');
    allClients.forEach(c => console.log(`  - ${c.name} (ID: ${c.id}) - Advocate: ${c.advocate_name || 'None'}`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    pool.end();
  }
}

checkLokeshClients();
