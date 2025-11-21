// --- 1. PLACEHOLDER DATA (MOCK API RESPONSE) ---
const dashboardData = {
    // Data for the main dashboard view
    metrics: {
        mrr: 8540.00,
        mrrChange: 0.12, // 12%
        subscribers: 427,
        newSubscribers: 35,
        churnRate: 0.045, // 4.5%
        churnChange: -0.005 // -0.5%
    },
    inventory: [
        { item: "All-Purpose Refills", stock: 1200, reorder: 1500 },
        { item: "Kitchen Refills", stock: 2850, reorder: 1500 },
        { item: "Bathroom Refills", stock: 950, reorder: 1000 },
        { item: "Essential Kit Bottles", stock: 450, reorder: 500 },
    ],
    finance: {
        aov: 24.50,
        clv: 150.00
    }
};

// --- 2. TEMPLATES FOR SEPARATE PAGES ---

// Template for the initial Dashboard view (populates data fields)
const dashboardTemplate = `
    <header class="dashboard-header">
        <h1>Subscription Overview</h1>
        <div class="date-range">
            <label for="period">Viewing:</label>
            <select id="period">
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Last Quarter</option>
            </select>
        </div>
    </header>

    <section class="kpi-cards-grid">
        <div class="kpi-card growth">
            <h3>Monthly Recurring Revenue (MRR)</h3>
            <p class="metric-value" data-metric="mrr"></p>
            <span class="change positive" data-change="mrrChange"></span>
        </div>
        <div class="kpi-card subscribers">
            <h3>Active Subscribers</h3>
            <p class="metric-value" data-metric="subscribers"></p>
            <span class="change positive" data-change="newSubscribers"></span>
        </div>
        <div class="kpi-card churn">
            <h3>Churn Rate</h3>
            <p class="metric-value" data-metric="churnRate"></p>
            <span class="change negative" data-change="churnChange"></span>
        </div>
    </section>

    <section class="charts-area">
        <div class="chart-panel">
            <h2>📈 Subscriber Growth Trend</h2>
            <div id="mrr-chart" class="chart-placeholder">
                 
            </div>
        </div>
    </section>
    
    <section class="detail-sections">
        <div class="detail-panel financials" style="flex: 1 1 50%;">
            <h2>💰 Key Financials</h2>
            <div class="financial-metrics">
                <div class="metric-box">
                    <p class="box-label">Average Order Value (AOV)</p>
                    <p class="box-value" data-finance="aov"></p>
                </div>
                <div class="metric-box">
                    <p class="box-label">Customer Lifetime Value (CLV)</p>
                    <p class="box-value" data-finance="clv"></p>
                </div>
            </div>
        </div>
    </section>
`;

const subscribersTemplate = `
    <header class="dashboard-header">
        <h1>Active Subscribers (427 Total)</h1>
    </header>
    <div class="detail-panel">
        <p>A list of all active subscribers would be loaded here from the database. This page often includes search/filter functionality and details like renewal date and subscription plan.</p>
        <div class="data-table-placeholder table-responsive"> 
            <table>
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Plan</th><th>Renewal Date</th></tr>
                </thead>
                <tbody>
                    <tr><td>Sarah M.</td><td>saram@email.com</td><td>Essential Kit</td><td>Dec 15, 2025</td></tr>
                    <tr><td>David P.</td><td>davidp@email.com</td><td>Refill-Only</td><td>Dec 20, 2025</td></tr>
                </tbody>
            </table>
        </div>
    </div>
`;

// Template for the Inventory Page (populates data fields)
const inventoryTemplate = `
    <header class="dashboard-header">
        <h1>Inventory & Fulfillment</h1>
    </header>
    <div class="detail-panel inventory">
        <h2>📦 Stock Levels</h2>
        <table id="inventory-table">
            <thead>
                <tr><th>Item</th><th>Stock Level</th><th>Reorder Point</th></tr>
            </thead>
            <tbody>
                </tbody>
        </table>
        <p class="note">Next major fulfillment run: <b>Nov 25th</b></p>
    </div>
    <div class="detail-panel" style="margin-top: 20px;">
        <h2>🔔 Reorder Alerts</h2>
        <p id="reorder-alerts">Stock data check complete. Reorder needed for: **All-Purpose Refills** and **Essential Kit Bottles**.</p>
    </div>
`;
// Template for the Finance Page (CONFIRMED FIX)
const financeTemplate = `
    <header class="dashboard-header">
        <h1>Detailed Financials</h1>
    </header>
    <div class="detail-panel">
        <h2>Summary Breakdown</h2>
        <p>This page would feature detailed reports on Cost of Goods Sold (COGS), Customer Acquisition Cost (CAC), and full monthly reports for accurate accounting.</p>
        <div class="data-table-placeholder table-responsive"> 
            <table>
                <thead>
                    <tr><th>Metric</th><th>Last Month</th><th>This Month (YTD)</th></tr>
                </thead>
                <tbody>
                    <tr><td>Gross Revenue</td><td>$9,500</td><td>$8,540</td></tr>
                    <tr><td>CAC</td><td>$15.00</td><td>$16.50</td></tr>
                    <tr><td>Profit Margin</td><td>45%</td><td>42%</td></tr>
                </tbody>
            </table>
        </div>
    </div>
`;

// --- 3. CORE APPLICATION LOGIC ---

const pageContentDiv = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.sidebar a');

// Function to format numbers as currency, percentage, or plain
const formatMetric = (value, type) => {
    if (type === 'currency') return `$${value.toFixed(2)}`;
    if (type === 'percent') return `${(value * 100).toFixed(1)}%`;
    if (type === 'change') return `${(Math.abs(value) * 100).toFixed(1)}% vs last month`;
    return value;
};

// Function to populate the main dashboard metrics
const populateDashboard = () => {
    // 1. Populate KPI Cards
    const metrics = dashboardData.metrics;
    document.querySelector('[data-metric="mrr"]').textContent = formatMetric(metrics.mrr, 'currency');
    document.querySelector('[data-change="mrrChange"]').textContent = `▲ ${formatMetric(metrics.mrrChange, 'change')}`;
    
    document.querySelector('[data-metric="subscribers"]').textContent = metrics.subscribers;
    document.querySelector('[data-change="newSubscribers"]').textContent = `▲ ${metrics.newSubscribers} new this month`;

    document.querySelector('[data-metric="churnRate"]').textContent = formatMetric(metrics.churnRate, 'percent');
    document.querySelector('[data-change="churnChange"]').textContent = `▼ ${formatMetric(Math.abs(metrics.churnChange), 'change')}`;

    // 2. Populate Financials
    document.querySelector('[data-finance="aov"]').textContent = formatMetric(dashboardData.finance.aov, 'currency');
    document.querySelector('[data-finance="clv"]').textContent = `${formatMetric(dashboardData.finance.clv, 'currency')} (Est.)`;
};

// Function to populate the Inventory page
const populateInventory = () => {
    const tableBody = document.querySelector('#inventory-table tbody');
    if (!tableBody) return; // Exit if the table isn't loaded yet

    dashboardData.inventory.forEach(item => {
        const row = tableBody.insertRow();
        
        // Item Name
        row.insertCell().textContent = item.item;
        
        // Stock Level
        row.insertCell().textContent = `${item.stock} units`;

       
        const reorderCell = row.insertCell();
        reorderCell.textContent = `${item.reorder} units`;
        if (item.stock < item.reorder) {
            reorderCell.classList.add('alert');
            reorderCell.style.color = '#D32F2F'; 
            reorderCell.style.fontWeight = 'bold';
        }
    });
};



const loadPage = (pageName) => {
    let template = '';
    let loadFunction = null;

    if (pageName === 'subscribers') {
        template = subscribersTemplate;
    } else if (pageName === 'inventory') {
        template = inventoryTemplate;
        loadFunction = populateInventory; 
    } else if (pageName === 'finance') {
        template = financeTemplate;
    } else {
        template = dashboardTemplate;
        loadFunction = populateDashboard; 
    }

    pageContentDiv.innerHTML = template;

    if (loadFunction) {
        setTimeout(loadFunction, 0); 
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.parentElement.classList.remove('active'));
        
        e.currentTarget.parentElement.classList.add('active');
        
        const page = e.currentTarget.getAttribute('data-page');
        loadPage(page);
    });
});

loadPage('dashboard');